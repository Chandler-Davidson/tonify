import React from 'react';
import styles from './Keyboard.module.css';

export type Props = {
  tone: string,
  onAttack: (tone: string) => void,
  onRelease: (tone: string) => void
}

export function Key({ tone, onAttack, onRelease }: Props) {
  return (
    <button
      key={tone}
      className={styles.button}
      // onClick={() => onAttack(tone)}
      onMouseDown={() => onAttack(tone)}
      onMouseUp={() => onRelease(tone)}
      onMouseEnter={(e) => e.buttons === 1 ? onAttack(tone) : undefined}
      onMouseLeave={() => onRelease(tone)}
    >
      {tone[0]}
    </button>);
}