// WELCOME SCREEN
var welcome_screen = {
  type: 'html-keyboard-response',
  stimulus: 'Welcome! Press any key to begin.'
}


var mid_point_screen = {
  type: 'html-keyboard-response',
  stimulus: 'You have completed the training segment of this experiment.<br><br>You will now begin the test phase -- this time, a shorter trial in which you will receive no feedback.br><br>Press any key to begin.',
  on_start: () => {
    var bonusTracker = document.getElementById('bonus-tracker');
    bonusTracker.style.display = 'none';

    var trialInfo = document.getElementById('trial-info');
    trialInfo.style.visibility = 'hidden';
  },
  on_finish: () => {
    var trialInfo = document.getElementById('trial-info');
    trialInfo.style.visibility = 'visible';
    trialCount = 1;
    trialTotal = 32;
  }
}
