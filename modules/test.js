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
    { bee: 'bees-with-color/bee-A2SM.svg'},
    { bee: 'bees-with-color/bee-B2DM.svg'},
    { bee: 'bees-with-color/bee-A1SM.svg'},
    { bee: 'bees-with-color/bee-A1DM.svg'},
  ],
  randomize_order: true
}

var test = {
  timeline: [actual_trial],
  repetitions: 2
}
