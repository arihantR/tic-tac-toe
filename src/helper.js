
let helper = {
    calculateWinner: function(squares) {
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
    },
    makeOrdinaryMove: function(move, squares) {
        do{
          var position = Math.round(Math.random()*8);
        } while(squares[position])
        return position;
    },
    getPossibleWinScenario: function( difficultyLevel ) {
        let possibleWinScenario = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        if(difficultyLevel === "med") {
          possibleWinScenario = [
            [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6],
            [2,1,0],[5,4,3],[8,7,6],[6,3,0],[7,4,1],[8,5,2],[8,4,0],[6,4,2]
          ];
        } else if(difficultyLevel === "diff") {
          possibleWinScenario = [
            [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6],
            [2,1,0],[5,4,3],[8,7,6],[6,3,0],[7,4,1],[8,5,2],[8,4,0],[6,4,2],
            [0,2,1],[3,5,4],[6,8,7],[6,0,3]
          ];
        }
        return possibleWinScenario;
    },
    handleBotTurn(piece, squares, possibleWinScenario) {
        let move;
        let botPiece = (piece === 'X' ) ? '0' : 'X';
        for (let i = 0; i < possibleWinScenario.length; i++) {
          const [a, b, c] = possibleWinScenario[i];
          if((squares[a] === botPiece) && (squares[a] === squares[b]) && !squares[c]) {
            move = c;
            break;
          }
        }
        if(!move) {
          for (let i = 0; i < possibleWinScenario.length; i++) {
            const [a, b, c] = possibleWinScenario[i];
            if((squares[a] === piece) && (squares[a] === squares[b]) && !squares[c]) {
              move = c;
              break;
            }
          }
        }
        
        if(move>-1 && !squares[move]) { 
          return move;
        } else {
          let position = this.makeOrdinaryMove(move, squares);
          return position;
        }
    }
}

export default helper;