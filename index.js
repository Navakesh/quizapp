const questions=[
    {
        question:"What is the Surname of myname?",
        answers:[
            {text:"Mavuri",correct:false},
            {text:"Kshetriya",correct:false},
            {text:"Makala",correct:true},
            {text:"Mavurya",correct:false},
        ]
    },
    {
        question:"What is my date of birth?",
        answers:[
            {text:"28 March 2000",correct:false},
            {text:"23 April 2000",correct:false},
            {text:"19 ctober 200",correct:false},
            {text:"None of the Above",correct:true},
        ] 
    },
    {
        question:"which is my favourite bike?",
        answers:[
            {text:"bullet",correct:false},
            {text:"Himalaya bullet",correct:true},
            {text:"ninja 360",correct:false},
            {text:"pulsar 220 ",correct:false},
        ]
    },
    {
        question:"My Favourite biryani?",
        answers:[
            {text:"chicken biryani",correct:true},
            {text:"prawns biryani",correct:false},
            {text:"egg biryani",correct:false},
            {text:"mutton biryani",correct:false},
        ]
    }
];

const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+" . "+currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button =document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });

}
function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct =="true"){
            button.classList.add("correct")
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showscore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="play again";
    nextButton.style.display="block"
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex <questions.length){
        showQuestion();
    }else{
        showscore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex <questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();