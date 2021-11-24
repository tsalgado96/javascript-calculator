function Display(props){
  return (
    <div id="display-container">
      <div id="upper-display">{props.upperDisplayValue}</div>
      <div id="display">{props.mainDisplayValue}</div>
    </div>
  )
}

export default Display;