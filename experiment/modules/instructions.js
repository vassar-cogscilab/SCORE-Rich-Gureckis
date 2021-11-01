// var animation_sequence = ["./materials/firstscreenshot.png", "./materials/midscreenshot.png", "./materials/fullscreenshot.png"]

// var animation_trial = {
//     type: 'animation',
//     stimuli: animation_sequence,
//     sequence_reps: 12
// };


var instructions_quiz_attempt_count = 0;

function conditional_instructions() {
  var response = '';
  if (condition_assignment  == 'contingent') {
    response += `If you choose to avoid a hive, you won't gain or lose any money,<br>
                  and <strong>you won't discover whether the bees there were friendly or dangerous.<strong>`; // contingent assignment
  } else {
    response += `If you choose to avoid a hive, you won't gain or lose any
                  money,<br>but <strong>you will still find out whether the bees were friendly
                  or dangerous.<strong>`; // full-info assignment
  }
  return response;
}

function conditional_diagram() {
  var response = 'The diagram below summarizes the possibilities of each choice:<br>';
  if(condition_assignment == 'contingent') {
    response += '<img src="materials/instr_outcomes_standard.png"></img>'
  } else {
    response += '<img src="materials/instr_outcomes_fullinfo.png"></img>' // not entirely sure what this idea behind this graphic is, although it surely won't hurt to include.
  }
  return response;
}


// INSTRUCTIONS
var instructions = {
  type: 'instructions',
    pages: [
      `In this experiment, you will play a simple video game in which you take on the role of a beekeeper collecting honey.`,

      `Most of your beehives have friendly bees, which will allow you
      to collect honey.  Unfortunately, some of your colonies
      have been infiltrated by dangerous bees, which will sting
      you if you approach them.<br><br>
      Your job is to <strong>collect as much
      honey as possible from friendly bees</strong>, while learning
      to <strong>avoid dangerous bees</strong> so you aren't stung.`,

      `You will collect honey from <strong>64</strong> beehives, which contain several
      different bee varieties. At each hive, you will see one of the
      bees that live there and will then need to choose whether to harvest
      honey from the hive or to avoid it.`,

      ` If you choose to harvest the hive...<br> you will be able to collect
      honey if the bee variety is friendly, but will be stung if the
      bee variety is dangerous. <br><br><strong>Collecting honey adds $0.02 to
      your bonus</strong> for the experiment, while <strong>being
      stung subtracts $0.10</strong> because you need expensive
      medicine to treat the sting.`,

      conditional_instructions(),

      `<strong>You begin with a bonus of $0.40</strong>.<br>There will be
      no changes in which bee varieties are friendly and which are
      dangerous over the course of the experiment.`,

      `Each hive is home to a single variety of bees, and these varieties have
      different features which can allow you to tell them apart and tell which will be dangerous.<br><br>
      The bee varieties differ in four ways.`,


      'They can have 2 or 6 legs.<br> <img src="materials/instrlegs.png"></img>',

      'They can have single or double wings.<br> <img src="materials/instrwings.png"></img>',

      'They can have stripes or dots on their bodies.<br> <img src="materials/instrstripes.png"></img>',

      'They can have antennae or no antennae.<br>  <img src="materials/instrantennae.png"></img>',

      `It's possible to learn to predict perfectly which bees are friendly and which are dangerous using these four features,<br>
      so that you can harvest from bees that will give you honey while avoiding bees that would sting you.`,

      conditional_diagram(),

      `Ready to go?`,

      `Before we begin, you will take a short quiz on how the experiment will work.`
    ],
  show_clickable_nav: true,
  // show_page_number: true
}


var instructions_quiz_first = [
  {
    prompt: 'Which of the following are features of the bee varieties?',
    options: ['Two or six legs', 'Square or round body', 'Single or compound eyes',
              'Stripes or spots on body', 'Stinger or no stinger', 
              'Single or double wings', 'Tall or short body', 'Antennae or no antennae'],
    required: true,
    correct_response: ['Two or six legs', 'Stripes or spots on body', 'Single or double wings', 'Antennae or no antennae'],
    name: 'Q0'
  },
]

