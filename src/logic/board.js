import { WINNER_COMBOS } from "../constants/constant"

export const checkWinnerFrom = (boardToCheck) =>{
    //se revisa todas las combinaciones ganadoras
    //para ver si X u O ganó
    for(const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if(
        boardToCheck[a] && 
         boardToCheck[a] === boardToCheck[b] && 
         boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    //si no hay ganador
    return null
  }

export const checkEndGame = (newBoard) => {
    //revisar si hay empates
    //si no hay espacios vacios
    //en el tablero
    return newBoard.every((square) => square !== null)
}