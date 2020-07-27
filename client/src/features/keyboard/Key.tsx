import React from 'react';
// @ts-ignore
import KeyboardEventHandler from 'react-keyboard-event-handler';

import styles from './Keyboard.module.css';

export type Props = {
  tone: string,
  index: number,
  onAttack: (tone: string) => void,
  onRelease: (tone: string) => void
}

export function Key({ tone, index, onAttack, onRelease }: Props) {
  function onKeyChange(event: any): void {
    if (event.repeat || event.keyCode - 49 !== index)
      return;

    event.type === "keydown"
      ? onAttack(tone)
      : onRelease(tone);
  }

  return (
    <div>
      <KeyboardEventHandler
        handleKeys={["numeric"]}
        handleEventType="keydown"
        onKeyEvent={(_: any, e: any) => onKeyChange(e)}
      />
      <KeyboardEventHandler
        handleKeys={["numeric"]}
        handleEventType="keyup"
        onKeyEvent={(_: any, e: any) => onKeyChange(e)}
      />
      <button
        id={`key-${tone}`}
        key={tone}
        className={styles.button}
        // onClick={() => onAttack(tone)}
        onMouseDown={() => onAttack(tone)}
        onMouseUp={() => onRelease(tone)}
        onMouseEnter={(e) => e.buttons === 1 ? onAttack(tone) : undefined}
        onMouseLeave={() => onRelease(tone)}
      >
        {tone[0]}
      </button>
    </div>
  );
}