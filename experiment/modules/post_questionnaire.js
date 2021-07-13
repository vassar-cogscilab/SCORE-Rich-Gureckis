// POST QUESTIONNAIRE


/* to be completed:

  payout calculator based on performance
  
  way to generate the data that Prolific needs for this extra pay:
    list of: 'participant ID',0.30 --> this format

*/


function payout_calculator(successful_harvests, painful_harvests) {
  var starting_bonus = 0.40;
  var added_bonus = (0.02 * successful_harvests);
  var subtracted_bonus = (-0.10 * painful_harvests);
  var total_bonus = starting_bonus + added_bonus + subtracted_bonus;
  return total_bonus
}

console.log(payout_calculator(4,1));


var payout_feedback = {
  type: 'html-button-response',
  stimulus: () => {
    var payout = 4;
    return 'You made $'+payout+'.'},
  choices: ['Continue.'],
  margin_vertical: '16px'
}

var post_q1 = {
  type: 'survey-text',
  questions: [
      {
          prompt: 'About what percentage of beehives do you think contained dangerous bees?',
          name: 'percent-dangerous-bees',
          placeholder: '(enter a value between 0 and 100)',
          required: true,
      }
  ],
};

var post_q2 = {
  type: 'survey-multi-select',
  questions: [
      {
          prompt: `<p>Which features do you think were useful for deciding whether a bee variety was friendly or dangerous?</p>`,
          options: ["Wings", "Antennae", "Stripes", "Legs"],
          name: 'feature-perception',
          required: true,
      },
  ],
  randomize_question_order: true
};

var post_q3 = {
  type: 'survey-multi-choice',
  questions: [
        {
          prompt: 'Did you use pen and paper?',
          options: ["Yes","No"],
          name: 'pen-and-paper',
          required: true,
      },
  ],
};

var post_questionnaire = {
  timeline: [payout_feedback, post_q1, post_q2, post_q3]
}
