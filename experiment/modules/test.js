// ACTUAL TRIAL

// generic test data
var rel_dim_1 = 'B'
var rel_dim_2 = 'F'
var sample_obj = {
  antennae: 'B',
  wings: 'X',
  pattern: 'X',
  legs: 'F'
}

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


function conditional_instructions() {
  var response = [];
  if (condition_assignment  == 'contingent') {
    response += `CONTIf you choose to avoid a hive, you won't gain or lose any money,<br>
                and you won't discover whether the bees there were friendly or dangerous.`; // contingent assignment
  } else {
    response += `FULLIf you choose to avoid a hive, you won't gain or lose any
                money,<br>but you'll still find out whether the bees were friendly
                or dangerous.`; // full-info assignment
  }
  return response;
}

var trialCount = 1;
var trialTotal = 64;

var full_info_practice_trial = {
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
      },

      {
        type: 'html-button-response',
        stimulus: function() {
          var avoidance = jsPsych.data.getLastTrialData().select('response').values[0] == 1 ? true : false;
          var friendliness = jsPsych.timelineVariable('friendly', true);
          var goodchoice = (avoidance && !friendliness) || (!avoidance && friendliness);
          var response = '';
          var action = avoidance ? 'avoid' : 'harvest';
          var summary = goodchoice ? 'good-'+action : 'bad-'+action;
          jsPsych.data.get().addToLast({action: action});
          jsPsych.data.get().addToLast({summary: summary});
          if (avoidance) {
            response += 'You avoided!<br>';
            response += friendliness ? "Bad choice, the bee was friendly." : "Good choice.";
          } else {
            response += 'You harvested!<br>';
            response += !friendliness ? "Bad choice, the bee was angry." : "Good choice.";
          }
          return `<img src="${jsPsych.timelineVariable('image', true)}" width="200">
                  <p>This is the bee that you just saw.<br>${response}</p>
          `},
        choices: ['Continue'],
        on_finish: () => {
          trialCount++;
        }
      }
   ],
  conditional_function: function() {
    if(condition_assignment == 'full-information'){
    return true;
    } else {
      return false;
    }
  },
  timeline_variables: bee_64set_builder(bee_info),
  randomize_order: false
}


var contingent_practice_trial = {
  on_start: () => {
    var trialInfo = document.getElementById('trial-info');
    trialInfo.style.visibility = 'visible';
  },
  timeline:[
      {
        type: 'image-button-response',
        stimulus: jsPsych.timelineVariable('image'),
        choices: ['Harvest', 'Avoid'],
        prompt: "<p>Harvest or avoid?</p>",
        margin_horizontal: '16px',
        stimulus_width: 300,
      },

      {
        type: 'html-button-response',
        stimulus: function() {
          var avoidance = jsPsych.data.getLastTrialData().select('response').values[0] == 1 ? true : false;
          var friendliness = jsPsych.timelineVariable('friendly', true);
          var goodchoice = (avoidance && !friendliness) || (!avoidance && friendliness);
          var response = '';
          var action = avoidance ? 'avoid' : 'harvest';
          var summary = goodchoice ? 'good-'+action : 'bad-'+action;
          jsPsych.data.get().addToLast({action: action});
          jsPsych.data.get().addToLast({summary: summary});
          if (avoidance) {
            response += 'You avoided!<br>';
            // response += friendliness ? "Bad choice, the bee was friendly." : "Good choice.";
          } else {
            response += 'You harvested!<br>';
            // response += !friendliness ? "Bad choice, the bee was angry." : "Good choice.";
          }
          return `<img src="${jsPsych.timelineVariable('image', true)}" width="200">
                  <p>This is the bee that you just saw.<br>${response}</p>
          `},
        choices: ['Continue']
      }
   ],
   conditional_function: function() {
    if(condition_assignment == 'contingent'){
    return true;
    } else {
      return false;
    }
  },
  timeline_variables: bee_64set_builder(bee_info),
  randomize_order: false
}

// trialCount and trialTotals reset from the welcome screen file
var actual_trial = {
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
        on_finish: () => {
          trialCount++;
        }
      }
   ],
  timeline_variables: bee_32set_builder(bee_info),
  randomize_order: false
}


