import { useState } from "react";
import Card from "../Card/Card";
import "./Grid.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import isWinner from "../../helpers/checkWinner";
function Grid({ numberOfCards }) {
  const [turn, setTurn] = useState(false);
  const [board, setBoard] = useState(Array(numberOfCards).fill(""));
  const [winner, setWinner] = useState(null);
  function play(index) {
    if (turn === true) {
      board[index] = "O";
    } else {
      board[index] = "X";
    }
    const win = isWinner(board, turn ? "O" : "X");
    if (win) {
      setWinner(win);
      toast.success(`The winner is ${win}`);
    }
    setBoard([...board]);
    setTurn(!turn);
  }
  function reset() {
    setBoard(Array(numberOfCards).fill(""));
    setWinner(null);
    setTurn(false);
  }
  return (
    <>
      <>
        {winner && <h1 className="turn-highlight">Winner: {winner}</h1>}
        <button className="reset" onClick={reset}>
          Reset game
        </button>
        <ToastContainer position="top-center" />
      </>

      <h1 className="turn-highlight">Current Turn: {turn ? "X" : "O"}</h1>
      <div className="grid">
        {board.map((value, index) => {
          return (
            <Card key={index} onPlay={play} player={value} index={index} />
          );
        })}
      </div>
    </>
  );
}

export default Grid;
