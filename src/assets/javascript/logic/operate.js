import Big from "big.js";

export default function operate(numberOne, numberTwo, operation) {
  // If nothing is clicked for valueOne then return 0
  const valueOne = Big(numberOne || "0");
    //If ÷ or x, then return 1
    //Otherwise +, -, then return 0
  const valueTwo = Big(numberTwo || (operation === "÷" || operation === 'x' ? "1": "0"));
  if (operation === "+") {
    return valueOne.plus(valueTwo).toString();
  }
  if (operation === "-") {
    return valueOne.minus(valueTwo).toString();
  }
  if (operation === "x") {
    return valueOne.times(valueTwo).toString();
  }
  if (operation === "÷") {
    if (valueTwo.eq("0")) {
      return "Error";
    } else {
      return valueOne.div(valueTwo).toString();
    }
  }
}
