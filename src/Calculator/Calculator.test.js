import React from "react";
import ReactDOM from 'react-dom/client';
import Calculator from "./Calculator.js";

it("renders without crashing", () => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  root.render(<Calculator/>);
});
