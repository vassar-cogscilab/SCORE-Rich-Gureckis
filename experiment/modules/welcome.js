// WELCOME SCREEN
var welcome_screen = {
  type: 'html-keyboard-response',
  stimulus: 'Welcome! Press any key to begin.'
}


var mid_point_screen = {
  type: 'html-keyboard-response',
  stimulus: 'Surprise!!  More bees!',
  on_start: () => {
    var bonusTracker = document.getElementById('bonus-tracker');
    bonusTracker.style.display = 'none';

    var trialInfo = document.getElementById('trial-info');
    trialInfo.style.visibility = 'hidden';
  },
  on_finish: () => {
    var trialInfo = document.getElementById('trial-info');
    trialInfo.style.visibility = 'visible';
  },
}
