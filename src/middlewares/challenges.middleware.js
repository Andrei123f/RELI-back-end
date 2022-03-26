function validateGetStats(req){

}

function validateEvaluateSolution(requestBody){
  let requiredFields = [
    "code",
    "chapter_code",
    "challenge_code",
    "bindings",
  ];

  for (i in requiredFields) {
    key = requiredFields[i];
    //first validate if all required fields are present
    if (!(key in requestBody)) {
      return {
        result: "ERROR",
        message: `Required field not present: ${key}.`,
      };
    }
    //now validate if they have values or not
    if (requestBody.key == "" || requestBody.key == {}) {
      return {
        result: "ERROR",
        message: `Required field cannot be empty: ${key}.`,
      };
    }
  }

  return true;
}

  module.exports = {
    validateGetStats,
    validateEvaluateSolution
  };
  