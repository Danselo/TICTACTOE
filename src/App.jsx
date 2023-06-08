import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square"
import { TURNS } from "./constants/constant"
import { checkWinnerFrom } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"
import { checkEndGame } from "./logic/board"
import { Board } from "./components/Board"

function App() {
const [board,setBoard] = useState(()=>{
  const boardFromStorage = window.localStorage.getItem('board')
  return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null) //rellenar todas las casillas del board 

})
const [turn,setTurn] = useState( ()=>{
  const turnFromStorage = window.localStorage.getItem('turn')
  return turnFromStorage ?? TURNS.X
  }
)
const [winner,setWinner] = useState(null) //null es que no hay ganador y false empate 


const resetGame= () =>{
  //setear los valores iniciales para volver a empezar
  setBoard(Array(9).fill(null))
  setTurn(TURNS.X)
  setWinner(null)
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}

const updateBoard =(index) =>{
if(board[index] || winner) return //no remplazar los que ya estan llenos 
  //ACTUALIZAR EL TABLERO 
//los datos del nuevo renderizado siempre deben ser nuevos !!IMPORTANTE
  const newBoard= [...board] // esto es para no mutar y tener una copia exacta del board 

  newBoard[index] = turn // x u o
  setBoard(newBoard)
//CAMBIAR TURNO
  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
  setTurn(newTurn) //colocar el nuevo turno
  //guardar partida 
  window.localStorage.setItem('board',JSON.stringify(newBoard));
  window.localStorage.setItem('turn',newTurn);

  //revisar si hay ganador

  const newWinner = checkWinnerFrom(newBoard)
  if(newWinner){
    confetti()
    setWinner(newWinner)
  }else if(checkEndGame(newBoard)){
    setWinner(false)
  } // check if game is over

}
return(
    <main className="board">
      <h1>Tres en Raya</h1>
      <button onClick={resetGame}>Reset del Juego </button>
      <Board board={board} updateBoard={updateBoard}/>
      <section className="turn">
        <Square isSelected={turn===TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn===TURNS.O}>{TURNS.O}</Square>
      </section>
      
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
