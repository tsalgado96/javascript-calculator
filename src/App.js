import React from 'react';
import { calcElem } from './utilities/CalculatorElements';
import Button from './components/Button';
import Display from './components/Display';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainDisplay: [0],
      upperDisplay: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.pushNumber = this.pushNumber.bind(this);
    this.pushMainDisplay = this.pushMainDisplay.bind(this);
    this.pushFirstNumberMain = this.pushFirstNumberMain.bind(this);
    this.resetMainDisplay = this.resetMainDisplay.bind(this);
    this.pushUpperDisplay = this.pushUpperDisplay.bind(this);
    this.resetUpperDisplay = this.resetUpperDisplay.bind(this);
  }

  handleClick(event) {
    // eslint-disable-next-line default-case
    switch (event.target.id) {
      case 'clear':
        this.clearAll();
        break;
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
        this.pushNumber(event.target.id);
        break;
    }
  }

  pushNumber(numString) {
    let parsedNum = parseInt(document.getElementById(numString).textContent);

    if (this.state.mainDisplay[0] === 0) {
      this.pushFirstNumberMain(parsedNum);
    } else {
      this.pushMainDisplay(parsedNum);
    }

    if (this.state.upperDisplay[0] === 0) {
      this.pushFirstNumberUpper(parsedNum);
    } else {
      this.pushUpperDisplay(parsedNum);
    }
  }

  // ===========================
  // MAIN DISPLAY
  // ===========================
  pushFirstNumberMain(num) {
    this.setState({
      mainDisplay: [num]
    });
  }

  pushMainDisplay(num) {
    this.setState({
      mainDisplay: this.state.mainDisplay.concat(num)
    });
  }

  resetMainDisplay() {
    this.setState({
      mainDisplay: [0]
    });
  }

  // ===========================
  // UPPER DISPLAY
  // ===========================
  pushFirstNumberUpper(num) {
    this.setState({
      upperDisplay: [num]
    });
  }

  pushUpperDisplay(num) {
    this.setState({
      upperDisplay: this.state.upperDisplay.concat(num)
    });
  }

  resetUpperDisplay() {
    this.setState({
      upperDisplay: []
    });
  }

  clearAll() {
    this.resetMainDisplay();
    this.resetUpperDisplay();
  }

  render() {
    return (
      <div className="App">
        <div id="container">
          <Display mainDisplayValue={this.state.mainDisplay} upperDisplayValue={this.state.upperDisplay} />
          {calcElem.map((elem) => {
            return <Button value={elem.value} id={elem.id} class={elem.class} handleClick={this.handleClick} key={elem.id} />;
          })}
        </div>
      </div>
    );
  }
}

export default App;
