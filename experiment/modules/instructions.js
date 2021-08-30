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
                  and you won't discover whether the bees there were friendly or dangerous.`; // contingent assignment
  } else {
    response += `If you choose to avoid a hive, you won't gain or lose any
                  money,<br>but you'll still find out whether the bees were friendly
                  or dangerous.`; // full-info assignment
  }
  return response;
}

function conditional_diagram() {
  var response = 'The diagram below summarizes the possibilities of each choice:<br>';
  if(condition_assignment == 'contingent') {
    response += '<img src="materials/instr_outcomes_standard.png"></img>'
  } else {
    response += '<img src="materials/instr_outcomes_fullinfo.png"></img>'
  }
  return response;
}


// INSTRUCTIONS
var instructions = {
  type: 'instructions',
    pages: [
      `In this experiment, you will play a simple video game in which you take the role of a beekeeper collecting honey.`,

      `Most of your beehives have friendly bees, which will allow you
      to collect honey.  Unfortunately, some of your colonies
      have been infiltrated by dangerous bees, which will sting
      you if you approach them.<br><br>
      Your job is to <strong>collect as much
      honey as possible from friendly bees</strong>, while learning
      to <strong>avoid dangerous bees</strong> so you aren't stung.`,

      `You will collect honey from <strong>64</strong> beehives, which contain several
      different bee varieties. At each hive, you will see one of the
      bees that live there and then need to choose whether to harvest
      honey from the hive or to avoid it.`,

      ` If you choose to harvest the hive, you'll be able to collect
      honey if the bee variety is friendly, but will be stung if the
      bee variety is dangerous. <strong>Collecting honey adds $0.02 to
      your bonus</strong> for the experiment, while <strong>being
      stung subtracts $0.10</strong> because you need expensive
      medicine to treat the sting.`,

      conditional_instructions(),

      `<strong>You begin with a bonus of $0.40</strong>.<br>There will be
      no changes in which bee varieties are friendly and which are
      dangerous over the course of the experiment.`,

      `Each hive is home to a single variety of bees, and these varieties have
      different features which can allow you to tell them apart and tell which will be dangerous.<br>
      The bee varieties differ in four ways.`,


      'They can have 2 or 6 legs.<br> <img src="materials/instrlegs.png"></img>',

      'They can have single or double wings.<br> <img src="materials/instrwings.png"></img>',

      'They can have stripes or dots on their bodies.<br> <img src="materials/instrstripes.png"></img>',

      'They can have antennae or no antennae.<br>  <img src="materials/instrantennae.png"></img>',

      `It's possible to learn to predict perfectly which bees are friendly and which are dangerous using these four features,
      so that you can harvest from bees that will give you honey while avoiding bees that would sting you.`,

      conditional_diagram(),

      `Ready to go?`,
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
    options: ['No.CORRECT', 'Yes.'],
    required: true,
    correct_response: 'No.CORRECT',
    name: 'Q1'
  },
  {
    prompt: 'How can you learn to tell whether a bee variety is dangerous?',
    options: ['Based on the color of the bee.', 'Based on the four features of the bee.CORRECT', 'Based on the order in which you see the bees.'],
    required: true,
    correct_response: 'Based on the four features of the bee.CORRECT',
    name: 'Q2'
  },
  {
    prompt: 'What happens when you avoid a bee variety?',
    options: ['CONT_You do not learn if it was friendly or dangerous, and do not alter your bonus.',
              'FULL_You learn if it was friendly or dangerous, but do not alter your bonus.',
              'You learn if it was friendly or dangerous and alter your bonus.'],
    required: true,
    correct_response: conditional_quiz(),
    name: 'Q3'
  }
]

function conditional_quiz() {
var question3 = '';
if (condition_assignment  == 'contingent') {
  question3 += 'CONT_You do not learn if it was friendly or dangerous, and do not alter your bonus.'; // contingent assignment
} else {
  question3 += 'FULL_You learn if it was friendly or dangerous, but do not alter your bonus.'; // full-info assignment
}
return question3;
}

var first_checkpoint = false;

var post_instructions_quiz_first = {
  type: 'survey-multi-select',
  questions: instructions_quiz_first,
  on_finish: (data) => {
    var correct1 = jsPsych.pluginAPI.compareKeys(data.response.Q0[0], instructions_quiz_first[0].correct_response[0]);
    var correct2 = jsPsych.pluginAPI.compareKeys(data.response.Q0[1], instructions_quiz_first[0].correct_response[1]);
    var correct3 = jsPsych.pluginAPI.compareKeys(data.response.Q0[2], instructions_quiz_first[0].correct_response[2]);
    var correct4 = jsPsych.pluginAPI.compareKeys(data.response.Q0[3], instructions_quiz_first[0].correct_response[3]);
    data.correct = correct1 && correct2 && correct3 && correct4;
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
    var Q1_correct = jsPsych.pluginAPI.compareKeys(data.response.Q1, instructions_quiz_questions[0].correct_response);
    var Q2_correct = jsPsych.pluginAPI.compareKeys(data.response.Q2, instructions_quiz_questions[1].correct_response);
    var Q3_correct = jsPsych.pluginAPI.compareKeys(data.response.Q3, instructions_quiz_questions[2].correct_response);
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
  if (instructions_quiz_attempt_count >= 2 && !jsPsych.data.get().last(2).values()[0].correct){
    document.exitFullscreen();
    jsPsych.endExperiment();
  }
}
}


var instruction_repeat = {
  timeline: [
    instructions,
    post_instructions_quiz,
    instructions_quiz_feedback
  ],
  conditional_function: () => {
    all_correct = jsPsych.data.get().last(2).values()[0].correct;
    return !all_correct;
  }
}

var instructions_sequence = {
  timeline: [instructions, post_instructions_quiz_first, post_instructions_quiz, instructions_quiz_feedback, instruction_repeat]
}
