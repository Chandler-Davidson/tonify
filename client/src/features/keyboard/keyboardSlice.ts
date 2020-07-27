import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk, RootState } from '../../app/store';
import { attack, release, startTransport, stopTransport, playRecording } from '../../lib/tone';
import { Recording, Note } from '../../types/Note';
import { Transport } from 'tone';

interface KeyboardState {
  keysPressed: string[],
  isRecording: boolean;
  recording: Recording,
  isSaved: boolean,
  isPlaying: boolean
}

const initialState: KeyboardState = {
  keysPressed: [],
  isRecording: false,
  recording: { notes: [] },
  isSaved: false,
  isPlaying: false,
};

export const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState,
  reducers: {
    startNote: (state, action: PayloadAction<string>) => {
      const tone = action.payload;
      attack(tone);

      if (state.isRecording) {
        state.recording.notes.push({
          tone,
          attack: Transport.position
        });
      }
    },

    endNote: (state, action: PayloadAction<string>) => {
      const tone = action.payload;
      release(tone);

      if (state.recording.notes.length === 0)
        return;

      const lastIndex = lastIndexOfFind(state.recording.notes, (n) => n.tone === tone)
      const lastNote = state.recording.notes[lastIndex];

      if (state.isRecording && lastNote && !lastNote.release) {
        state.recording.notes[lastIndex] = {
          ...lastNote,
          release: Transport.position
        };
      }
    },

    toggleIsRecording: state => {
      state.isRecording = !state.isRecording;
      const { isRecording, isPlaying } = state;

      if (isPlaying)
        state.isPlaying = false;

      if (isRecording) {
        state.recording.notes = [];
        startTransport();
      }
      else {
        stopTransport();
      }
    },

    toggleIsPlaying: state => {
      state.isPlaying = !state.isPlaying;
      const { isPlaying, isRecording, recording } = state;

      if (isRecording)
        state.isRecording = false;


      if (isPlaying) {
        playRecording(recording.notes)
      }
      else {
        stopTransport();
      }
    },

    toggleIsSaved: (state, action: PayloadAction<string>) => {
      state.isSaved = !state.isSaved;
      state.recording.id = action.payload;
    },

    setRecording: (state, action: PayloadAction<Note[]>) => {
      state.recording.notes = action.payload;
    }
  }
});

function lastIndexOfFind<T>(arr: T[], predicate: (value: T) => boolean): number {
  for (let i = arr.length - 1; i >= 0; i--) {
    const el = arr[i];

    if (predicate(el))
      return i;
  }

  return -1;
}

export const { startNote, endNote, toggleIsRecording, toggleIsPlaying, toggleIsSaved, setRecording } = keyboardSlice.actions;

export const saveRecording = (): AppThunk => async (dispatch, getState) => {
  const { isSaved, recording } = getState().keyboard;

  if (isSaved)
    return;

  const response = await axios.post(
    `${window.location.origin}:4000/recordings`,
    { notes: recording.notes });

  const id = response.data;

  dispatch(toggleIsSaved(id));

  window.history.pushState('', '', `${window.location.origin}/${id}`);
};

export const fetchRecording = (songId: string): AppThunk => async (dispatch) => {
  const response = await axios.get(
    `${window.location.origin}:4000/recordings/${songId}`);

  const recording = response.data;

  if (!recording)
    return;

  dispatch(setRecording(JSON.parse(recording.notes)));
  dispatch(toggleIsSaved(songId));
}


export const selectIsRecording = (state: RootState) => state.keyboard.isRecording;

export const selectIsPlaying = (state: RootState) => state.keyboard.isPlaying;

export const selectIsSaved = (state: RootState) => state.keyboard.isSaved;

export default keyboardSlice.reducer;
