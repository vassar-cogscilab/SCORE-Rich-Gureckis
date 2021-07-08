// ACTUAL TRIAL

var BEES = [
  {
    image: 'bees-with-color/bee-A1DF.svg',
    antennae: 'A',
    wings: '1',
    pattern: 'D',
    legs: 'F'
  },
  {
    image: 'bees-with-color/bee-A1DM.svg',
    antennae: 'A',
    wings: '1',
    pattern: 'D',
    legs: 'M'
  },
  {
    image: 'bees-with-color/bee-A1SF.svg',
    antennae: 'A',
    wings: '1',
    pattern: 'S',
    legs: 'F'
  },
  {
    image: 'bees-with-color/bee-A1SM.svg',
    antennae: 'A',
    wings: '1',
    pattern: 'S',
    legs: 'M'
  },
  {
    image: 'bees-with-color/bee-A2DF.svg',
    antennae: 'A',
    wings: '2',
    pattern: 'D',
    legs: 'F'
  },
  {
    image: 'bees-with-color/bee-A2DM.svg',
    antennae: 'A',
    wings: '2',
    pattern: 'D',
    legs: 'M'
  },
  {
    image: 'bees-with-color/bee-A2SF.svg',
    antennae: 'A',
    wings: '2',
    pattern: 'S',
    legs: 'F'
  },
  {
    image: 'bees-with-color/bee-A2SM.svg',
    antennae: 'A',
    wings: '2',
    pattern: 'S',
    legs: 'M'
  },
  {
    image: 'bees-with-color/bee-B1DF.svg',
    antennae: 'B',
    wings: '1',
    pattern: 'D',
    legs: 'F'
  },
  {
    image: 'bees-with-color/bee-B1DM.svg',
    antennae: 'B',
    wings: '1',
    pattern: 'D',
    legs: 'M'
  },
  {
    image: 'bees-with-color/bee-B1SF.svg',
    antennae: 'B',
    wings: '1',
    pattern: 'S',
    legs: 'F'
  },
  {
    image: 'bees-with-color/bee-B1SM.svg',
    antennae: 'B',
    wings: '1',
    pattern: 'S',
    legs: 'M'
  },
  {
    image: 'bees-with-color/bee-B2DF.svg',
    antennae: 'B',
    wings: '2',
    pattern: 'D',
    legs: 'F'
  },
  {
    image: 'bees-with-color/bee-B2DM.svg',
    antennae: 'B',
    wings: '2',
    pattern: 'D',
    legs: 'M'
  },
  {
    image: 'bees-with-color/bee-B2SF.svg',
    antennae: 'B',
    wings: '2',
    pattern: 'S',
    legs: 'F'
  },
  {
    image: 'bees-with-color/bee-B2SM.svg',
    antennae: 'B',
    wings: '2',
    pattern: 'S',
    legs: 'M'
  }
]

// function bee_img_name_extractor(array) {
//   const bee_img_names = [];
//   array.forEach(element => {
//     const {image, antennae, wings, pattern, legs} = element;
//     console.log(image)
//   };
//   return bee_img_names;
// };

// bee_img_name_extractor(BEES);


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
  var shuffled_bees = jsPsych.randomization.repeat(BEES, 1); //
  var bad_bees = shuffled_bees.filter(bee => bee[rel_info[0].dimension] == rel_info[0].value && bee[rel_info[1].dimension] == rel_info[1].value);
  var good_bees = shuffled_bees.filter(bee => !(bee[rel_info[0].dimension] == rel_info[0].value && bee[rel_info[1].dimension] == rel_info[1].value));
  bad_bees.forEach(bee => bee['alignment'] = 'evil');
  good_bees.forEach(bee => bee['alignment'] = 'good');

  var first_eight = [].concat(bad_bees.splice(0,2),(good_bees.splice(0,6)));
  var second_eight = [].concat(bad_bees.splice(0,2), good_bees.splice(0,6));
  var first_eight_randomized = jsPsych.randomization.repeat(first_eight,1);
  var second_eight_randomized = jsPsych.randomization.repeat(second_eight,1);
  var full_list = [].concat(first_eight_randomized, second_eight_randomized);
  console.log(full_list);
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


var actual_trial = {
  timeline: [
      {
          type: 'image-button-response',
          stimulus: jsPsych.timelineVariable('image'),
          choices: ['Harvest', 'Avoid'],
          prompt: "<p>Harvest or avoid?</p>",
          margin_horizontal: '16px'
      }
   ],
  timeline_variables: bee_32set_builder(sample_obj),
  randomize_order: false
}

var test = {
  timeline: [actual_trial],
  repetitions: 1
}

