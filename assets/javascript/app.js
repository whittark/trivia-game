    $('#start').on('click', function(){
    $('#start').remove();
    game.loadQuestion();
    })

    $(document).on('click', '.answer-button', function(e){
    game.clicked(e);
})

$(document).on('click', '#reset', function(){
    game.reset();
})

var questions = [{
    question: "What was an early cure for rheumatism?",
    answers:["Rub you joints with egg whites", "Wear a donkey skin", "Bathe in a pond during a new moon"],
    correctAnswer: "Wear a donkey skin",
}, {
    question: "What was a common remedy for baldness?",
    answers:["Wrap head in raw sheepskin", "Smear scalp with smashed beetles", "Eat mandrake roots"],
    correctAnswer: "Smear scalp with smashed beetles",
}, {
    question: "What was a common tip for curing jaundice?",
    answers:["Eat nine lice; wash down with ale", "Wear red underwear", "Avoid sunlight"],
    correctAnswer: "Eat nine lice; wash down with ale",
}, {
    question: "What was the remedy for swelling?",
    answers:["Rub with spit", "Wrap swelling in cloth soaked in goat urine", "Cut swelling off with a sharp knife"],
    correctAnswer: "Cut swelling off with a sharp knife",
}, {
    question: "What WASN'T an ingredient in a potion for gout?",
    answers:["A red haired dog boiled in oil", "Worms", "Bull's blood"],
    correctAnswer: "Bull's blood",
}, {
    question: "What were you to ingest if you had asthema?",
    answers:["Young frogs", "Fermented sheep gut", "Pig intestines"],
    correctAnswer: "Young frogs",
}, {
    question: "What was worn in a poltice bag around the neck for internal bleeding?",
    answers:["Fox's foot", "Dried toad", "Dead man's toenail clippings"],
    correctAnswer: "Dried toad",

}];

var game = {
    questions:questions,
    currentQuestion:0,
    counter:30,
    correct:0,
    incorrect:0,
    unanswered: 0,
    countdown: function(){
        game.counter--;
        $('#counter').html(game.counter);
        if(game.counter<=0){
            console.log("TIME'S UP!");
            game.timeUp();
        }
    },
    loadQuestion: function(){
        timer = setInterval(game.countdown, 1000);
        $('#subwrapper').html("<h2 Time Remaining <span id='counter'>30</ span> Seconds </h2>")
        $('#subwrapper').append('<h2>'+questions[game.currentQuestion].question+'</h2>');
        for(var i=0; i<questions[game.currentQuestion].answers.length;i++){
            $('#subwrapper').append('<button class="answer-button" id="button-'+i+'" data-name="'+questions[game.currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i]+'</button>');
        }
    },

    nextQuestion: function(){
        game.counter = 30;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },

    timeUp: function(){
        clearInterval(timer);
        game.unanswered++;
        $('#subwrapper').html('<h2>OUT OF TIME</h2>');
        $('#subwrapper').append('<h3>The correct answer was: '+questions[game.currentQuestion].correctAnswer+'</h3>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        }else{
            setTimeout(game.nextQuestion,3*1000);
        }
    },

    results: function(){
        clearInterval(timer);
        $('#subwrapper').html("<h2>GAME OVER!</h2>");
        $('#subwrapper').append("<h3>Correct answers: " +game.correct+"</h3>");
        $('#subwrapper').append("<h3>Wrong answers: " +game.incorrect+"</h3>");
        $('#subwrapper').append("<h3>Unanswered questions: " +game.unanswered+"</h3>");
        $('#subwrapper').append("<button id = 'reset'>RESET</button>");
    },

    clicked: function(e){
        clearInterval(timer);
        if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }
    },
    answeredCorrectly: function(){
        console.log("CORRECT!");
        clearInterval(timer);
        game.correct++;
        $('#subwrapper').html('<h2>CORRECT!</h2>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        }else{
            setTimeout(game.nextQuestion, 3*1000);
        }
    },
    answeredIncorrectly: function(){
        console.log("INCORRECT!");
        clearInterval(timer);
        game.incorrect++;
        $('#subwrapper').html('<h2>INCORRECT!</h2>');
        $('#subwrapper').append('<h3>The correct answer was: '+questions[game.currentQuestion].correctAnswer+'</h3>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        }else{
            setTimeout(game.nextQuestion, 3*1000);
        }
    },
    reset: function(){
        game.currentQuestion=0;
        game.counter = 0;
        game.correct= 0;
        game.incorrect=0;
        game.unanswered=0;
        game.loadQuestion();

    }
}
