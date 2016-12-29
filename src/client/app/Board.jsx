import React from 'react';
import Square from './Square.jsx';
import cloneDeep from 'lodash/cloneDeep';

class Board extends React.Component {

  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      history: [],
      status: "Start"
    }
  }

//   refreshState(boardState) {
//       this.setState(boardState);
//   }

  onSquareClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });

    // console.log(cloneDeep(this.state))

    let history = this.state.history.slice();
    history.push( cloneDeep(this.state) );
    
    this.setState({
      history: history
    });

    this.props.onSquareClick( history.length );
  }

  renderSquare(i) {
    let state = this.getCurrentState();
    return <Square value={state.squares[i]} onBtnClick={() => this.onSquareClick(i)} />;
  }

  getStatus() {
    let state = this.getCurrentState();

    const winner = _calculateWinner(state.squares);
    
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (state.xIsNext ? 'X' : 'O');
    }

    return status;
  }

  getCurrentState() {

    let state = this.state;
    if(this.state.history.length && this.props.currentMoveIndex > -1) {
        state = this.state.history[this.props.currentMoveIndex];
    }
    return state;
  }

  render() {
    
    let state = this.getCurrentState();
    let status = this.getStatus();
    
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

function _calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board;