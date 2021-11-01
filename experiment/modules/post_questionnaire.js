// POST QUESTIONNAIRE


/* to be completed:
  
  way to generate the data that Prolific needs for this extra pay:
    list of: 'participant ID',0.30 --> this format

*/


var payout_feedback = {
  type: 'html-button-response',
  stimulus: () => {
    return `You started with $2.50 of base pay.<br><br>
            You made `+money_stringify.format(bonus_pay)+` in bonus pay,
            for a total of <b>`+money_stringify.format(bonus_pay + 2.5)+`</b>.`},
  choices: ['Continue.'],
  margin_vertical: '16px'
}

var post_q1 = {
  type: 'survey-text',
  questions: [
      {
          prompt: 'About what percentage of beehives do you think contained dangerous bees?', // allows for letters -- check this out
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
          prompt: 'Did you use pen and paper, or any other materials, to help you remember features of the bees?',
          options: ["Yes","No"],
          name: 'pen-and-paper',
          required: true,
      },
  ],
};

var post_questionnaire = {
  on_start: () => {
    var trialInfo = document.getElementById('trial-info');
    trialInfo.style.display = 'none';
  },
  timeline: [payout_feedback, post_q1, post_q2, post_q3]
}
