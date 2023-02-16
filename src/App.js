import './App.css';
import React, { useState } from "react";
import Calculator from './Components/Calculator';
import InputContainer from './Components/InputContainer'
import Input from './Components/Input'
import CalcDisplay from './Components/CalcDisplay'

const btnValues = [
  ["C", " ", " ", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, "."],
];

const operators = new Set(['+', '-', '/', 'X']);

let stack = [];

function App() {

  let [calc, setCalc] = useState({
    sign: "",
    currentNum: 0,
    result: 0
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    let value;

    if (typeof value === 'number') {
      value = parseFloat(e.target.innerHTML);
    } else {
      value = e.target.innerHTML
    }

    let newValue;
    if (calc.currentNum > 0 ) {
       newValue = calc.currentNum.toString() + value.toString();
    } else {
      newValue = value.toString();
    }

    if (!operators.has(value)) {
      setCalc({
         ...calc,
         currentNum: newValue 
       })
    }

  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    const second = stack.pop();
    const first = stack.pop();

    const calculate = (first, second, sign) => {
      
        if (sign === "+") {
          return first + second;
        } else if (sign === "-") {
          return first - second;
        } else if (sign === "X") {
          return first*second;
        }else {
          return first/second;
        }
    }

    const result = calculate(first, second, value);
    stack.push(result);

    setCalc({
      ...calc,
      sign: value,
      currentNum: 0,
      result: result
    });
  };

  const resetClickHandler = () => {
    setCalc({
      sign: "",
      currentNum: 0,
      result: 0,
    });

    stack = [];
  };

  const spaceClickHandler = () => {
      if (calc.currentNum !== 0) {
        stack.push(parseFloat(calc.currentNum));
      }

      setCalc({
        ...calc,
        currentNum: 0,
        result: 0
      })
  };


  return (
    <div className="App">
        Reverse Polish Notation Calculator
        <Calculator>
          <CalcDisplay value={calc.currentNum === 0 && calc.sign ? calc.result: calc.currentNum}/>
          <InputContainer>
            {btnValues.flat().map((btn, i) => (
              <Input
                key={i}
                className={btn === "=" ? "equal" : ""}
                value={btn}
                onClick={

                    btn === "C"
                      ? resetClickHandler
                      : btn === " "
                      ? spaceClickHandler  // need to check stack for greater than 1
                      : operators.has(btn) && stack.length > 1 // button value needs to be parseFloat
                      // : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                      ? signClickHandler
                      : numClickHandler
                }
              />
            ))}
          </InputContainer>
        </Calculator>
        <div>

        </div>
    </div>
  );
}

export default App;
