import { Synth } from 'tone';

const synth = new Synth().toMaster();

export function attackNote(tone: string): void {
  synth.triggerAttack(tone);
}

export function releaseNote(tone: string): void {
  synth.triggerRelease();
}

