function displayDayOfWeek() {
  const dayParagraph = document.getElementById("day");

  const now = new Date();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayIndex = now.getDay();
  const dayName = dayNames[dayIndex];

  dayParagraph.textContent = dayName;
}

function displayFormattedDate() {
  const dateParagraph = document.getElementById("date");
  const now = new Date();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[now.getMonth()];
  const day = now.getDate();
  const year = now.getFullYear();
  dateParagraph.textContent = `${month} ${day} ${year}`;
}

function updateBoard(button) {
  alert("Board Updated Successfully");
  const taskAssignedElement = document.getElementById("task-assigned");
  if (taskAssignedElement) {
    let currentAssigned = parseInt(taskAssignedElement.textContent);
    if (!isNaN(currentAssigned) && currentAssigned > 0) {
      taskAssignedElement.textContent = currentAssigned - 1;
    }
  }
  const taskScoreElement = document.getElementById("task-score");
  if (taskScoreElement) {
    let currentScore = parseInt(taskScoreElement.textContent);
    if (!isNaN(currentScore)) {
      taskScoreElement.textContent = currentScore + 1;
    }
  }
  const taskTitle =
    button.parentElement.parentElement.parentElement.querySelector(
      "p.text-lg.font-semibold"
    ).innerText;
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const timeString = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")} ${ampm}`;
  const newDiv = document.createElement("div");
  newDiv.textContent = `You have completed the task ${taskTitle} at ${timeString}`;
  newDiv.classList.add("p-5", "bg-slate-100", "rounded-lg", "mb-2");
  const activityLog = document.getElementById("activity-log");
  if (activityLog) {
    activityLog.prepend(newDiv);
  }
  button.disabled = true;
  button.classList.add("bg-gray-200", "text-gray-500");
  checkIfAllTasksCompleted();
}

function checkIfAllTasksCompleted() {
  const taskAssignedElement = document.getElementById("task-assigned");
  if (taskAssignedElement && parseInt(taskAssignedElement.textContent) === 0) {
    alert("Congratulations! You have completed the current task.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(
    ".grid.grid-cols-3.grid-rows-2.gap-5 button"
  );
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      updateBoard(this);
    });
  });
  const clearHistoryButton = document.getElementById("clear-history");
  if (clearHistoryButton) {
    clearHistoryButton.addEventListener("click", function () {
      const activityLog = document.getElementById("activity-log");
      if (activityLog) {
        activityLog.innerHTML = "";
      }
    });
  }
  displayDayOfWeek();
  displayFormattedDate();

  const themeButton = document.getElementById("theme-btn");

  const body = document.body;

  const themeColors = [
    "bg-blue-100",
    "bg-red-100",
    "bg-green-100",
    "bg-pink-100",
    "bg-violet-100",
    "bg-purple-100",
    "bg-orange-100",
    "bg-yellow-100",
  ];

  let currentColorIndex = 0;

  const initialBgClass = Array.from(body.classList).find((cls) =>
    cls.startsWith("bg-")
  );

  if (initialBgClass) {
    themeColors.unshift(initialBgClass);
  }

  if (themeButton) {
    themeButton.addEventListener("click", function () {
      body.classList.forEach((cls) => {
        if (cls.startsWith("bg-")) {
          body.classList.remove(cls);
        }
      });

      body.classList.add(themeColors[currentColorIndex]);

      currentColorIndex = (currentColorIndex + 1) % themeColors.length;
    });
  }
});
