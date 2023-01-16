import calculate from "./calculate.js";

var expect = require('chai').expect;

function pressButtons(buttons) {
    // Create the array
    const value = {};
    buttons.forEach(button => {
      Object.assign(value, calculate(value, button));
    });
    Object.keys(value).forEach(key => {
      if (value[key] === null) {
        delete value[key];
      }
    });
    return value;
}

function expectButtons(buttons, expectation) {
    expect(pressButtons(buttons)).to.deep.eq(expectation);
}
  
function test(buttons, expectation, only = false) {
    const func = only ? it.only : it;
    func(`buttons ${buttons.join(",")} -> ${JSON.stringify(expectation)}`, () => {
        expectButtons(buttons, expectation);
    });
}
  
describe("calculate", function() {
    test(["7"], {
        next: "7"
    });
  
    test(["7", "5"], {
        next: "75",
    });
    // AC
    test(["AC"], {});
    test(["+", "7", "AC"], {});
    test(["+", "7", "5", "AC"], {});
    test(["7", "+", "5", "AC"], {});
    test(["7", "5",  "+", "AC"], {});
    
    test(["AC"], {});
    test(["-", "7", "AC"], {});
    test(["-", "7", "5", "AC"], {});
    test(["7", "-", "5", "AC"], {});
    test(["7", "5",  "-", "AC"], {});
    
    test(["AC"], {});
    test(["÷", "7", "AC"], {});
    test(["÷", "7", "5", "AC"], {});
    test(["7", "÷", "5", "AC"], {});
    test(["7", "5",  "÷", "AC"], {});
    
    test(["AC"], {});
    test(["x", "7", "AC"], {});
    test(["x", "7", "5", "AC"], {});
    test(["7", "x", "5", "AC"], {});
    test(["7", "5",  "x", "AC"], {});
    
    test(["AC"], {});
    test([".", "7", "AC"], {});
    test([".", "7", "5", "AC"], {});
    test(["7", ".", "5", "AC"], {});
    test(["7", "5",  ".", "AC"], {});
    
    test(["AC"], {});
    test(["%", "7", "AC"], {});
    test(["%", "7", "5", "AC"], {});
    test(["7", "%", "5", "AC"], {});
    test(["7", "5",  "%", "AC"], {});
    
    // +
    test(["+"], {
        operation: "+"
    });
    
    test(["+", "7"], {
        next: "7",
        operation: "+"
    });
    
    test(["+", "7", "5"], {
        next: "75",
        operation: "+"
    });
    
    test(["+", "7", "5", "="], {
        total: "75",
    });
    
    test(["+", "7", "5", "=", "75"], {
        next: "75",
    });
    
    test(["+", "7", "="], {
        total: "7"
    });
    
    test(["+", "7", "+"], {
        total: "7",
        operation: "+",
    });
  
    test(["+", "7", "+", "+"], {
        total: "7",
        operation: "+",
    });
    
    test(["+", "7", "=", "7"], {
        next: "7"
    });

    test(["+", "7", "=", "+"], {
        total: "7",
        operation: "+"
    });

    test(["+", "7", "=", "+", "5"], {
        total: "7",
        next: "5",
        operation: "+"
    });

    test(["+", "7", "=", "+", "5", "="], {
        total: "12"
    });
    
    test(["+", "7", "=", "+", "5", "=", "12"], {
        next: "12"
    });
    
    test(["+", "7", "+", "5"], {
        total: "7",
        next: "5",
        operation: "+"
    });
    
    test(["+", "7", "+", "5", "="], {
        total: "12"
    });
    
    test(["+", "7", "+", "5", "=", "12"], {
        next: "12"
    });
    
    test(["7", "+"], {
        total: "7",
        operation: "+",
    });
    
    test(["7", "+", "+"], {
        total: "7",
        operation: "+",
    });
  
    test(["7", "+", "5"], {
        total: "7",
        next: "5",
        operation: "+"
    });
    
    test(["7", "+", "5", "="], {
        total: "12"
    });
  
    test(["7", "+", "5", "=", "12"], {
        next: "12"
    });
  
    test(["7", "+", "5", "=", "+"], {
        total: "12",
        operation: "+"
    });
  
    test(["7", "+", "5", "=", "+", "10"], {
        total: "12",
        next: "10",
        operation: "+",
    });
  
    test(["7", "+", "5", "=", "+", "10", "="], {
        total: "22"
    });
    
    test(["7", "+", "5", "=", "+", "10", "=", "22"], {
        next: "22"
    });
    
    test(["-", "7", "+", "5", "="], {
        total: "-2"
    });
    // addition of -7 and 5
    test(["-", "7", "+", "5", "=", "-2"], {
        next: "-2"
    });
  
    test(["-", "7", "+", "5", "=", "+"], {
        total: "-2",
        operation: "+"
    });
  
    test(["-", "7", "+", "5", "=", "+", "10"], {
        total: "-2",
        next: "10",
        operation: "+",
    });
  
    test(["-", "7", "+", "5", "=", "+", "10", "="], {
        total: "8"
    });
    
    test(["-", "7", "+", "5", "=", "+", "10", "=", "8"], {
        next: "8"
    });
    // Make a new addition
    test(["-", "7", "+", "5", "=", "2"], {
        next: "2"
    });

    test(["-", "7", "+", "5", "=", "2", "+"], {
        total: "2",
        operation: "+"
    });
    test(["-", "7", "+", "5", "=", "2", "+", "5"], {
        total: "2",
        next: "5",
        operation: "+"
    });
    test(["-", "7", "+", "5", "=", "2", "+", "5", "="], {
        total: "7"
    });
    test(["-", "7", "+", "5", "=", "2", "+", "5", "=", "7"], {
        next: "7"
    });
    // -
    test(["-"], {
        operation: "-"
    });
    
    test(["-", "7"], {
        next: "7",
        operation: "-"
    });

    test(["-", "7", "="], {
        total: "-7"
    });
    
    test(["-", "7", "5"], {
        next: "75",
        operation: "-"
    });
    
    test(["-", "7", "5", "="], {
        total: "-75",
    });
    
    test(["-", "7", "5", "=", "-75"], {
        next: "-75",
    });
    
    test(["-", "7", "="], {
        total: "-7"
    });
    
    test(["-", "7", "-"], {
        total: "-7",
        operation: "-",
    });
    
    test(["-", "7", "-", "-"], {
        total: "-7",
        operation: "-",
    });
    
    test(["-","7", "=", "-7"], {
        next: "-7",
    });

    test(["-", "7", "=", "-"], {
        total: "-7",
        operation: "-"
    });

    test(["-", "7", "=", "-", "5"], {
        total: "-7",
        next: "5",
        operation: "-"
    });

    test(["-", "7", "=", "-", "5", "="], {
        total: "-12"
    });
    
    test(["-", "7", "=", "-", "5", "=", "-12"], {
        next: "-12"
    });
    
    test(["7", "-", "5"], {
        total: "7",
        next: "5",
        operation: "-"
    });
    
    test(["7", "-", "5", "="], {
        total: "2"
    });
    
    test(["7", "-", "5", "=", "2"], {
        next: "2"
    });
    
    test(["7", "-"], {
        total: "7",
        operation: "-",
    });
    
    test(["7", "-", "-"], {
        total: "7",
        operation: "-",
    });
    
    test(["7", "-", "5"], {
        total: "7",
        next: "5",
        operation: "-"
    });
    
    test(["7", "-", "5", "="], {
        total: "2"
    });
  
    test(["7", "-", "5", "=", "2"], {
        next: "2"
    });
  
    test(["7", "-", "5", "=", "-"], {
        total: "2",
        operation: "-"
    });
  
    test(["7", "-", "5", "=", "-", "10"], {
        total: "2",
        next: "10",
        operation: "-",
    });
  
    test(["7", "-", "5", "=", "-", "10", "="], {
        total: "-8"
    });
    
    test(["7", "-", "5", "=", "-", "10", "=", "-8"], {
        next: "-8"
    });

    test(["-", "7", "-", "5", "="], {
        total: "-12"
    });
  
    test(["-", "7", "-", "5", "=", "-12"], {
        next: "-12"
    });
  
    test(["-", "7", "-", "5", "=", "-"], {
        total: "-12",
        operation: "-"
    });
  
    test(["-", "7", "-", "5", "=", "-", "10"], {
        total: "-12",
        next: "10",
        operation: "-",
    });
  
    test(["-", "7", "-", "5", "=", "-", "10", "="], {
        total: "-22"
    });
    
    test(["-", "7", "-", "5", "=", "-", "10", "=", "-22"], {
        next: "-22"
    });
    // ÷
    test(["÷"], {
        operation: "÷"
    });

    test(["÷", "0"], {
        next: "0",
        operation: "÷"
    });

    test(["÷", "0", "="], {
        total: "Error"
    });
    // Unsure why it is written that way
    test(["÷", "0", "=", "Error"], {
        total: "Error",
        operation: "Error"
    });
    
    test(["÷", "7"], {
        next: "7",
        operation: "÷"
    });
    
    test(["÷", "7", "="], {
        total: "0"
    });
    
    test(["÷", "7", "=", "0"], {
        next: "0"
    });
    
    test(["÷", "7", "5"], {
        next: "75",
        operation: "÷"
    });
    
    test(["÷", "7", "5", "="], {
        total: "0",
    });
    
    test(["÷", "7", "5", "=", "0"], {
        next: "0"
    });
    
    test(["÷", "7", "÷"], {
        total: "0",
        operation: "÷",
    });
    
    test(["÷", "7", "÷", "÷"], {
        total: "0",
        operation: "÷",
    });
    
    
    test(["÷", "7", "=", "÷"], {
        total: "0",
        operation: "÷"
    });

    test(["÷", "7", "=", "÷", "5"], {
        total: "0",
        next: "5",
        operation: "÷"
    });

    test(["÷", "7", "=", "÷", "5", "="], {
        total: "0"
    });
    
    test(["÷", "7", "=", "÷", "5", "=", "0"], {
        next: "0"
    });
    
    test(["÷", "7", "÷", "5"], {
        total: "0",
        next: "5",
        operation: "÷"
    });
    
    test(["÷", "7", "÷", "5", "="], {
        total: "0"
    });
    
    test(["÷", "7", "÷", "5", "=", "0"], {
        next: "0"
    });
    
    test(["7", "÷"], {
        total: "7",
        operation: "÷",
    });
    
    test(["7", "÷", "÷"], {
        total: "7",
        operation: "÷",
    });
    
    test(["7", "÷", "5"], {
        total: "7",
        next: "5",
        operation: "÷"
    });
    
    test(["7", "÷", "5", "="], {
        total: "1.4"
    });
  
    test(["7", "÷", "5", "=", "1.4"], {
        next: "1.4"
    });
  
    test(["7", "÷", "5", "=", "÷"], {
        total: "1.4",
        operation: "÷"
    });
  
    test(["7", "÷", "5", "=", "÷", "10"], {
        total: "1.4",
        next: "10",
        operation: "÷"
    });
  
    test(["7", "÷", "5", "=", "÷", "10", "="], {
        total: "0.14"
    });
    
    test(["7", "÷", "5", "=", "÷", "10", "=", "0.14"], {
        next: "0.14"
    });

    test(["-", "7", "÷"], {
        total: "-7",
        operation: "÷"
    });

    test(["-", "7", "÷", "5"], {
        total: "-7",
        next: "5",
        operation: "÷"
    });
    
    test(["-", "7", "÷", "5", "="], {
        total: "-1.4"
    });
  
    test(["-", "7", "÷", "5", "=", "-1.4"], {
        next: "-1.4"
    });
  
    test(["-", "7", "÷", "5", "=", "÷"], {
        total: "-1.4",
        operation: "÷"
    });
  
    test(["-", "7", "÷", "5", "=", "÷", "10"], {
        total: "-1.4",
        next: "10",
        operation: "÷",
    });
  
    test(["-", "7", "÷", "5", "=", "÷", "10", "="], {
        total: "-0.14"
    });
    
    test(["-", "7", "÷", "5", "=", "÷", "10", "=", "-0.14"], {
        next: "-0.14"
    });
    // x
    test(["x"], {
        operation: "x"
    });
    
    test(["x", "7"], {
        next: "7",
        operation: "x"
    });

    test(["x", "7", "x"], {
        total: "0",
        operation: "x",
    });
    
    test(["x", "7", "x", "x"], {
        total: "0",
        operation: "x",
    });
    
    test(["x", "7", "="], {
        total: "0"
    });
    
    test(["x", "7", "=", "0"], {
        next: "0"
    });
    
    test(["x", "7", "5"], {
        next: "75",
        operation: "x"
    });
    
    test(["x", "7", "5", "="], {
        total: "0",
    });

    test(["x", "7", "5", "=", "0"], {
        next: "0",
    });
    
    test(["x", "7", "=", "x"], {
        total: "0",
        operation: "x"
    });

    test(["x", "7", "=", "x", "5"], {
        total: "0",
        next: "5",
        operation: "x"
    });

    test(["x", "7", "=", "x", "5", "="], {
        total: "0"
    });
    
    test(["x", "7", "=", "x", "5", "=", "0"], {
        next: "0"
    });
    
    test(["7", "x"], {
        total: "7",
        operation: "x",
    });
    
    test(["7", "x", "5"], {
        total: "7",
        next: "5",
        operation: "x"
    });
    
    test(["7", "x", "5", "="], {
        total: "35"
    });
    
    test(["7", "x", "5", "=", "35"], {
        next: "35"
    });
    
  
    test(["7", "x", "5", "=", "x"], {
        total: "35",
        operation: "x"
    });
  
    test(["7", "x", "5", "=", "x", "10"], {
        total: "35",
        next: "10",
        operation: "x",
    });
  
    test(["7", "x", "5", "=", "x", "10", "="], {
        total: "350"
    });
    
    test(["7", "x", "5", "=", "x", "10", "=", "350"], {
        next: "350"
    });
    
    test(["-", "7", "x"], {
        total: "-7",
        operation: "x",
    });
    
    test(["-", "7", "x", "5", "="], {
        total: "-35"
    });
  
    test(["-", "7", "x", "5", "=", "-35"], {
        next: "-35"
    });
  
    test(["-", "7", "x", "5", "=", "x"], {
        total: "-35",
        operation: "x"
    });
  
    test(["-", "7", "x", "5", "=", "x", "10"], {
        total: "-35",
        next: "10",
        operation: "x"
    });
  
    test(["-", "7", "x", "5", "=", "x", "10", "="], {
        total: "-350"
    });
    
    test(["-", "7", "x", "5", "=", "x", "10", "=", "-350"], {
        next: "-350"
    });
    // period
    test(["+", "2", "5"], {
        next: "25",
        operation: "+"
    });

    test(["0", ".", "4"], {
        next: "0.4"
    });

    test([".", "4"], {
        next: "0.4"
    });

    test([".", "4", "-", ".", "2"], {
        total: "0.4",
        next: "0.2",
        operation: "-"
    });

    test([".", "4", "-", ".", "2", "="], {
        total: "0.2"
    });
    
    // percent 
    test(["%"], {});
    
    test(["%", "7"], {
        next: "7"
    });

    test(["7", "%"], {
        next: "0.07"
    });

    // It is yet fixed
    //
    // test(["7", "%", "5"], {
    //     next: "5"
    // });
    // test(["7", "%", "5", "%"], {
    //     next: "0.05"
    // }); 

    test(["7", "%", "%"], {
        next: "0.0007",
    });

    test(["%", "%"], {});

    test(["7", "%", "x", "5"], {
        total: "0.07",
        next: "5",
        operation: "x"
    });
    
    test(["7", "%", "x", "5", "="], {
        total: "0.35",
    });
    
    test(["7", "%", "x", "5", "=", "0.35"], {
        next: "0.35",
    });

    test(["7", "x", "5","%"], {
        total: "7",
        next: "0.05",
        operation: "x"
    });
    
    test(["7", "x", "5", "%", "="], {
        total: "0.35",
    });

    test(["7", "x", "5", "%", "=", "0.35"], {
        next: "0.35",
    });

    // random +-÷x
    test(["7", "+", "-", "÷", "x", "-"], {
        total: "7",
        operation: "-"
    });
    // no equation
    test(["7", "=", "5"], {
        total: "7",
        next: "5",
        operation: "="
    });
    
    test(["%", "7", "="], {
        total: "7",
        operation: "="
    });
    
    test(["7", "%", "="], {
        total: "0.07",
        operation: "="
    });

    test(["7", "%", "=", "5"], {
        total: "0.07",
        next: "5",
        operation: "="
    });
  });