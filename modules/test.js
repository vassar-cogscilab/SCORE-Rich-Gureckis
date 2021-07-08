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

var rel_dim_1 = 'B'
var rel_dim_2 = 'F'

function bee_chooser(rel_dim_1,rel_dim_2) {
  var shuffled_bees = jsPsych.randomization.repeat(BEES, 1); //
  var bad_bees = shuffled_bees.filter(bee => bee.antennae == rel_dim_1 && bee.legs == rel_dim_2);
  var good_bees = shuffled_bees.filter(bee => !(bee.antennae == rel_dim_1 && bee.legs == rel_dim_2));
  var first_eight = [].concat(bad_bees.splice(0,2),(good_bees.splice(0,6)));
  var second_eight = [].concat(bad_bees.splice(0,2), good_bees.splice(0,6));
  var first_eight_randomized = jsPsych.randomization.repeat(first_eight,1);
  var second_eight_randomized = jsPsych.randomization.repeat(second_eight,1);
  var full_list = [].concat(first_eight_randomized, second_eight_randomized);
  return full_list
}

console.log(bee_chooser(rel_dim_1,rel_dim_2));
