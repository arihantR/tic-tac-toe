import React from 'react';
import Square from './Square';

class Board extends React.Component {
    constructor(props) {
      super(props);
      let xIsNext = false;
      if( (props.piece === 'X' && props.turn === "first") || (props.piece === '0' && props.turn === "second") ) {
        xIsNext = true;
      }
      this.state = {
        squares: Array(9).fill(null),     
        xIsNext: xIsNext,    // first turn X by default
        winSquares: null,
        color: null
      };
    }
  
    handleClick(i) {
      const squares = this.state.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O'; //taking turns
      this.setState({squares: squares, xIsNext: !this.state.xIsNext});
    }
  
    renderSquare(i) {
        let color, borderColor;
        this.state.squares[i] === 'X'? (color = '#0000ff') : (color = '#ff0000');
        if(this.state.winSquares && this.state.winSquares.indexOf(i)!== -1) {
            color = '#00ff00';
        } 
        this.state.xIsNext ? (borderColor = '#0000ff') : (borderColor = '#ff0000')
        return (
            <Square id={"square_"+i}
                color={color}
                borderColor={borderColor}
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }
    
    render() {
        const result = calculateWinner(this.state.squares);
        let status;
        if (result && result.winner) {
            status = 'Winner: ' + result.winner;
            this.setState({ color: '#ff0000' });
            this.setState({ winSquares: result.winSquares });
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'); //display who's next 
        }
  
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

function calculateWinner(squares) {
    const winScenario = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winScenario.length; i++) {
      const [a, b, c] = winScenario[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], winSquares: winScenario[i]};
      }
    }
    return null;
}

export default Board;