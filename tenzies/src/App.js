import React from "react"
import Confetti from "react-confetti"
import Die from "./Die"
import {nanoid} from "nanoid"

export default function App() {

  const [dice,setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [seconds,setSeconds] = React.useState(0)
  const [minutes,setMinutes] = React.useState(0)
  const [scores, setScores] = React.useState([])

  var timer;
 
    React.useEffect(()=>{
      if(!tenzies){
      timer = setInterval(()=>{
        setSeconds(seconds+1)
        if(seconds==59){
          setMinutes(minutes+1)
          setSeconds(0)
        }
        var score = seconds + (minutes * 60)
        setScores(prevState => {
         return [...prevState, score]
        })
        console.log(score)
    },1000)
      return () => clearInterval(timer)
    }},[seconds])
  
  React.useEffect(()=>{
    
   const allHeld = dice.every(die => die.isHeld) //true or false, depends if all of dice are true
   const firstValue = dice[0].value
   const equalVal = dice.every(die => die.value === firstValue)
    if(allHeld && equalVal){
      setTenzies(true)
      setMinutes(minutes)
      setSeconds(seconds)
      console.log("you won!!")
      if(parseInt(scores[scores.length-1])<10){
        alert("Your skill = TENZI Master!");
      }else if(parseInt(scores[scores.length-1])>10 && parseInt(scores[scores.length-1])<25){
        alert("Your skill =  Dice dragon!");
      }else if(parseInt(scores[scores.length-1])>25){
        alert("Your skill =  Cubie Newbie");
      }
      setScores(scores)
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
      setMinutes(0)
      setSeconds(0)
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
  
  const showScores = scores.map(function(best){
    <li>{best}</li>
})
   return(  
   <main> 
       {diceItem}
       <div>
         <div>
           
           <div><h3><i>Try to get all ten of your dice to the same number as fast as you can!</i></h3></div>
            <div><h3>Your time:{minutes} minutes and {seconds} seconds</h3></div>
            <button className="roll-dice" onClick={changeDice}>{ tenzies ? `New Game` : `Change` }</button>
            <ul><p>Records:</p>
                <li>TENZI Master(time less then 10s);</li>
                <li>Dice dragon (time between 10s and 25s);</li>
                <li>Cubie Newbie (time more then 25s)</li>
            </ul>
          </div>
         
       </div>
      
       {tenzies && <Confetti />}
  </main>
  )
  
}
