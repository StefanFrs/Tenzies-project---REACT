import React from "react"
import Confetti from "react-confetti"
import Die from "./Die"

export default function App() {
  
  const [dice,setDice] = React.useState(allNewDice())

  function allNewDice(){
    const arrayNumbers = []
    for(var i=0; i<10;i++){
      arrayNumbers.push(Math.floor(Math.random() * 6)+1)
    }
    return arrayNumbers
  }
   
const diceItem = dice.map(die => 
  <Die value = {die}/> )

   return(  
   <main> 
       {diceItem}
  </main>
  )
  
}
