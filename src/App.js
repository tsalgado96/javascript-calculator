import React from 'react';
import { calcElem } from './utilities/CalculatorElements';
import Button from './components/Button';
import Display from './components/Display';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    console.log(event.target.id)
  }

  render() {
    return (
      <div className="App">
        <div id="container">
          <Display />
          {calcElem.map((elem) => {
            return <Button value={elem.value} id={elem.id} class={elem.class} handleClick={this.handleClick}/>;
          })}
        </div>
      </div>
    );
  }
}

export default App;
