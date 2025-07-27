// user Food log
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


let water = parseInt(localStorage.getItem("water") || "0");
document.getElementById("waterCount").textContent = `${water} cups`;

function addWater() {
  water++;
  localStorage.setItem("water", water);
  document.getElementById("waterCount").textContent = `${water} cups`;
}

//step counter
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
function saveMood() {
  const mood = document.getElementById("moodSelect").value;
  if (mood !== "") {
    localStorage.setItem("mood", mood);
    document.getElementById("moodDisplay").textContent = `You felt: ${mood}`;
  }
}

// this is to Show saved mood on load
window.onload = function () {
    let tip = "💡 Tip: Stay consistent for better results.";
switch (savedMood) {
  case "😃 Happy":
    tip = "💡 You're in a great mood! Keep up the momentum by taking a walk.";
    break;
  case "😐 Okay":
    tip = "💡 Try some fresh fruit or a 5-minute meditation.";
    break;
  case "😔 Sad":
    tip = "💡 You're not alone. A warm meal or a short walk may help.";
    break;
  case "😠 Angry":
    tip = "💡 Deep breaths. Avoid screens and take a 5-minute break.";
    break;
  case "😴 Tired":
    tip = "💡 Try drinking a glass of water and stretching for 2 minutes.";
    break;
}
document.getElementById("dailyTip").textContent = tip;

loadGoals(); 

  displayFoods();
  const savedSteps = localStorage.getItem("steps");
  const savedMood = localStorage.getItem("mood");
  if (savedSteps) {
    document.getElementById("stepDisplay").textContent = `You walked ${savedSteps} steps today.`;
  }
  if (savedMood) {
    document.getElementById("moodDisplay").textContent = `You felt: ${savedMood}`;
  }
};
function resetAll() {
  localStorage.clear();
  location.reload();
}

function renderChart() {
  const foodCount = JSON.parse(localStorage.getItem("foods") || "[]").length;
  const waterCount = parseInt(localStorage.getItem("water") || "0");
  const stepCount = parseInt(localStorage.getItem("steps") || "0");
  const mood = localStorage.getItem("mood") || "None";

  const ctx = document.getElementById('summaryChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Food Entries', 'Water (cups)', 'Steps'],
      datasets: [{
        label: 'Today’s Health Data',
        data: [foodCount, waterCount, stepCount],
        backgroundColor: ['#3498db', '#2ecc71', '#f39c12'],
        borderRadius: 10
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `Mood: ${mood}`
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

window.onload = function () {
  displayFoods();

   const savedSteps = localStorage.getItem("steps") || 0;
  const savedMood = localStorage.getItem("mood") || "Not set";
  const savedWater = parseInt(localStorage.getItem("water") || "0");
  const savedFoods = JSON.parse(localStorage.getItem("foods") || "[]");

  if (savedWater >= 8) document.getElementById("goalWater").checked = true;
if (savedSteps >= 6000) document.getElementById("goalSteps").checked = true;
if (savedFoods.length >= 3) document.getElementById("goalFood").checked = true;

  document.getElementById("stepDisplay").textContent = `You walked ${savedSteps} steps today.`;
  document.getElementById("moodDisplay").textContent = `You felt: ${savedMood}`;

  //Update Dailsummary Report
  document.getElementById("summaryFood").textContent = `🍽️ Foods Logged: ${savedFoods.length}`;
  document.getElementById("summaryWater").textContent = `💧 Water Drank: ${savedWater} cups`;
  document.getElementById("summarySteps").textContent = `👟 Steps Taken: ${savedSteps}`;
  document.getElementById("summaryMood").textContent = `🙂 Mood: ${savedMood}`;
};
setTimeout(() => {
  alert("🕒 Don’t forget to log your health today!");
}, 180000); //shows after 3 minute

function loadGoals() {
  const goalsList = document.getElementById("goalsList");
  goalsList.innerHTML = "";

  const savedGoals = JSON.parse(localStorage.getItem("dailyGoals") || "[]");

  savedGoals.forEach((goal, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = goal.done;
    checkbox.onchange = () => {
      savedGoals[index].done = checkbox.checked;
      localStorage.setItem("dailyGoals", JSON.stringify(savedGoals));
    };

    const label = document.createElement("span");
    label.textContent = " " + goal.text;

    li.appendChild(checkbox);
    li.appendChild(label);
    goalsList.appendChild(li);
  });
}

function addGoal() {
  const input = document.getElementById("newGoalInput");
  const goalText = input.value.trim();
  if (goalText === "") return;

  const savedGoals = JSON.parse(localStorage.getItem("dailyGoals") || "[]");
  savedGoals.push({ text: goalText, done: false });
  localStorage.setItem("dailyGoals", JSON.stringify(savedGoals));
  input.value = "";
  loadGoals();
}