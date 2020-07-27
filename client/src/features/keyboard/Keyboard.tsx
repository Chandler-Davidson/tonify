import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  startNote,
  endNote,
  toggleIsRecording,
  selectIsRecording,
  selectIsSaved,
  selectIsPlaying,
  toggleIsPlaying,
  saveRecording,
  fetchRecording
} from './keyboardSlice';
import styles from './Keyboard.module.css';
import { Key } from './Key';

const tones = [
  'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4'
];

type Props = {
  songId: string
};

export function Keyboard({ songId }: Props) {
  const dispatch = useDispatch();
  const isRecording = useSelector(selectIsRecording);
  const isSaved = useSelector(selectIsSaved);
  const isPlaying = useSelector(selectIsPlaying);

  useEffect(() => {
    if (songId !== undefined) {
      dispatch(fetchRecording(songId));
    }
  }, [songId])

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Record"
          onClick={() => dispatch(toggleIsRecording())}
          hidden={isSaved}
        >
          {isRecording ? 'Stop' : 'Record'}
        </button>
        <button
          className={styles.button}
          aria-label="Save"
          onClick={() => dispatch(saveRecording())}
          hidden={isSaved}
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>
        <button
          className={styles.button}
          aria-label="Play"
          onClick={() => dispatch(toggleIsPlaying())}
        >
          {isPlaying ? 'Reset' : 'Play'}
        </button>
      </div>
      <div className={styles.row}>
        {tones.map((t, i) => (
          <Key
            key={t}
            index={i}
            tone={t}
            onAttack={() => dispatch(startNote(t))}
            onRelease={() => dispatch(endNote(t))} />))}
      </div>
    </div>
  );
}
