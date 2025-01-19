import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function Calendar({ selected, onSelect, className }) {
  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={onSelect}
      className={className}
    />
  );
}
