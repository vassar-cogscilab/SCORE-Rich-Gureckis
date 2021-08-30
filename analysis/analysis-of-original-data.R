library(dplyr)
library(readr)

# load in data from original experiment
all.data <- read_csv('data/original/data_exp1.csv')


# filter to data in the test phase and remove excluded subjects
test.data <- all.data %>%
  filter(test == TRUE) %>%
  filter(exclude == FALSE)

# add columns to indicate if the response is consistent with each 1D
# categorization strategy
test.data.with.scores <- test.data %>%
  mutate(correct_1D_a = response == dim2,
         correct_1D_b = response == dim3)

# calculate the 1D and 2D scores for each subject
summary.data <- test.data.with.scores %>%
  group_by(uniqueid, fullinfo) %>%
  summarize(score_1D_a = sum(correct_1D_a),
            score_1D_b = sum(correct_1D_b),
            score_2D = sum(correct)) %>%
  mutate(score_1D = if_else(score_1D_a > score_1D_b, score_1D_a, score_1D_b)) %>%
  mutate(score_1D_prop = score_1D / 32,
         score_2D_prop = score_2D / 32)

# run a t-test to see if 1D scores differ by information condition
t.test(score_1D_prop ~ fullinfo, data=summary.data, var.equal=TRUE)


