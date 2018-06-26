import React from 'react';
import Square from './Square';
import helper from '../helper'

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
      isBotTurn: isBotTurn,
      filledCount: 0
    };
  }
  
  possibleWinScenario = null;
  
  componentDidMount() {
    this.initialState = this.state;
    if(this.props.mode === "one") {
      this.possibleWinScenario = helper.getPossibleWinScenario( this.props.difficultyLevel );
    }
    if(this.state.isBotTurn) {
      var that = this;
      setTimeout( function() {
        that.handleClick(helper.handleBotTurn(that.props.piece, that.state.squares, that.possibleWinScenario));
      }, 3000);
    }
  }
  componentDidUpdate() {
    if(this.state.isBotTurn) {
      var that = this;
      setTimeout( function() {
        that.handleClick(helper.handleBotTurn(that.props.piece, that.state.squares, that.possibleWinScenario));
      }, 3000);
    }
  }
  
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (helper.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : '0'; //taking turns
    let isBotTurn;
    if(this.props.mode === "two" ) {
      isBotTurn = false;
    } else {
      isBotTurn = !this.state.isBotTurn;
    }
    let result = helper.calculateWinner(squares), winSquares;
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
  reset() {
    this.setState(this.initialState);
  }
  render() {
      const result = helper.calculateWinner(this.state.squares);
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
        <div id="restartSection"> <br /><button id="reset" onClick={() => this.reset()}>Play Again</button></div>
      </div>
    );
  }
}

export default Board;