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

var shuffled_bees = jsPsych.randomization.repeat(BEES, 1);

console.log('shuffled bees',shuffled_bees);

// function for specifying relevant dimensions

var rel_dim_1 = 'B'
var rel_dim_2 = 'F'

var bad_bees = shuffled_bees.filter(bee => bee.antennae == rel_dim_1 && bee.legs == rel_dim_2);
var good_bees = shuffled_bees.filter(bee => !(bee.antennae == rel_dim_1 && bee.legs == rel_dim_2));

console.log('bad bees',bad_bees);
console.log('good bees',good_bees);

var first_eight = [].concat(bad_bees.splice(0,2),(good_bees.splice(0,6)));
var second_eight = [].concat(bad_bees.splice(0,2), good_bees.splice(0,6));

// var first_eight = [].concat(bad_bees[0],good_bees[0,3]);
// var second_eight = [].concat(bad_bees[0], good_bees[0]);

// var first_eight = Array(bad_bees[0], good_bees[0,1,2,3]);
// var second_eight = Array(bad_bees[0,1,2,3], good_bees[0,1,2,3]);

console.log('first_eight',first_eight);
console.log('second_eight',second_eight);
console.log(bad_bees);
console.log(good_bees);

var first_eight_randomized = jsPsych.randomization.repeat(first_eight,1);
var second_eight_randomized = jsPsych.randomization.repeat(second_eight,1);

var full_list = [].concat(first_eight_randomized, second_eight_randomized);

console.log(full_list);

function bee_chooser() { 
  full_list.splice(0);  
}


// var node = {
//   timeline: [actual_trial],
//   repetitions: 2
// }

// timeline.push(node);
// var test = {
//   timeline: [actual_trial],
//   repetitions: 2
// }
