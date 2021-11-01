// ACTUAL TRIAL

/*
  Takes as input a JS Object, with 'X' as a placeholder for irrelevant dimensions.
  e.g.
  {
    antennae: 'B',
    wings: 'X',
    pattern: 'X',
    legs: 'F'
  }

  Returns an array of 16 bee objects. Bees are:
    -> Each represented in the set of 16
    -> Balanced such that there are exactly 2 evil bees in each set of 8
    -> Coded as "good" or "evil", under the "alignment" attribute
*/
function bee_16set_builder(bee_group_object) {
  // move relevant info into rel_info array, as an array of objects
  var rel_info = [];
  for (const [dim, val] of Object.entries(bee_group_object)) {
    if (val != 'X') { // if relevant,
      var new_obj = {};
      new_obj['dimension'] = dim;
      new_obj['value'] = val;
      rel_info.push(new_obj);
    }
  }

  // shuffle bees, filter good and bad, tag bees accordingly
  var shuffled_bees = jsPsych.randomization.repeat(BEES, 1);
  var bad_bees = shuffled_bees.filter(bee => bee[rel_info[0].dimension] == rel_info[0].value && bee[rel_info[1].dimension] == rel_info[1].value);
  var good_bees = shuffled_bees.filter(bee => !(bee[rel_info[0].dimension] == rel_info[0].value && bee[rel_info[1].dimension] == rel_info[1].value));
  bad_bees.forEach(bee => bee['friendly'] = false);
  good_bees.forEach(bee => bee['friendly'] = true);

  var first_eight = [].concat(bad_bees.splice(0,2),(good_bees.splice(0,6)));
  var second_eight = [].concat(bad_bees.splice(0,2), good_bees.splice(0,6));
  // console.log(first_eight);
  var first_eight_randomized = jsPsych.randomization.repeat(first_eight,1);
  var second_eight_randomized = jsPsych.randomization.repeat(second_eight,1);
  var full_list = [].concat(first_eight_randomized, second_eight_randomized);
  // console.log(full_list);
  return full_list
}

function bee_32set_builder(bee_group_object){
  var first_16 = bee_16set_builder(bee_group_object);
  var second_16 = bee_16set_builder(bee_group_object);
  return first_16.concat(second_16);
}

function bee_64set_builder(bee_group_object){
  var first_32 = bee_32set_builder(bee_group_object);
  var second_32 = bee_32set_builder(bee_group_object);
  return first_32.concat(second_32);
}

function update_bonus_pay(friendliness, avoidance) {
  if(!avoidance){
    if(friendliness){
      bonus_pay += 0.02;
    } else {
      bonus_pay -= 0.10;
      if(bonus_pay < 0) {
        bonus_pay = 0;
      }
    }
  }
}

var money_stringify = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});


var trialCount = 1;
var trialTotal = 64;

var practice_trial;
var actual_trial;

function createBeeTrials(){
  practice_trial = {
    on_start: () => {
      var trialInfo = document.getElementById('trial-info');
      trialInfo.style.visibility = 'visible';
  
      var trialNumber = document.getElementById('trial-number');
      trialNumber.innerHTML = trialCount + '/' + trialTotal;
    },
    timeline:[
        {
          type: 'image-button-response',
          stimulus: jsPsych.timelineVariable('image'),
          choices: ['Harvest', 'Avoid'],
          prompt: "<p>Harvest or avoid?</p>",
          margin_horizontal: '16px',
          stimulus_width: 300,
          render_on_canvas: false
        },
  
        {
          type: 'html-button-response',
          stimulus: function() {
            var avoidance = jsPsych.data.getLastTrialData().select('response').values[0] == 1 ? true : false;
            var friendliness = jsPsych.timelineVariable('friendly', true);
  
            update_bonus_pay(friendliness, avoidance);
            var bonusValue = document.getElementById('bonus-value');
            bonusValue.innerHTML = money_stringify.format(bonus_pay);
  
            var goodchoice = (avoidance && !friendliness) || (!avoidance && friendliness);
            var response = '';
            var action = avoidance ? 'avoid' : 'harvest';
            var summary = goodchoice ? 'good-'+action : 'bad-'+action;
            jsPsych.data.get().addToLast({action: action});
            jsPsych.data.get().addToLast({summary: summary});
            if (avoidance) {
              // response += 'You avoided!<br>';
              if(condition_assignment == 'full-information'){
                response += friendliness ? `<span class="redText">Bad choice,</span> the bee was friendly.` : `<span class="greenText">Good choice!</span>  This bee would have stung you.`;
              }
              response += `<br>Your bonus pay is unchanged, and remains at ${money_stringify.format(bonus_pay)}.`
            } else {
              // response += 'You harvested.<br>';
              response += !friendliness ? `<span class="redText">Bad choice, the bee was angry.</span><br><b>You have been stung!</b>` : `<span class="greenText">Successful harvest!</span>`;
              response += !friendliness ? "<br>Your pay has been decreased by $0.10. " : "<br>Your pay has increased by $0.02. ";
              response += `Your bonus pay is now ${money_stringify.format(bonus_pay)}.`
            }
            return `
                    <p><b>Action: <em>${action}</em></b></p>
                    <p>This is the bee that you just saw.</p>
                    <img src="${jsPsych.timelineVariable('image', true)}" width="200">
                    <p>${response}</p>
            `},
          choices: ['Continue'],
          on_finish: () => {
            trialCount++;
          }
        }
     ],
    timeline_variables: bee_64set_builder(bee_info),
    randomize_order: false
  }
  
  // trialCount and trialTotals reset from the welcome screen file
  actual_trial = {
    timeline: [
        {
          on_start: () => {
            var trialNumber = document.getElementById('trial-number');
            trialNumber.innerHTML = trialCount + '/' + trialTotal;
          },
          type: 'image-button-response',
          stimulus: jsPsych.timelineVariable('image'),
          choices: ['Harvest', 'Avoid'],
          prompt: "<p>Harvest or avoid?</p>",
          margin_horizontal: '16px',
          stimulus_width: 300,
          on_finish: () => { // on finish, update trial count and bonus pay
            trialCount++;
            var avoidance = jsPsych.data.getLastTrialData().select('response').values[0] == 1 ? true : false;
            var friendliness = jsPsych.timelineVariable('friendly', true);
            // console.log('avoided?:'+avoidance);
            // console.log('friendly:'+friendliness);
            update_bonus_pay(friendliness, avoidance);
            // console.log(bonus_pay);
          }
        }
     ],
    timeline_variables: bee_32set_builder(bee_info),
    randomize_order: false
  }
  
  
  
}

