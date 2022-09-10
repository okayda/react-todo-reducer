import React from "react";
import "./Button.css";

export default function Button(prop) {
  return (
    <button type={prop.type} onClick={prop.onClick} className={prop.className}>
      {prop.children}
    </button>
  );
}
