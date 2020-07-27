import { Synth, Transport, Loop, Sequence, Part, Pattern, start } from 'tone';
import { Note } from '../types/Note';
// import { Tone } from 'tone/build/esm/core/Tone';

const synth = new Synth().toDestination();

export function attack(tone: string): void {
  synth.triggerAttack(tone);
}

export function release(tone: string): void {
  synth.triggerRelease();
}

export function startTransport(): void {
  Transport.start();
}

export function stopTransport(): void {
  Transport.stop();
  Transport.cancel(0);
}

export function now(): number {
  return Transport.immediate();
}

export function playRecording(recording: Note[]): void {
  start();

  Transport.cancel(0);
  const part = new Part(((time, note) => {
    synth.triggerAttackRelease((note as string), '8n', time);
  }), recording.map(({ attack, tone }) => [attack, tone])).start();

  Transport.start();
}