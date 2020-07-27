import { Time } from "tone/build/esm/core/type/Units";

export type Note = {
  tone: string,
  attack?: Time,
  release?: Time
};

export type Recording = {
  id?: string,
  notes: Note[]
};