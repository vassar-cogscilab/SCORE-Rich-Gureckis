// ACTUAL TRIAL

var actual_trial = {
  timeline: [
    {
        type: 'image-button-response',
        stimulus: jsPsych.timelineVariable('bee'),
        choices: ['Harvest', 'Avoid'],
        prompt: "<p>Harvest or avoid?</p>",
        margin_horizontal: '16px'
    },
    // {
    //     type: 'html-keyboard-response',
    //     stimulus: '',
    //     choices: jsPsych.NO_KEYS,
    //     trial_duration: 250
    // },
  ],

  timeline_variables: [
    { bee: 'bees-with-color/bees-01-color.svg'},
    { bee: 'bees-with-color/bees-02-color.svg'},
    { bee: 'bees-with-color/bees-03-color.svg'},
    { bee: 'bees-with-color/bees-04-color.svg'},
  ],
  randomize_order: true
}

var node = {
  timeline: [actual_trial],
  repetitions: 2
}

timeline.push(node);
