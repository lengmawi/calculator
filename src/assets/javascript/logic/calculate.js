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
  // if buttonType is 0,1,2,3,4,5,6,7,8, or 9 button
  if (isNumber(buttonType)) {
    // Done inserting a number
    // if number is a operation like +,-,÷ or x 
    if (number.operation) {
      // if inserting a number again then
      if (number.next) {
        return {
          next: number.next + buttonType
        };
      }
      // otherwise, then nothing happened except to click other buttons which is not a number
      return {
        next: buttonType
      };
    }
    // if number is added again like 4 inserted to 5 resulted to 54
    if (number.next) {
      // make sure to add button type for period
      return {
          next: number.next + buttonType
      };
    }
    // if none of numbers (operations or numbers) then 
    // click other buttons which is not a number 
    return {
      next: buttonType, total: null
    };
  }
  // if buttonType is AC
  if (buttonType === "AC") {
    return {
      total: null, next: null, operation: null
    };
  }
  // if buttonType is +/-
  if (buttonType === "+/-") {
    // if inserting a number
    if (number.next) {
      return {
        next: (-1 * parseFloat(number.next)).toString()
      };
    }
    // if once "=" is in the array
    return {
      total: (-1 * parseFloat(number.total)).toString()
    };
  }
  // if buttonType is %
  if (buttonType === "%") {
    // if a number is available to insert in the array
    if (number.next) {
      return {
        next: Big(number.next).div(100).toString()
      };
    }
    // if a number is not available to insert in the array
    if (!number.next && !number.total) {
      return {};
    }
    // if once "=" is in the array 
    if (number.total)
    return {
      total: Big(number.total).div(100).toString()
    };
  }
  // if buttonType is .
  if (buttonType === ".") {
    // if inserting a number to the array
    if (number.next) {
      // if insert "." again then return none - "0.0.1" is invalid number
      if (number.next.includes(".")) {
        return {};
      }
      // if inserting another number like 4 inserted to 5 resulted to 5.4 
      return {
        next: number.next + "."
      };
    }
    // if inserting "." before a number
    return {
      next: "0."
    };
  }
  // if buttonType is =
  if (buttonType === "=") {
    // the equation require number and operation to solve
    if (number.operation) {
      return {
        total: operate(number.total, number.next, number.operation),
        next: null,
        operation: null
      };
    }
    // Otherwise, auto make a new equation (I am figuring out why it works)
  }
  // if number is a operation like +,-,÷ or x
  if (number.operation) {
    return {
      total: operate(number.total, number.next, number.operation),
      next: null,
      operation: buttonType
    };
  }
  // if number is a number added to the array
  if (number.next) {
    return {
      total: number.next, next: null, operation: buttonType
    };
  } 
  // if fail to click any buttons or numbers or operations, then click one of any operation
  // 
  // example:
  // first value must be 0
  // 0 + # = #
  // 0 - # = -#
  // 0 ÷ 0 = ERROR
  // 0 ÷ # = 0
  // 0 x # = 0
  return {
    operation: buttonType
  };
}
