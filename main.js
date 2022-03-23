const CONTROL = "//";
const IDEAL_DELIMETER = ",";

/*
 * Sanitizes a giving string to be comma separated numbers
 * Handlers delimeters of any length and standardizing them to commas
 */
function processString(s) {
  let delimeters = [];

  const newLineSplit = s.split("\n");

  if (s.substr(0, 2) == CONTROL) {
    delimeters = newLineSplit[0].substring(2).split(",");
    newLineSplit.shift();
  }

  let processedString = newLineSplit.join("");

  for (let i = 0; i < delimeters.length; i++) {
    processedString = processedString.replaceAll(
      delimeters[i],
      IDEAL_DELIMETER
    );
  }

  return processedString;
}

/*
 * Adds all numbers within a delimeter separated string
 */
function addString(s) {
  let answer = 0;
  let negatives = [];
  if (!s.length) return answer;
  const cleanStringNumbers = processString(s).split(IDEAL_DELIMETER);

  for (let i = 0; i < cleanStringNumbers.length; i++) {
    // Rough catch all for bad input
    if (isNaN(cleanStringNumbers[i]))
      throw new Error(`Bad input ${cleanStringNumbers[i]}`);
    const number = parseInt(cleanStringNumbers[i]);
    if (number < 0) {
      negatives.push(number);
    }
    answer += number;
  }

  if (negatives.length > 0) {
    throw new Error(`Negatives not allowed; ${negatives.toString()}`);
  }
  return answer;
}

module.exports = {
  addString,
  processString,
};
