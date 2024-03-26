const questions = [
  {
    question: 'which on of the fowllowing is largest animal in the world?',
    answers: [
      { text: 'Shark', correct: false },
      { text: 'Blue whale', correct: true },
      { text: 'Elephant', correct: false },
      { text: 'Giraffe', correct: false },
    ],
  },
  {
    question: 'Which country has the biggest muslim population?',
    answers: [
      { text: 'India', correct: true },
      { text: 'Afghanistan', correct: false },
      { text: 'Pakistan', correct: false },
      { text: 'Iran', correct: false },
    ],
  },
  {
    question: 'Which Country is the world most largiest country?',
    answers: [
      { text: 'America', correct: false },
      { text: 'Russia', correct: true },
      { text: 'Canada', correct: false },
      { text: 'China', correct: false },
    ],
  },
  {
    question: 'Which country won 2023 Cricket World Cup?',
    answers: [
      { text: 'India', correct: false },
      { text: 'Pakistn', correct: false },
      { text: 'England', correct: false },
      { text: 'Australia', correct: true },
    ],
  },
];
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Next';
  showQuestion();
}

function showQuestion() {
  restState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    let button = document.createElement('button');
    button.classList.add('btn');
    button.innerHTML = answer.text;
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
}

function restState() {
  nextButton.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('incorrect');
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  nextButton.style.display = 'block';
}

function showScore() {
  restState();
  questionElement.innerHTML = `You Scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = 'Play Again';
  nextButton.style.display = 'block';
}

function handelNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length) {
    handelNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
