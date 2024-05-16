
// User Dashboard

document.addEventListener("DOMContentLoaded", function(){
    var signOutButton = document.getElementById("signOut");

    signOutButton.addEventListener("click", function(){
        window.location.href = "../index.html";
    });
});

document.getElementById("Patients").addEventListener("click", function(event){
  event.preventDefault();

  var href = this.getAttribute("href");

  window.location.href = href;
})

document.getElementById("Appointments").addEventListener("click", function(event){
  event.preventDefault();

  var href = this.getAttribute("href");

  window.location.href = href;
})

document.getElementById("MedPersc").addEventListener("click", function(event){
  event.preventDefault();

  var href = this.getAttribute("href");

  window.location.href = href;
})

document.getElementById("Settings").addEventListener("click", function(event){
  event.preventDefault();

  var href = this.getAttribute("href");

  window.location.href = href;
})

// document.getElementById("Signout").addEventListener("click", function(event){
//   event.preventDefault();

//   var href = this.getAttribute("href");

//   window.location.href = href;
// })

//Patients on Dashboard 
function loadPatients(){
  var patients = JSON.parse(localStorage.getItem("patients")) || [];
  patients.forEach(function(patient){
    addPatientToList(patient);
   
  })
}

function addPatientToList(patient) {
    // Create list item
    
    var listItem = document.createElement("li");
    listItem.innerHTML = `
        <img src="${patient.patientPhoto || 'placeholder.jpg'}" alt="Patient Image" title="Click to Change/Upload Photo">
        <div class="patient-info">
            <p><strong>Full Name:</strong> ${patient.fullName}</p>
            <p><strong>Date of Birth:</strong> ${patient.dob}</p>
            <p><strong>Allergies:</strong> ${patient.specificAllergies}</p>
        </div>
    `;
  
    // Append to patient list
    var patientList = document.querySelector("#patient-list ul");
    patientList.appendChild(listItem);  
}

document.addEventListener("DOMContentLoaded", function() {
  loadPatients();
});

// Function to load appointments and populate the "Upcoming Appointments" section
function loadAppointments() {
  // Retrieve appointments from localStorage
  var appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  // Get the appointment list ul element
  var appointmentList = document.querySelector('#appointment-list ul');

  // Clear previous appointments in the list


  // Display each appointment
  appointments.forEach(function(appointment) {
    displayAppointment(appointment, appointmentList);
  });
}

// Function to display appointment on the "Upcoming Appointments" section
function displayAppointment(appointment, appointmentList) {
  const appointmentElement = document.createElement('li');
  appointmentElement.classList.add('upcoming-appointment');

  // Splitting date and time
  const dateTime = new Date(appointment.datetime);
  const date = dateTime.toLocaleDateString();
  const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Create elements to display appointment details
  const nameElement = document.createElement('p');
  nameElement.textContent = `Patient Name: ${appointment.name}`;
  appointmentElement.appendChild(nameElement);

  const dateElement = document.createElement('p');
  dateElement.textContent = `Date: ${date}`;
  appointmentElement.appendChild(dateElement);

  const timeElement = document.createElement('p');
  timeElement.textContent = `Time: ${time}`;
  appointmentElement.appendChild(timeElement);

  const reasonElement = document.createElement('p');
  reasonElement.textContent = `Reason: ${appointment.reason}`;
  appointmentElement.appendChild(reasonElement);

  // Append the appointment element to the "Upcoming Appointments" list
  appointmentList.appendChild(appointmentElement);
}

// Call the loadAppointments function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
  loadAppointments();
});


// Task List
// Get elements
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');

// Load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(addTaskToList);
}

// Add task function
function addTaskToList(taskText) {
  // Create the list item
  const li = document.createElement('li');
  li.classList.add('task-item'); // Add a class for styling

  // Create the task text span
  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;

  // Create the delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'X';
  deleteBtn.classList.add('delete-btn'); // Add a class for styling

  // Append the task text and delete button to the list item
  li.appendChild(taskSpan);
  li.appendChild(deleteBtn);

  // Insert new task after the add-task div
  const addTaskDiv = document.getElementById('add-task');
  addTaskDiv.parentNode.insertBefore(li, addTaskDiv.nextSibling);

  // Add event listener to delete button
  deleteBtn.addEventListener('click', function() {
      li.remove(); // Remove the task when delete button is clicked
      updateLocalStorage(); // Update local storage after removing task
      if (taskList.childElementCount === 1) {
        document.getElementById('no-tasks-message').style.display = 'block'; // Show message if there are no tasks
      }
  });


  // Hide the "No Tasks!" message when a task is added
  document.getElementById('no-tasks-message').style.display = 'none';
}

// Update local storage with current tasks
function updateLocalStorage() {
  const tasks = [];
  const taskItems = document.querySelectorAll('.task-item span');
  taskItems.forEach(function(taskItem) {
    tasks.push(taskItem.textContent);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for add task button
addTaskBtn.addEventListener('click', function() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTaskToList(taskText);
    updateLocalStorage(); // Update local storage after adding task
    taskInput.value = ''; // Clear the input field
  }
});

// Load tasks when DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
  loadTasks();
});

const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");
// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();
// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";
    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }
    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }
    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}
renderCalendar();
prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});