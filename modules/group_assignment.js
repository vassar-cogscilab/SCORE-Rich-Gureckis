var dimensions = {
  'antennae': ['A', 'B'],  // Antennae or Bald
  'wings': ['1', '2'],     // Single or Double wings
  'pattern': ['S', 'D'],   // Striped or Dotted
  'legs': ['F', 'M']       // Few or Many legs
}

var condition_assignment = jsPsych.randomization.sampleWithoutReplacement(['contingent', 'full-information'], 1)[0];
var relevant_dimension_assignment = jsPsych.randomization.sampleWithoutReplacement(['antennae', 'wings', 'pattern', 'legs'], 2);

var assign_bee_group = (dimensions_arr) => {
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

jsPsych.data.addProperties({
    condition: condition_assignment,
    relevant_dimensions: relevant_dimension_assignment,
    bee_group: assign_bee_group(relevant_dimension_assignment)
});
