import React from "react";
import { Keyboard } from "../features/keyboard/Keyboard";
import { useParams } from "react-router-dom";

export function KeyboardPage() {
  const { id } = useParams();

  return (
    <div>
      <Keyboard songId={id} />
    </div>
  );
}