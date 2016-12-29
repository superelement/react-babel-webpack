import React from 'react';
import ReactDOM from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';
import Board from './Board.jsx';



class Game extends React.Component {

  constructor() {
    super();

    this.state = {
      historyLength: 0,
      currentBoardState: -1
    }

    // This binding is necessary to make `this` work in the callback
    this.onSquareClick = this.onSquareClick.bind(this);
  }

  onSquareClick(historyLength) {
    
    this.setState({
      historyLength: historyLength,
      currentBoardState: -1
    });
  }

  jumpTo(moveIndex) {
    // console.log("moveIndex", moveIndex, this);
    
    this.setState({
      currentBoardState: moveIndex
    });
  }

  render() {

    let moves = [];
    for(let i=0; i<this.state.historyLength; i++) {
      
      const desc = i ? `Move #${i}` : "Game Start";
      moves.push( (
        <li key={i}>
          <button type="button" onClick={() => this.jumpTo(i)}>{desc}</button>
        </li>
      ));
    }

    console.log("render game")
    return (
      <div className="game">
        <AwesomeComponent />
        
        <div className="game-board">
          <Board onSquareClick={this.onSquareClick} currentMoveIndex={this.state.currentBoardState} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('container')
);




window.addEventListener('mousedown', function(e) {
    document.body.classList.add('mouse-navigation');
    document.body.classList.remove('kbd-navigation');
});
window.addEventListener('keydown', function (e) {
    if (e.keyCode === 9) {
        document.body.classList.add('kbd-navigation');
        document.body.classList.remove('mouse-navigation');
    }
});
window.addEventListener('click', function (e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
        e.preventDefault();
    }
});
window.onerror = function (message, source, line, col, error) {
    var text = error ? error.stack || error : message + ' (at ' + source + ':' + line + ':' + col + ')';
    errors.textContent += text + '\n';
    errors.style.display = '';
};
console.error = (function (old) {
    return function error() {
        errors.textContent += Array.prototype.slice.call(arguments).join(' ') + '\n';
        errors.style.display = '';
        old.apply(this, arguments);
    }
})(console.error);