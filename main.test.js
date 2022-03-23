const { addString, processString } = require("./main.js");

test("processString basics", () => {
  expect(processString("1,2,3,4")).toBe("1,2,3,4");

  expect(processString("1\n,2,3")).toBe("1,2,3");
});

test("processString delimeters", () => {
  expect(processString("//;\n1;3;4")).toBe("1,3,4");

  expect(processString("//;,$,@\n1;3;4")).toBe("1,3,4");

  expect(processString("//;,$,@\n1$3@4;5")).toBe("1,3,4,5");
});

test("addString basics", () => {
  expect(addString("")).toBe(0);

  expect(addString("1,2,3,4")).toBe(10);

  expect(addString("//;\n1;3;4")).toBe(8);

  expect(addString("//;,$,@\n1;3;4")).toBe(8);

  expect(addString("//;,$,@\n1$3@4;5")).toBe(13);
});

test("addString negative", () => {
  expect(() => {
    addString("1,-2,3,-4");
  }).toThrow("Negatives not allowed; -2,-4");

  expect(() => {
    addString("1,2,3,-4");
  }).toThrow("Negatives not allowed; -4");
});

test("addString bad input", () => {
  expect(() => {
    addString("hey there,2,3,-4");
  }).toThrow("Bad input hey there");
});
