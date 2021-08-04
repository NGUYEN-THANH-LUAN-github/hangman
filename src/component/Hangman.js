import React, { Component } from 'react'
import img0 from '../images/0.jpg'
import img1 from '../images/1.jpg'
import img2 from '../images/2.jpg'
import img3 from '../images/3.jpg'
import img4 from '../images/4.jpg'
import img5 from '../images/5.jpg'
import img6 from '../images/6.jpg'
import win from '../images/win.jpg'
import { randomWord } from '../words'
import AlphaButton from './AlphaButton'

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  }

  constructor(props) {
    super(props)
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() }
    this.handleGuess = this.handleGuess.bind(this)
    this.restartGame = this.restartGame.bind(this)
  }

  guessedWord() {
    return this.state.answer
      .split('')
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : '_'))
  }

  handleGuess(evt) {
    let ltr = evt.target.value
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }))
  }

  generateButtons() {
    return 'abcdefghijklmnopqrstuvwxyz'
      .split('')
      .map((ltr) => (
        <AlphaButton
          key={ltr}
          value={ltr}
          handleClick={this.handleGuess}
          disabled={this.state.guessed.has(ltr)}
        />
      ))
  }

  restartGame() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    })
  }

  render() {
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        {this.guessedWord().includes('_') ? (
          <div>
            <img
              src={this.props.images[this.state.nWrong]}
              alt={`${this.state.nWrong}/6 wrong guesses.`}
            />
            <p>Number wrong: {this.state.nWrong}/6 </p>
            <p className='Hangman-word'>{this.guessedWord()}</p>
            {this.state.nWrong < this.props.maxWrong ? (
              <p className='Hangman-btns'>{this.generateButtons()}</p>
            ) : (
              <div>
                <h3 style={{ color: 'red' }}>You lost</h3>
                <p>
                  Answer:{' '}
                  <strong style={{ fontSize: '1.3em' }}>
                    {this.state.answer}
                  </strong>
                </p>
              </div>
            )}
            <br />
          </div>
        ) : (
          <div>
            <img src={win} alt='You Won' style={{ width: '400px' }} />
            <p className='Hangman-word'>{this.guessedWord()}</p>
          </div>
        )}
        <button
          style={{
            backgroundColor: 'green',
            width: 'max-content',
            textAlign: 'center',
          }}
          onClick={this.restartGame}>
          Restart
        </button>
        <span>Answer: {this.state.answer}</span>
      </div>
    )
  }
}

export default Hangman
