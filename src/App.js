import React from 'react';
import { calcElem } from './utilities/CalculatorElements';
import Button from './components/Button';
import Display from './components/Display';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOperand: '0',
      previousOperand: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.evaluate = this.evaluate.bind(this);
  }

  handleClick(event) {
    // eslint-disable-next-line default-case
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
        const parsedNum = document.getElementById(event.target.id).textContent;

        if (this.state.currentOperand === '+' || this.state.currentOperand === '-' || this.state.currentOperand === 'x' || this.state.currentOperand === '÷') {
          this.setState({
            currentOperand: parsedNum,
            previousOperand: this.state.previousOperand.concat(parsedNum)
          });
        } else if (this.state.currentOperand === '0' && parsedNum !== '0') {
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
        if (!this.state.currentOperand.includes('.')) {
          if (this.state.previousOperand === '') {
            this.setState({
              previousOperand: this.state.previousOperand.concat('0.')
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
        this.setState({
          currentOperand: '+',
          previousOperand: this.state.previousOperand.concat('+')
        });
        break;
      case 'subtract':
        this.setState({
          currentOperand: '-',
          previousOperand: this.state.previousOperand.concat('-')
        });
        break;
      case 'multiply':
        this.setState({
          currentOperand: 'x',
          previousOperand: this.state.previousOperand.concat('x')
        });
        break;
      case 'divide':
        this.setState({
          currentOperand: '÷',
          previousOperand: this.state.previousOperand.concat('÷')
        });
        break;

      // EQUALS
      case 'equals':
        this.evaluate();
        break;

      // CLEAR
      case 'clear':
        this.setState({
          currentOperand: '0',
          previousOperand: ''
        });
        break;
    }
  }

  evaluate() {
    // let str = this.state.previousOperand;
    // let evalStr = str.replaceAll(/x/g, '*').replaceAll(/÷/g, '/');
    let evaluated = eval(this.state.previousOperand.replaceAll(/x/g, '*').replaceAll(/÷/g, '/'));

    this.setState({
      currentOperand: evaluated,
      previousOperand: this.state.previousOperand.concat(`=${evaluated}`)
    });

    // eslint-disable-next-line no-eval
    console.log(evaluated);
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
