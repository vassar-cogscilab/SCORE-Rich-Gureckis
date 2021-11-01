/*
  This file is intended to take a number from [0, 47] and based on the value, assigns
  a condition assignment (contingent or full-info), a relevant dimensions array,
  and a javascript object that represents the bee group.
*/
// var cond_assignment_num = Math.floor(Math.random() * 48); // TEMPORARY random assigned variable in [0, 47]

var dimensions = {
  'antennae': ['A', 'B'],  // Antennae or Bald
  'wings': ['1', '2'],     // Single or Double wings
  'pattern': ['S', 'D'],   // Striped or Dotted
  'legs': ['F', 'M']       // Few or Many legs
}

var possible_alignments = ['A1XX', 'A2XX', 'B1XX', 'B2XX',
                           'AXSX', 'AXDX', 'BXSX', 'BXDX',
                           'AXXF', 'AXXM', 'BXXF', 'BXXM',
                           'X1SX', 'X1DX', 'X2SX', 'X2DX',
                           'X1XF', 'X1XM', 'X2XF', 'X2XM',
                           'XXSF', 'XXSM', 'XXDF', 'XXDM' ];

// var condition_assignment = jsPsych.randomization.sampleWithoutReplacement(['contingent', 'full-information'], 1)[0];
// var relevant_dimension_assignment = jsPsych.randomization.sampleWithoutReplacement(['antennae', 'wings', 'pattern', 'legs'], 2);

/*
  Helper function.

  Takes in one of the strings in the possible_alignments array. e.g. 'BXXF'

  Returns a JS Object, with 'X' as a placeholder for irrelevant dimensions.
  e.g.
  {
    antennae: 'B',
    wings: 'X',
    pattern: 'X',
    legs: 'F'
  }
*/
var string_to_info_object = (alignment_string) => {
  const letters = alignment_string.split("");
  return {
    'antennae': letters[0],
    'wings': letters[1],
    'pattern': letters[2],
    'legs': letters[3]
  };
}

/*
  Takes in an id integer.

  Returns a JS Object, with 'X' as a placeholder for irrelevant dimensions.
  e.g.
  {
    antennae: 'B',
    wings: 'X',
    pattern: 'X',
    legs: 'F'
  }
*/
var assign_bee_group = (id_num) => {
  return string_to_info_object(possible_alignments[id_num % 24]);
}


/*
  NO LONGER IN USE
  Takes in an array of length 2, e.g. ['antennae', 'legs']

  Returns a JS Object, with 'X' as a placeholder for irrelevant dimensions.
  e.g.
  {
    antennae: 'B',
    wings: 'X',
    pattern: 'X',
    legs: 'F'
  }
*/
var random_assign_bee_group = (dimensions_arr) => { // NO LONGER USED
  var ret_obj = {};
  for (const [dim, options] of Object.entries(dimensions)) {
    if (dimensions_arr.includes(dim)) {
      ret_obj[dim] = jsPsych.randomization.sampleWithoutReplacement(options, 1)[0];
    } else {
      ret_obj[dim] = 'X'
    }
  }
  return ret_obj;
}

/*
  Takes in an integer id.

  Returns an array containing the names of the relevant dimensions.
*/
var get_relevant_dimensions = (id_num) => {
  var ret_arr = [];
  var letters = possible_alignments[id_num % 24].split("");
  var dimension_names = ['antennae', 'wings', 'pattern', 'legs'];
  letters.forEach((letter, index) => {
    if(!(letter === 'X')) ret_arr.push(dimension_names[index])
  });
  return ret_arr;
}


var condition_assignment;
var relevant_dimension_assignment;
var bee_info;

var create_condition_assignment = (cond_assignment_num) => {
  condition_assignment = cond_assignment_num > 23 ? 'contingent' : 'full-information';
  relevant_dimension_assignment = get_relevant_dimensions(cond_assignment_num);
  bee_info = assign_bee_group(cond_assignment_num);

  jsPsych.data.addProperties({
      condition: condition_assignment,                           // contingent or full-information
      relevant_dimensions: relevant_dimension_assignment,        // array of length 2, containing 2 of ['antennae', 'wings', 'pattern', 'legs']
      bee_group: bee_info                                        // an object as specified above
  });
}

