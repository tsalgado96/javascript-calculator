function Button(props) {
  return (
    <button className={'calc-button ' + props.class} id={props.id} onClick={props.handleClick}>
      {props.value}
    </button>
  );
}

export default Button;
