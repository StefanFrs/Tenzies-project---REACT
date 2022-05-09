import React from "react"
import Confetti from "react-confetti"
import Die from "./Die"
import {nanoid} from "nanoid"

export default function App() {
  
  const [dice,setDice] = React.useState(allNewDice())

  function allNewDice(){
    const arrayNumbers = []
    for(var i=0; i<10;i++){
      arrayNumbers.push({
        value: Math.ceil(Math.random() * 6), 
        isHeld: false,
        id:nanoid()
      })
    }
    return arrayNumbers
  }

  function changeDice(){
    setDice(allNewDice())
  }
   
  function holdDice(id){
    //looping to all the dice, if the id matches reverse it else keep it
    setDice(prev => prev.map(die => {
        return die.id === id ? 
      {...die, isHeld: !die.isHeld} :die
    }))
  }

const diceItem = dice.map(die => 
  <Die key={die.id} onClick={holdDice} value = {die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/> )

   return(  
   <main> 
       {diceItem}
       <button className="roll-dice" onClick={changeDice}>Change</button>
  </main>
  )
  
}
