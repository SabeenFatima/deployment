const express = require("express");
const app = express();
const port = 3000;

// homepage
app.get("/", (req, res) => {
  res.send("Calculator API is running. Use /calculate?a=NUM1&b=NUM2&op=add|sub|mul|div");
});

// parse query parameters: ?a=5&b=2&op=add
app.get("/calculate", (req, res) => {
  const { a, b, op } = req.query;

  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (isNaN(numA) || isNaN(numB)) {
    return res.status(400).send("Invalid numbers");
  }

  let result;
  switch (op) {
    case "add":
      result = numA + numB;
      break;
    case "sub":
      result = numA - numB;
      break;
    case "mul":
      result = numA * numB;
      break;
    case "div":
      if (numB === 0) return res.status(400).send("Cannot divide by zero");
      result = numA / numB;
      break;
    default:
      return res.status(400).send("Invalid operation. Use add, sub, mul, or div");
  }

  res.send({ a: numA, b: numB, op, result });
});

app.listen(port, () => {
  console.log(`Calculator app running on port ${port}`);
});
