import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { attackNote, releaseNote } from '../../lib/tone';

interface KeyboardState {
  keysPressed: string[]
}

const initialState: KeyboardState = {
  keysPressed: []
};

export const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState,
  reducers: {
    startNote: (state, action: PayloadAction<string>) => {
      const tone = action.payload;
      attackNote(tone);
      // If recording, add note
    },
    endNote: (state, action: PayloadAction<string>) => {
      const tone = action.payload;
      releaseNote(tone);
      // If recording, add note
    }
  }
});

export const { startNote, endNote } = keyboardSlice.actions;

export default keyboardSlice.reducer;
