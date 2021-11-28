function Display(props) {
  return (
    <div id="display-container">
      <div id="upper-display">{props.previousOperand}</div>
      <div id="display">{props.currentOperand}</div>
    </div>
  );
}

export default Display;
