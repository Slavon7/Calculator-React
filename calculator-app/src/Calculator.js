import React from 'react';
import { Button } from '@material-ui/core'
import CalculationDisplay from './CalculationDisplay';
import './App.css';

class Calculator extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
  calculation: "",
  currentValue: "0",
  history: [],
  calculations: []
  }
  }
 
  handleClick = (value) => {
    // clear the calculation and current value when "C" is pressed
    if (value === "C") {
      this.setState({
        calculation: "",
        currentValue: "0",
      });
    } 
    // evaluate the calculation expression and update the calculation and current value when "=" is pressed
    else if (value === "=") {
      try {
        // return if calculation expression is empty or only has a single number
        if (!["+", "-", "*", "/"].some(operand => this.state.calculation.includes(operand)))
        {
          return;
        }
        if (["+", "-", "*", "/"].includes(this.state.calculation.slice(-1))) {
          return;
        }
        let result = eval(this.state.calculation);
        if (!isNaN(result)) {
          if (!["+", "-", "*", "/"].some(operand => this.state.calculation.includes(operand))) {
            this.setState({
              calculation: result,
              currentValue: result,
            });
          } else {
            this.setState({
              calculation: result,
              currentValue: result,
              history: [...this.state.history, this.state.calculation + " = " + result],
            });
          }
        }
      } catch (e) {
        return;
      }
    } else if (this.state.calculation.length === 0 && ["+", "-", "*", "/", "0"].includes(value)) {
      return;
    } else if (["+", "-", "*", "/"].includes(this.state.calculation.slice(-1))) {
      if (["+", "-", "*", "/"].includes(value)) {
        this.setState({
          calculation: this.state.calculation.slice(0, -1) + value,
          currentValue: value,
        });
      } 
      // append the value to the calculation expression if the value is not an operand
      else {
        this.setState({
          calculation: this.state.calculation + value,
          currentValue: value,
        });
      }
    } 
    // append the value to the calculation expression if the last character in the calculation expression is not an operand
    else {
      this.setState({
        calculation: this.state.calculation + value,
        currentValue: value,
      });
    }
  };

  generateRandomCalculations = () => {
    return fetch("http://localhost:8080/math/examples?count=4")
        .then(s => s.json())
        .then(s => this.setState({ calculations: s }))
        .catch(s => console.error(s))
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

    handleKeyDown = (event) => {
      if(event.keyCode === 48 || event.keyCode === 96){
          this.handleClick("0");
      }else if(event.keyCode === 49 || event.keyCode === 97){
          this.handleClick("1");
      }else if(event.keyCode === 50 || event.keyCode === 98){
          this.handleClick("2");
      }else if(event.keyCode === 51 || event.keyCode === 99){
          this.handleClick("3");
      }else if(event.keyCode === 52 || event.keyCode === 100){
          this.handleClick("4");
      }else if(event.keyCode === 53 || event.keyCode === 101){
          this.handleClick("5");
      }else if(event.keyCode === 54 || event.keyCode === 102){
          this.handleClick("6");
      }else if(event.keyCode === 55 || event.keyCode === 103){
        this.handleClick("7");
      }else if(event.keyCode === 56 || event.keyCode === 104){
        this.handleClick("8");
      }else if(event.keyCode === 57 || event.keyCode === 105){
        this.handleClick("9");
      }else if(event.keyCode === 187 || event.keyCode === 107){
        this.handleClick("+");
      }else if(event.keyCode === 189 || event.keyCode === 109){
        this.handleClick("-");
      }else if(event.keyCode === 56 || event.keyCode === 106){
        this.handleClick("*");
      }else if(event.keyCode === 191 || event.keyCode === 111){
        this.handleClick("/");
      }else if(event.keyCode === 13){
        this.handleClick("=");
      }else if(event.keyCode === 67){
        this.handleClick("C");
    }
  }

    render() {
        return (
            <div className='calculator__menu'>
                <CalculationDisplay calculation={this.state.calculation} />
                <div className='button__menu'>
                    <Button onClick={() => this.handleClick("1")}>1</Button>
                    <Button onClick={() => this.handleClick("2")}>2</Button>
                    <Button onClick={() => this.handleClick("3")}>3</Button>
                    <Button onClick={() => this.handleClick("+")}>+</Button>
                    <br/>
                    <Button onClick={() => this.handleClick("4")}>4</Button>
                    <Button onClick={() => this.handleClick("5")}>5</Button>
                    <Button onClick={() => this.handleClick("6")}>6</Button>
                    <Button onClick={() => this.handleClick("-")}>-</Button>
                    <br/>
                    <Button onClick={() => this.handleClick("7")}>7</Button>
                    <Button onClick={() => this.handleClick("8")}>8</Button>
                    <Button onClick={() => this.handleClick("9")}>9</Button>
                    <Button onClick={() => this.handleClick("*")}>*</Button>
                    <br/>
                    <Button onClick={() => this.handleClick("0")}>0</Button>
                    <Button onClick={() => this.handleClick("C")}>C</Button>
                    <Button onClick={() => this.handleClick("=")}>=</Button>
                    <Button onClick={() => this.handleClick("/")}>/</Button>
                </div>
                <div>
                <ul style={{display: 'flex', flexDirection: 'column-reverse'}}>
                {this.state.history.map((item, index) => {
                return <li key={index}>{item}</li>
                })}
                </ul>
                </div>
                <Button onClick={this.generateRandomCalculations}>Generate Random Calculations</Button>
                <ol>
                  {this.state.calculations.map(calculation => (
                    <li key={calculation}>{calculation}</li>
                  ))}
                </ol>
            </div>
        );
    }
}

export default Calculator;
