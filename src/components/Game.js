import React, { Component } from 'react';
import '../ticTacToe.css';
import Board from './Board';

class Game extends Component {
  	constructor(props) {
		super(props);
		this.state = {
            mode: null, piece: null, turn: null, gotGameInfo: false
        };
		this.handleModeChange = this.handleModeChange.bind(this);
		this.handlePieceChange = this.handlePieceChange.bind(this);
		this.handleTurnChange = this.handleTurnChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleModeChange(event) {
		this.setState({mode: event.target.value});
	}
	handlePieceChange(event) {
		this.setState({piece: event.target.value});
	}
	handleTurnChange(event) {
		this.setState({turn: event.target.value});
	}
    handleSubmit(event) {
		if(this.state.piece && this.state.turn) {
			this.setState({gotGameInfo: true});
		}
		event.preventDefault();	
    }
	reset() {
		this.setState({mode: null, piece: null, turn: null, gotGameInfo: false});
	}
    render() {
		if( this.state.gotGameInfo ) {
			return (
				<div className="game">
					<div className="game-board">
					  <Board mode={this.state.mode} piece={this.state.piece} turn={this.state.turn}/>
					</div>
					<div id="resetSection"> <br/><button id = "reset" onClick={() => this.reset()}>Play again</button></div>
				</div>
			);
		} else {
			return (
				<form onSubmit={this.handleSubmit}>
					
					Choose Game mode:
					<input type="radio" name="mode" value="one" onChange={this.handleModeChange}/> One Player
					<input type="radio" name="mode" value="two" onChange={this.handleModeChange}/> Two Player						
					<br/>
					
					Choose 'X' or '0':
					<input type="radio" name="piece" value="X" onChange={this.handlePieceChange}/> X
					<input type="radio" name="piece" value="0" onChange={this.handlePieceChange}/> 0				
					<br/>
					
					Which turn ?
					<input type="radio" name="turn" value="first" onChange={this.handleTurnChange}/> First
					<input type="radio" name="turn" value="second" onChange={this.handleTurnChange}/> Second			
					<br/>
					<input type="submit" value="Submit" />
				</form>
			);
		}
    }
}

export default Game;
