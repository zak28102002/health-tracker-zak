// Food log
function addFood() {
  const input = document.getElementById("foodInput");
  const food = input.value.trim();
  if (food !== "") {
    let foods = JSON.parse(localStorage.getItem("foods") || "[]");
    foods.push(food);
    localStorage.setItem("foods", JSON.stringify(foods));
    displayFoods();
    input.value = "";
  }
}

function displayFoods() {
  const foodList = document.getElementById("foodList");
  const foods = JSON.parse(localStorage.getItem("foods") || "[]");
  foodList.innerHTML = "";
  foods.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    foodList.appendChild(li);
  });
}

// Water tracker
let water = parseInt(localStorage.getItem("water") || "0");
document.getElementById("waterCount").textContent = `${water} cups`;

function addWater() {
  water++;
  localStorage.setItem("water", water);
  document.getElementById("waterCount").textContent = `${water} cups`;
}

// Step counter
function saveSteps() {
  const stepInput = document.getElementById("stepInput").value;
  localStorage.setItem("steps", stepInput);
  document.getElementById("stepDisplay").textContent = `You walked ${stepInput} steps today.`;
}

window.onload = function () {
  displayFoods();
  const savedSteps = localStorage.getItem("steps");
  if (savedSteps) {
    document.getElementById("stepDisplay").textContent = `You walked ${savedSteps} steps today.`;
  }
};
