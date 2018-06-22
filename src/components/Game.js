import React, { Component } from 'react';
import '../ticTacToe.css';
import Board from './Board';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: null, piece: null, turn: null, difficultyLevel: null, gotGameInfo: false
        };
        this.handleModeChange = this.handleModeChange.bind(this);
        this.handlePieceChange = this.handlePieceChange.bind(this);
        this.handleTurnChange = this.handleTurnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setDifficultyLevel = this.setDifficultyLevel.bind(this);
    }
    handleModeChange(event) {
        this.setState({ mode: event.target.value });
    }
    handlePieceChange(event) {
        this.setState({ piece: event.target.value });
    }
    handleTurnChange(event) {
        this.setState({ turn: event.target.value });
    }
    handleSubmit(event) {
        if (this.state.piece && this.state.turn) {
            if (this.state.mode === "two" || (this.state.mode === "one" && this.state.difficultyLevel)) {
                this.setState({ gotGameInfo: true });
            }
        }
        event.preventDefault();
    }
    setDifficultyLevel(event) {
        this.setState({ difficultyLevel: event.target.value });
    }
    reset() {
        this.setState({ mode: null, piece: null, turn: null, gotGameInfo: false });
    }
    
    render() {
        let levelInput = (
            <div>
                Choose Difficulty level: 
                <input type="radio" name="level" value="easy" onChange={this.setDifficultyLevel} /> Easy
                <input type="radio" name="level" value="med" onChange={this.setDifficultyLevel} /> Moderate
                <input type="radio" name="level" value="diff" onChange={this.setDifficultyLevel} /> Tough
            </div>
        );


        if (this.state.gotGameInfo) {
            return (
                <div className="game">
                    <div className="game-board">
                        <Board mode={this.state.mode} difficultyLevel={this.state.difficultyLevel}
                            piece={this.state.piece} turn={this.state.turn} />
                    </div>
                    <div id="resetSection"> <br /><button id="reset" onClick={() => this.reset()}>Reset</button></div>
                </div>
            );
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    Choose Game mode:
					<input type="radio" name="mode" value="one" onChange={this.handleModeChange} /> One Player
					<input type="radio" name="mode" value="two" onChange={this.handleModeChange} /> Two Player
					<br />

                    {this.state.mode === 'one' ? levelInput : null}

                    Choose 'X' or '0':
					<input type="radio" name="piece" value="X" onChange={this.handlePieceChange} /> X
					<input type="radio" name="piece" value="0" onChange={this.handlePieceChange} /> 0
					<br />

                    Which turn ?
					<input type="radio" name="turn" value="first" onChange={this.handleTurnChange} /> First
					<input type="radio" name="turn" value="second" onChange={this.handleTurnChange} /> Second
					<br />
                    <input type="submit" value="Submit" />
                </form>
            );
        }
    }
}

export default Game;
