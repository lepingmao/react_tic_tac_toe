import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
function Square(props){
  return (
    <button 
      className="square" onClick={props.ClickControl}
    >
      {props.value} 
    </button>
  );
}
*/

class Square extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
      return (
        //<button className="square" onClick={function() {alert('click'); }}>
        <button 
            className="square" 
            //onClick={()=> this.setState({value:'X'})}
            onClick = {()=> this.props.ClickControl()}
        >
          {this.props.value}
        </button>
        //{this.state.value} <= put between button
      );
    }
  }
  
class Board extends React.Component {
    /*
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
        this.baseState = this.state;
        this.reset = 0;
    }
  */  
    renderSquare(i) {
        return (
        <Square 
          value={this.props.squares[i]}
          ClickControl={()=> this.props.onClick(i)}
        />
        );
      }

    render() {
      return (
        <div>
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
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history : [
          {
          squares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true
      };
    }

    handleClick(i){
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]){
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([
          {
          squares: squares,
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }

    jumpTo(step){
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      
      const moves = history.map(
        (step, move) => {
          const desc = move ? 'GO TO MOVE #' + move : 'GO TO GAME START';
          return(
            <li key={move}>
              <button onClick = {() => this.jumpTo(move)}>
                {desc}
              </button>
            </li>
          );
        }
      );

      let status;
      if(winner){
        status = 'Winner: ' + winner;
      }
      else{
        status = 'Next player: ' + (this.state.xIsNext ? 'X':'O');
      }

      return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board
              squares = {current.squares}
              onClick = {(i) => this.handleClick(i)}
            />
          </div>
          
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
      );
    }
  }

  function calculateWinner(squares){
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
  
    for (let i = 0; i<lines.length;i++){
      if (squares[lines[i][0]] && squares[lines[i][0]]===squares[lines[i][1]] && squares[lines[i][1]]===squares[lines[i][2]]){
        return squares[lines[i][0]];
      }
    }
  
    return null;
  }
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  