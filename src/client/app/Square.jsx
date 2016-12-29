import React from 'react';

// simple functional component

function Square(props) {
  return (
    <button className="square" onClick={props.onBtnClick}>
      {props.value}
    </button>
  );
}

export default Square;