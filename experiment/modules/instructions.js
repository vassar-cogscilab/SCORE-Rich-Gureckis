var instructions_quiz_attempt_count = 0;

// INSTRUCTIONS
var instructions = {
  type: 'instructions',
    pages: [
        '<h1>Here are some instructions. </h1>They tell you what to do!',
        'Oh look, another page of instructions! <br>'+
        'This must be a complicated experiment.',
        'Wow, I hope this is the final page of instructions.'
    ],
    show_clickable_nav: true
}

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
      options: ['You do not learn if it was friendly or dangerous, and do not alter your bonus.',
                'You learn if it was friendly or dangerous, but do not alter your bonus.',
                'You learn if it was friendly or dangerous and alter your bonus_CORRECTFORNOW'],
      required: true,
      correct_response: 'You learn if it was friendly or dangerous and alter your bonus_CORRECTFORNOW',
      name: 'Q3'
    }
]

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
  }
}

var instructions_quiz_feedback = {
  type: 'html-button-response',
  stimulus: () => {
    all_correct = jsPsych.data.get().last(1).values()[0].correct;
    if(all_correct) {
      return `<p>Congrats, you got everything right<br>When you're ready, click the button below to continue to the experiment.</p>`
    } else if (instructions_quiz_attempt_count < 2) {
      return `<p>You did not answer all comprehension questions correctly.<br>Press <b>continue</b> to review the instructions again.</p>`
    } else {
      return `<p>At least one answer is incorrect. Your participation is no longer requested in this experiment.</p>`
    }
  },
  choices: ['Continue'],
  on_finish: () => {
    if (instructions_quiz_attempt_count >= 2 && !jsPsych.data.get().last(1).values()[0].correct){
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
  timeline: [instructions, post_instructions_quiz, instructions_quiz_feedback, instruction_repeat]
}
