const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Paris", correct: true },
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false },
        { text: "Rome", correct: false }
      ]
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: [
        { text: "Mars", correct: true },
        { text: "Venus", correct: false },
        { text: "Jupiter", correct: false },
        { text: "Saturn", correct: false }
      ]
    },
    {
      question: "What is the largest ocean on Earth?",
      answers: [
        { text: "Pacific Ocean", correct: true },
        { text: "Atlantic Ocean", correct: false },
        { text: "Indian Ocean", correct: false },
        { text: "Arctic Ocean", correct: false }
      ]
    },
    {
      question: "Who painted the Mona Lisa?",
      answers: [
        { text: "Leonardo da Vinci", correct: true },
        { text: "Vincent van Gogh", correct: false },
        { text: "Michelangelo", correct: false },
        { text: "Raphael", correct: false }
      ]
    },
    {
      question: "What is 9 + 10?",
      answers: [
        { text: "19", correct: true },
        { text: "21", correct: false },
        { text: "20", correct: false },
        { text: "18", correct: false }
      ]
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      answers: [
        { text: "Oxygen", correct: true },
        { text: "Osmium", correct: false },
        { text: "Zinc", correct: false },
        { text: "Iron", correct: false }
      ]
    },
    {
      question: "Which language runs in the browser?",
      answers: [
        { text: "JavaScript", correct: true },
        { text: "Python", correct: false },
        { text: "Java", correct: false },
        { text: "C++", correct: false }
      ]
    },
    {
      question: "How many continents are there?",
      answers: [
        { text: "7", correct: true },
        { text: "5", correct: false },
        { text: "6", correct: false },
        { text: "8", correct: false }
      ]
    },
    {
      question: "Who wrote 'Hamlet'?",
      answers: [
        { text: "William Shakespeare", correct: true },
        { text: "Charles Dickens", correct: false },
        { text: "Mark Twain", correct: false },
        { text: "Jane Austen", correct: false }
      ]
    },
    {
      question: "Which is the smallest prime number?",
      answers: [
        { text: "2", correct: true },
        { text: "1", correct: false },
        { text: "3", correct: false },
        { text: "0", correct: false }
      ]
    }
  ];
  
  const questionEl = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const feedbackEl = document.getElementById("feedback");
  const scoreDisplay = document.getElementById("score-display");
  const resultBox = document.getElementById("result-box");
  const quizBox = document.getElementById("quiz-box");
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizBox.classList.remove("hide");
    resultBox.classList.add("hide");
    nextButton.innerText = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    let current = questions[currentQuestionIndex];
    questionEl.innerText = current.question;
  
    let shuffledAnswers = [...current.answers].sort(() => Math.random() - 0.5);
  
    shuffledAnswers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectAnswer(button, answer.correct));
      answerButtons.appendChild(button);
    });
  }
  
  function resetState() {
    feedbackEl.innerText = "";
    nextButton.classList.add("hide");
    answerButtons.innerHTML = "";
  }
  
  function selectAnswer(selectedButton, isCorrect) {
    const allButtons = answerButtons.querySelectorAll("button");
  
    allButtons.forEach(button => button.disabled = true);
  
    if (isCorrect) {
      selectedButton.classList.add("correct");
      feedbackEl.innerText = "✅ Correct!";
      score++;
    } else {
      selectedButton.classList.add("wrong");
      feedbackEl.innerText = "❌ Wrong!";
      allButtons.forEach(btn => {
        const answerText = btn.innerText;
        const correctAnswer = questions[currentQuestionIndex].answers.find(a => a.text === answerText);
        if (correctAnswer && correctAnswer.correct) {
          btn.classList.add("correct");
        }
      });
    }
  
    nextButton.classList.remove("hide");
  }
  
  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  });
  
  function showScore() {
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    scoreDisplay.innerText = `${score} out of ${questions.length}`;
  }
  
  startQuiz();
  