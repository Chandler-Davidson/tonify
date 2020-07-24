import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  startNote,
  endNote
} from './keyboardSlice';
import styles from './Keyboard.module.css';
import { Key } from './Key';

const tones = [
  'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4'
];

export function Keyboard() {
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.row}>
        {tones.map(t => (
          <Key
            key={t}
            tone={t}
            onAttack={() => dispatch(startNote(t))}
            onRelease={() => dispatch(endNote(t))} />))}
      </div>
    </div>
  );
}
