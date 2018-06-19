import React from 'react';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick} style={{border: 'solid 1px '+ props.borderColor, color: props.color}}>
        {props.value}
      </button>
    );
  }

  export default Square;