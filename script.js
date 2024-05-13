const questions = [
    {
        question: "Sebuah benda mula-mula dititik A(0,0) kemudian bergerak selama 2 sekon ke titik B(4,2). Selanjutnya bergerak lagi selama 3 sekon ke titik C(8,6). Kecepatan rata-rata gerak benda adalah?",
        answers: [
            {text: "1 ms^-1", correct: false},
            {text: "1,5 ms^-1", correct: false},
            {text: "2 ms^-1", correct: true},
            {text: "2 V2 ms^-1", correct: false},
            {text: "4,75 ms^-1", correct: false},
        ]
    },
    {
        question: "Dua gabus berjarak 3 m terapung dipuncak gelombang air laut. Terdapat dua lembah antara keduanya dan energi gelombang membutuhkan waktu 6 sekon untuk berpindah dari gabus satu ke yang kedua. Kecepatan rambat dan panjang gelombangnya berturut-turut adalah?",
        answers: [
            {text: "1 m/s dan 6 m", correct: false},
            {text: "1 m/s dan 3 m", correct: false},
            {text: "0,5 m/s dan 6 m", correct: false},
            {text: "0,5 m/s dan 3m", correct: false},
            {text: "0,5 m/s dan 1,5 m", correct: true},
        ]
    },
    {
        question: " Volume gas ideal didalam ruang tertutup diperkecil kali semula dalam proses isothermis, maka tekanannya menjadi?",
        answers: [
            {text: "1/4 kali semula", correct: false},
            {text: "1/2 kali semula", correct: false},
            {text: "1 kali semula", correct: false},
            {text: "2 kali semula", correct: true},
            {text: "4 kali semula", correct: false},
        ]
    },
    {
        question: "Seorang pemborong mampu menyelesaikan pekerjaannya selama 49 hari, dengan 64 pekerja. Karena sesuatu hal pekerjaan itu harus selesai dalam waktu 28 hari. Banyak pekerja yang harus ditambahkan adalah?",
        answers: [
            {text: "38 pekerja", correct: false},
            {text: "48 pekerja", correct: true},
            {text: "102 pekerja", correct: false},
            {text: "112 pekerja", correct: false},
            {text: "121 pekerja", correct: false},
        ]
    },
    {
        question: "Suatu gedung perkantoran dengan ukuran 20 meter x 30 meter. Ukuran gedung tersebut pada denah adalah 40 cm x 60 cm. Skala yang digunakan pada denah tersebut adalah?",
        answers: [
            {text: "1 : 50", correct: true},
            {text: "1 : 100", correct: false},
            {text: "1 : 500", correct: false},
            {text: "1 : 1000", correct: false},
            {text: "1 : 2000", correct: false},
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("btn-next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz () {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion () {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach (answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState () {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer (e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore () {
    resetState();
    questionElement.innerHTML =  `Your scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton () {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener ("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();