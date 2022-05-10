import React from "react"
import Confetti from "react-confetti"
import Die from "./Die"
import {nanoid} from "nanoid"


export default function App() {
  
  const [dice,setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [seconds,setSeconds] = React.useState(0)
  const [minutes,setMinutes] = React.useState(0)

  var timer;
 
    React.useEffect(()=>{
      if(!tenzies){
      timer = setInterval(()=>{
        setSeconds(seconds+1)
        if(seconds==59){
          setMinutes(minutes+1)
          setSeconds(0)
        }
    },1000)
      return () => clearInterval(timer)
    }})
  
 

  React.useEffect(()=>{
   const allHeld = dice.every(die => die.isHeld) //true or false, depends if all of dice are true
   const firstValue = dice[0].value
   const equalVal = dice.every(die => die.value === firstValue)
    if(allHeld && equalVal){
      setTenzies(true)
      setMinutes(0)
      setSeconds(0)
      console.log("you won!!")
    }

  },[dice])

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
    if( !tenzies){
      //roll the dice if is not over
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : {
          value: Math.ceil(Math.random() * 6), 
          isHeld: false,
          id:nanoid()
        }
      }
      ))
    } else{
      setTenzies(false)
      setDice(allNewDice())
    }
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
       <div>
       <div><h2>Your time:{minutes} minutes and {seconds} seconds</h2></div>
       <button className="roll-dice" onClick={changeDice}>{ tenzies ? `New Game` : `Change` }</button>
       </div>
       {tenzies && <Confetti />}
  </main>
  )
  
}
