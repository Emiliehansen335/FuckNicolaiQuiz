import { useState } from 'react'
import './App.css'

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [feedbackShown, setFeedbackShown] = useState(false)

  const questions = [
    {
      question: 'Hvem var utro?',
   options: [
        { text: 'Nicolai', correct: true },
        { text: 'Emma og Nicolai', correct: false },
        { text: 'Emma', correct: false }
      ]
    },
    {
      question: 'Hvor mange gange lyver Nicolai på en dag?',
      options: [
        { text: 'O gange', correct: false },
        { text: 'Uendeligt mange gange', correct: true },
        { text: '1 gang', correct: false }
      ]
    },
    {
      question: 'Hvem sover altid når der er lavet en aftale?',
    options: [
        { text: 'Emma', correct: false },
        { text: 'Emma og Nicolai', correct: false },
        { text: 'Nicolai', correct: true }
      ]
    },
    {
      question: 'Hvem tror den anden er utro, når man ser et billede af en måne?',
      options: [
        { text: 'Nicolai', correct: true },
        { text: 'Emma og Nicolai', correct: false },
        { text: 'Emma', correct: false }
      ]
    }
  ]

  const handleAnswerClick = (optionIndex) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = optionIndex
    setUserAnswers(newAnswers)
    setFeedbackShown(true)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setFeedbackShown(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setFeedbackShown(false)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setQuizCompleted(false)
    setFeedbackShown(false)
  }

  const calculateScore = () => {
    let score = 0
    questions.forEach((question, index) => {
      if (userAnswers[index] !== undefined && question.options[userAnswers[index]].correct) {
        score++
      }
    })
    return score
  }

  if (quizCompleted) {
    const score = calculateScore()
    return (
      <div className="quiz-container">
        <h1>Quiz Afsluttet</h1>
        <p>Din score: {score} ud af {questions.length}</p>
        <button onClick={resetQuiz} className="reset-button">Start igen</button>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const selectedAnswer = userAnswers[currentQuestionIndex]

  return (
    <div className="quiz-container">
      <h1>Quiz</h1>
      <div className="progress">
        Spørgsmål {currentQuestionIndex + 1} af {questions.length}
      </div>
      <div className="question">
        <p>{currentQuestion.question}</p>
      </div>
      {feedbackShown && (
        <div className="feedback">
          <p className={currentQuestion.options[selectedAnswer].correct ? 'correct' : 'incorrect'}>
            {currentQuestion.options[selectedAnswer].correct ? 'Rigtigt!' : 'Forkert!'}
          </p>
        </div>
      )}
      <div className="options">
        {currentQuestion.options.map((option, index) => {
          let buttonClass = 'option-button'
          if (feedbackShown) {
            if (option.correct) {
              buttonClass += ' correct-answer'
            } else if (selectedAnswer === index) {
              buttonClass += ' incorrect-answer'
            }
          } else if (selectedAnswer === index) {
            buttonClass += ' selected'
          }
          return (
            <button
              key={index}
              onClick={() => !feedbackShown && handleAnswerClick(index)}
              disabled={feedbackShown}
              className={buttonClass}
            >
              {option.text}
            </button>
          )
        })}
      </div>
      <div className="navigation">
        <button onClick={previousQuestion} disabled={currentQuestionIndex === 0} className="nav-button">
          Forrige
        </button>
        {feedbackShown && (
          <button onClick={nextQuestion} className="nav-button">
            {currentQuestionIndex === questions.length - 1 ? 'Afslut' : 'Næste'}
          </button>
        )}
      </div>
    </div>
  )
}

export default App
