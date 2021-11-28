/* eslint-disable default-case */
/* eslint-disable no-eval */
import React from 'react';
import { calcElem } from './utilities/CalculatorElements';
import Button from './components/Button';
import Display from './components/Display';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOperand: '0',
      previousOperand: '',
      operation: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.evaluate = this.evaluate.bind(this);
  }

  handleClick(event) {
    switch (event.target.id) {
      // NUMBERS
      case 'zero':
      case 'one':
      case 'two':
      case 'three':
      case 'four':
      case 'five':
      case 'six':
      case 'seven':
      case 'eight':
      case 'nine':
        let parsedNum = document.getElementById(event.target.id).textContent;
        this.setState({
          operation: ''
        });

        if (this.state.currentOperand === '+' || this.state.currentOperand === '-' || this.state.currentOperand === 'x' || this.state.currentOperand === '÷') {
          this.setState({
            currentOperand: parsedNum,
            previousOperand: this.state.previousOperand.concat(parsedNum)
          });
        } else if ((this.state.currentOperand === '0' && parsedNum !== '0') || this.state.previousOperand.includes('=')) {
          this.setState({
            currentOperand: parsedNum,
            previousOperand: parsedNum
          });
        } else if (this.state.currentOperand !== '0') {
          this.setState({
            currentOperand: this.state.currentOperand.concat(parsedNum),
            previousOperand: this.state.previousOperand.concat(parsedNum)
          });
        }
        break;

      // DECIMAL
      case 'decimal':
        if (this.state.previousOperand.includes('=')) {
          this.setState({
            currentOperand: '0.',
            previousOperand: '0.'
          });
        } else if (!this.state.currentOperand.toString().includes('.')) {
          if (this.state.previousOperand === '') {
            this.setState({
              currentOperand: '0.',
              previousOperand: '0.'
            });
          } else {
            this.setState({
              previousOperand: this.state.previousOperand.concat('.')
            });
          }
          this.setState({
            currentOperand: this.state.currentOperand.concat('.')
          });
        }
        break;

      // OPERATIONS
      case 'add':
      case 'subtract':
      case 'multiply':
      case 'divide':
        let prev = this.state.previousOperand;
        let curr = this.state.currentOperand;
        let value = document.getElementById(event.target.id).textContent;

        if (event.target.id === 'subtract') {
          if (prev === '') {
            this.setState({
              currentOperand: value,
              previousOperand: value,
              operation: value
            });
          } else if (prev.includes('=')) {
            this.setState({
              currentOperand: curr + value,
              previousOperand: curr + value,
              operation: value
            });
          } else if (this.state.operation.length < 2) {
            this.setState({
              currentOperand: value,
              previousOperand: prev.concat(value),
              operation: this.state.operation.concat(value)
            });
          }
        } else if (!prev.substring(prev.length - 1).match(/\+|-|x|÷/)) {
          if (prev.includes('=')) {
            this.setState({
              currentOperand: value,
              previousOperand: curr + value,
              operation: value
            });
          } else if (this.state.operation.length >= 2) {
            this.setState({
              currentOperand: value,
              previousOperand: prev.substring(0, prev.length - 2).concat(value),
              operation: value
            });
          } else {
            this.setState({
              currentOperand: value,
              previousOperand: prev.concat(value),
              operation: value
            });
          }
        } else if (this.state.operation.length >= 2) {
          this.setState({
            currentOperand: value,
            previousOperand: prev.substring(0, prev.length - 2).concat(value),
            operation: value
          });
        } else {
          this.setState({
            currentOperand: value,
            previousOperand: prev.substring(0, prev.length - 1).concat(value),
            operation: value
          });
        }
        break;

      // EQUALS
      case 'equals':
        if (this.state.previousOperand === '' || this.state.previousOperand.includes('=')) {
          break;
        } else {
          this.evaluate();
        }
        break;

      // CLEAR
      case 'clear':
        this.setState({
          currentOperand: '0',
          previousOperand: '',
          operation: ''
        });
        break;
    }
  }

  evaluate() {
    let prev = this.state.previousOperand;
    if (this.state.operation !== '') {
      if (this.state.operation.length < 2) {
        prev = prev.substring(0, prev.length - 1);
      } else {
        prev = prev.substring(0, prev.length - 2);
      }
    }
    let evaluated = eval(prev.replaceAll(/x/g, '*').replaceAll(/÷/g, '/')).toString();
    this.setState({
      currentOperand: evaluated,
      previousOperand: prev.concat(`=${evaluated}`),
      operation: ''
    });
  }

  render() {
    return (
      <div className="App">
        <div id="container">
          <Display currentOperand={this.state.currentOperand} previousOperand={this.state.previousOperand} />
          {calcElem.map((elem) => {
            return <Button value={elem.value} id={elem.id} class={elem.class} handleClick={this.handleClick} key={elem.id} />;
          })}
        </div>
      </div>
    );
  }
}

export default App;
