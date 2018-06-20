import React from 'react';
import Square from './Square';

class Board extends React.Component {
    constructor(props) {
      super(props);
      let xIsNext = false, isBotTurn = false;
      if( (props.piece === 'X' && props.turn === "first") || (props.piece === '0' && props.turn === "second") ) {
        xIsNext = true;
      }
      if(props.mode === "one") {
        if(props.turn === "first") {
          isBotTurn = false;
        } else {
          isBotTurn = true;
        }
      }
      this.state = {
        squares: Array(9).fill(null),    
        xIsNext: xIsNext,
        winSquares: null,
        color: null,
        isBotTurn: isBotTurn,
        filledCount: 0,
        mode: props.mode
      };
      this.handleBotTurn = this.handleBotTurn.bind(this);
    }
    handleBotTurn() {
      do{
        var randomNo = Math.round(Math.random()*8);
      } while(this.state.squares[randomNo])
      this.handleClick(randomNo);
    }
    componentDidMount() {
      if(this.state.isBotTurn) {
        var that = this;
        setTimeout( function() {
          that.handleBotTurn();
        }, 3000);
      }
    }
    componentDidUpdate() {
      if(this.state.isBotTurn) {
        var that = this;
        setTimeout( function() {
          that.handleBotTurn();
        }, 3000);
      }
    }
   
    handleClick(i) {
      const squares = this.state.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O'; //taking turns
      let isBotTurn;
      if(this.state.mode === "two" ) {
        isBotTurn = false;
      } else {
        isBotTurn = !this.state.isBotTurn;
      }
      let result = calculateWinner(squares), winSquares;
      if( result ) {
          winSquares = result.winSquares;
      }
      this.setState({squares: squares, xIsNext: !this.state.xIsNext,
        isBotTurn: isBotTurn, filledCount: this.state.filledCount + 1, winSquares: winSquares});
    }
  
    renderSquare(i) {
      let color;
      this.state.squares[i] === 'X'? (color = '#0000ff') : (color = '#ff0000');
      if(this.state.winSquares && this.state.winSquares.indexOf(i)!== -1) {
          color = '#00ff00';
      } 
      if(!this.state.isBotTurn) {
        return (
          <Square id={"square_"+i} color={color}
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
          />
        );
      } else {
        return (
          <Square id={"square_"+i} color={color}
          value={this.state.squares[i]}
          />
        );
      }
    }
    
    render() {
        const result = calculateWinner(this.state.squares);
        let status;
        if (result && result.winner) {
            status = 'Winner: ' + result.winner;
        } else if(this.state.filledCount === 9) {
          status = "Match Drawn";	
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