var instructions_quiz_questions = [
  {
    prompt: 'Can a bee variety change from being friendly to dangerous or dangerous to friendly over time?',
    options: ['No.', 'Yes.'],
    required: true,
    correct_response: 'No.',
    name: 'Q1'
  },
  {
    prompt: 'How can you learn to tell whether a bee variety is dangerous?',
    options: ['Based on the color of the bee.', 'Based on the four features of the bee.', 'Based on the order in which you see the bees.'],
    required: true,
    correct_response: 'Based on the four features of the bee.',
    name: 'Q2'
  },
  {
    prompt: 'What happens when you avoid a bee variety?',
    options: ['You do not learn if it was friendly or dangerous, and do not alter your bonus.',
              'You learn if it was friendly or dangerous, but do not alter your bonus.',
              'You learn if it was friendly or dangerous and alter your bonus.'],
    required: true,
    correct_response: conditional_quiz(),
    name: 'Q3'
  }
]

function conditional_quiz() {
var question3 = '';
if (condition_assignment  == 'contingent') {
  question3 += 'You do not learn if it was friendly or dangerous, and do not alter your bonus.'; // contingent assignment
} else {
  question3 += 'You learn if it was friendly or dangerous, but do not alter your bonus.'; // full-info assignment
}
return question3;
}

var first_checkpoint = false;

var post_instructions_quiz_first = {
  type: 'survey-multi-select',
  questions: instructions_quiz_first,
  on_finish: (data) => {
    var responses = data.response.Q0;
    var correct_responses = instructions_quiz_first[0].correct_response;
    var correct = true;
    if(responses.length == correct_responses.length){
      for(var r of responses){
        if(!correct_responses.includes(r)){
          correct = false;
        }
      }
    } else {
      correct = false;
    }
    data.correct = correct;
    first_checkpoint = data.correct
    console.log(data.correct);
  }
}

var second_checkpoint = false; 

var post_instructions_quiz = {
  type: 'survey-multi-choice',
  questions: instructions_quiz_questions,
  on_start: () => {
    instructions_quiz_attempt_count++;
  },
  on_finish: (data) => {
    var Q1_correct = data.response.Q1 == instructions_quiz_questions[0].correct_response;
    var Q2_correct = data.response.Q2 == instructions_quiz_questions[1].correct_response;
    var Q3_correct = data.response.Q3 == instructions_quiz_questions[2].correct_response;
    data.correct = Q1_correct && Q2_correct && Q3_correct;
    second_checkpoint = data.correct;
    console.log(data.correct);
  }
} 


var instructions_quiz_feedback = {
  type: 'html-button-response',
  stimulus: () => {
    console.log('first check'+first_checkpoint);
    console.log('second check'+second_checkpoint);
    var quiz_passed = first_checkpoint && second_checkpoint;
    console.log('passed?'+quiz_passed);
    if(quiz_passed) {
      return `<p>Congrats, you got everything right<br>When you're ready, click the button below to continue to the experiment.</p>`
    } else if (instructions_quiz_attempt_count < 2) {
      return `<p>You did not answer all comprehension questions correctly.<br>Press <b>continue</b> to review the instructions again.</p>`
    } else {
      return `<p>At least one answer is incorrect. Your participation is no longer requested in this experiment.</p>`
    }
  },
  choices: ['Continue'],
  on_finish: () => {
    var first_checkpoint = jsPsych.data.get().last(3).values()[0].correct;
    var second_checkpoint = jsPsych.data.get().last(2).values()[0].correct;
    var all_correct = first_checkpoint && second_checkpoint;
    if (instructions_quiz_attempt_count >= 2 && !all_correct){
      document.exitFullscreen();
      jsPsych.endExperiment();
    }
  }
}


var instruction_repeat = {
  timeline: [
    instructions,
    post_instructions_quiz_first,
    post_instructions_quiz,
    instructions_quiz_feedback
  ],
  conditional_function: () => {
    var first_checkpoint = jsPsych.data.get().last(3).values()[0].correct;
    var second_checkpoint = jsPsych.data.get().last(2).values()[0].correct;
    var all_correct = first_checkpoint && second_checkpoint;
    return !all_correct;
  }
}

var instructions_sequence = {
  timeline: [instructions, post_instructions_quiz_first, post_instructions_quiz, instructions_quiz_feedback, instruction_repeat]
}
