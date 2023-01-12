import Big from "big.js";

import operate from "./operate";
import isNumber from "./isNumber";

/**
 * Given a button type and a calculator data number, return an updated
 * calculator data number.
 *
 * Calculator data number contains:
 *   total: String      the running total
 *   next: String       the next number to be operated on with the total
 *   operation: String  +, -, etc.
 */
export default function calculate(number, buttonType) {
  if (isNumber(buttonType)) {
    if (number.operation) {
      if (number.next) {
        return {
          next: number.next + buttonType
        };
      } else {
        return {
          next: buttonType
        };
      }
    } else if (number.next) {
      const next = number.next === "0" ? buttonType : number.next + buttonType;
      return {
        next, total: null
      };
    } else {
      return {
        next: buttonType, total: null
      };
    }
  } else if (buttonType === "AC") {
    return {
      total: null, next: null, operation: null
    };
  }  else if (buttonType === "+/-") {
    if (number.next) {
      return {
        next: (-1 * parseFloat(number.next)).toString()
      };
    } else if (number.total) {
      return {
        total: (-1 * parseFloat(number.total)).toString()
      };
    } else {
      return {};
    }
  } else if (buttonType === "%") {
    if (number.next) {
      return {
        next: Big(number.next).div(100).toString()
      };
    } else if (number.total) {
      return {
        next: Big(number.total).div(100).toString()
      };
    } else {
      return {};
    }
  } else if (buttonType === ".") {
    if (number.next) {
      if (number.next.includes(".")) {
        return {};
      } else {
        return {
          next: number.next + "."
        };
      }
    } else {
      return {
        next: "0."
      };
    }
  } else if (buttonType === "=") {
    if (number.next && number.operation) {
      return {
        total: operate(number.total, number.next, number.operation),
        next: null,
        operation: null
      };
    } else {
      return {};
    }
  } else if (number.operation) {
    return {
      total: operate(number.total, number.next, number.operation),
      next: null,
      operation: buttonType
    };
  } else if (!number.next) {
    return {
      operation: buttonType
    };
  } else {
    return {
      total: number.next, next: null, operation: buttonType
    };
  }
}
