import React from 'react'
import { useState } from 'react'
import './App.css'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Die from './Die'

function App() {

  const [dice, setDice] = useState(allNewDiceNum())
  const [tenzies, setTenzies] = useState(false)
  const [count, setCount] = useState(0)
  const [bestScore, setBestScore] = useState(0)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
    }
  }, [dice])

  React.useEffect(() => {
    if (tenzies){
      const storedScore = Number(localStorage.getItem("score"))
      console.log(storedScore);
      console.log(count);
      if(count != storedScore) {
        const updateScore = count < storedScore ? count : storedScore;
        setBestScore(updateScore);
      }
      if ((count < storedScore || storedScore === 0) && count !== 0) {
        localStorage.setItem("score", count.toString());
      }
  }
    
  }, [tenzies])

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }

  function allNewDiceNum(){
    const diceNum = []
    for(let i=0; i<10; i++){
      diceNum.push(generateNewDie())
    }
    return diceNum
  }

  function rollDice() {
    if(!tenzies) {
      setCount(prevCount => prevCount + 1);
      setDice(oldDice => oldDice.map(die => {
          return die.isHeld ? 
              die :
              generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDiceNum())
      setCount(0)
    }
    
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
          {...die, isHeld: !die.isHeld} :
          die
    }))
  }

  const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container" >
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      <p className={`${tenzies ? '' : 'display-hide'}`} >You took {count} rolls to complete</p>
      <p className={`${tenzies ? '' : 'display-hide'}`} >Your best score is {bestScore}</p>
    </main>
  )
}

export default App
