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
        mode: props.mode,
        difficultyLevel : props.difficultyLevel,
        piece: props.piece
      };
      this.handleBotTurn = this.handleBotTurn.bind(this);
      this.getPossibleWinScenario = this.getPossibleWinScenario.bind(this);
    }
    possibleWinScenario = null;
    getPossibleWinScenario() {
      let possibleWinScenario = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
      if(this.state.difficultyLevel === "med") {
        possibleWinScenario = [
          [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6],
          [2,1,0],[5,4,3],[8,7,6],[6,3,0],[7,4,1],[8,5,2],[8,4,0],[6,4,2]
        ];
      } else if(this.state.difficultyLevel === "diff") {
        possibleWinScenario = [
          [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6],
          [2,1,0],[5,4,3],[8,7,6],[6,3,0],[7,4,1],[8,5,2],[8,4,0],[6,4,2],
          [0,2,1],[3,5,4],[6,8,7],[6,0,3]
        ];
      }
      return possibleWinScenario;
    }
    handleBotTurn() {
      let move;
      let botPiece = (this.state.piece === 'X' ) ? '0' : 'X';
      for (let i = 0; i < this.possibleWinScenario.length; i++) {
        const [a, b, c] = this.possibleWinScenario[i];
        if((this.state.squares[a] === botPiece) && (this.state.squares[a] === this.state.squares[b]) && !this.state.squares[c]) {
          move = c;
          break;
        }
        if((this.state.squares[a] === this.state.piece) && (this.state.squares[a] === this.state.squares[b]) && !this.state.squares[c]) {
          move = c;
          break;
        }
      }
      if(move>-1 && !this.state.squares[move]) { 
        this.handleClick(move);
      } else {
        this.makeOrdinaryMove();
      }
    }
    makeOrdinaryMove() {
      do{
        var randomNo = Math.round(Math.random()*8);
      } while(this.state.squares[randomNo])
      this.handleClick(randomNo);
    }
    componentDidMount() {
      if(this.state.mode === "one") {
        this.possibleWinScenario = this.getPossibleWinScenario();
      }
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
      squares[i] = this.state.xIsNext ? 'X' : '0'; //taking turns
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
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : '0'); //display who's next 
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