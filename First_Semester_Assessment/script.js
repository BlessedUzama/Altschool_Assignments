let currentInput = "";
let previousInput = "";
let operator = "";

function handleNumber(value) {
  if (value === "." && currentInput.includes(".")) {
    return;
  }

  if (currentInput === "0" && value !== ".") {
    currentInput = value;
  } else {
    currentInput += value;
  }

  updateDisplay();
}

function handleOperator(op) {
  if (currentInput === "") return;

  // If there's already an operator, evaluate the expression first
    if (previousInput !== "" && operator !== "") {

      // This updates currentInput
        handleEqual();
        
      previousInput = currentInput.toString();
      currentInput = "";
    } else {
    previousInput = currentInput;
    currentInput = "";
  }

  
  switch (op) {
    case "X":
      operator = "*";
      break;
    case "÷":
      operator = "/";
      break;
    default:
      operator = op;
  }

  updateDisplay();
}
  

function handleEqual() {
  if (currentInput === "" || operator === "" || previousInput === "") {
    alert("Operation incomplete");
  }

  if (operator === "/" && currentInput === "0") {
    alert("Error!!!");
    return;
  }

  switch (operator) {
    case "+":
      currentInput = parseFloat(previousInput) + parseFloat(currentInput);
      break;
    case "-":
      currentInput = parseFloat(previousInput) - parseFloat(currentInput);
      break;
    case "*":
      currentInput = parseFloat(previousInput) * parseFloat(currentInput);
      break;
    case "/":
      currentInput = parseFloat(previousInput) / parseFloat(currentInput);
      break;
    case "%":
      currentInput = parseFloat(previousInput) % parseFloat(currentInput);
      break;
    default:
      alert("Error!!!!");
      break;
  }
  previousInput = "";
  operator = "";

  updateDisplay();
}

function handleClear() {
  currentInput = "0";
  previousInput = "";
  operator = "";
  updateDisplay();
}

function handleBackspace() {
  if (currentInput === "" || currentInput === "0") {
    return;
  } else if (currentInput !== "") {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === "") {
      currentInput = "0";
    }
  }
  updateDisplay();
}

function handleChainedOps() {
  if (previousInput !== "" && operator !== "") {
    handleEqual();
    previousInput = currentInput;
    currentInput = "";
  } else {
    previousInput = currentInput;
    currentInput = "";
  }
}

function updateDisplay() {
  const display = document.getElementById("display");

  if (currentInput === "") {
    currentInput = "0";
  }
  display.value = currentInput;
}

let buttons = document.querySelectorAll("button");

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {

    const value = btn.textContent.trim()

    // Handle backspace button via class
    if (btn.querySelector("img") !== null) {
      handleBackspace();
      return;
    }

    // Handle clear and equal early before operator check
    if (value === "C") {
      handleClear();
      return;
    }

    if (value === "=") {
      handleEqual();
      return;
    }

    // Number or decimal
    if (!isNaN(value) || value === ".") {
      handleNumber(value);
      return;
    }

    // Operators like +, -, X, ÷, %
    if (btn.classList.contains("operator")) {
      handleOperator(value);
      return;
    }
  });
});

document.addEventListener("keydown", (e) => {
  const key = e.key;

  // Numbers and decimal
  if (!isNaN(key) || key === ".") {
    handleNumber(key);
  }
  // Operators
  else if (["+", "-", "*", "/", "%"].includes(key)) {
    handleOperator(key === "*" ? "X" : key === "/" ? "÷" : key);
  }
  // Enter or =
  else if (key === "Enter" || key === "=") {
    e.preventDefault(); // Prevent form submission if inside a form
    handleEqual();
  }
  // Backspace
  else if (key === "Backspace") {
    handleBackspace();
  }
  // Escape for clear
  else if (key === "Escape" || key.toLowerCase() === "c") {
    handleClear();
  }
});
  