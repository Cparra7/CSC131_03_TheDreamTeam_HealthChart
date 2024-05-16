document.addEventListener("DOMContentLoaded", function() {
  // Retrieve patients from localStorage
  var patients = JSON.parse(localStorage.getItem("patients")) || [];
  var appointmentPatientSelection = document.getElementById("appointmentPatientSelection");

  // Clear previous options
  appointmentPatientSelection.innerHTML = '<option value="">Select a patient...</option>';

  // Populate the dropdown list with previous patients
  patients.forEach(function(patient) {
      var option = document.createElement("option");
      option.text = patient.fullName;
      option.value = JSON.stringify(patient); // Storing patient object as JSON string
      appointmentPatientSelection.add(option);
  });

  // Add event listener to handle menu items click
  document.querySelectorAll(".menu-item").forEach(function(item) {
      item.addEventListener("click", function(event) {
          event.preventDefault();
          var href = this.getAttribute("href");
          window.location.href = href;
      });
  });

  // Appointment scheduling functionality
  const appointmentForm = document.getElementById('appointmentForm');
  const appointmentDisplay = document.getElementById('appointmentDisplay');

  // Load appointments from localStorage when the page loads
  loadAppointments();

  // Add event listener to the form submission
  appointmentForm.addEventListener("submit", function(event) {
      event.preventDefault();
      scheduleAppointment();
  });

  // Function to save appointment data to storage
  function saveAppointmentData(appointment) {
      // Check if localStorage is supported
      if (typeof(Storage) !== "undefined") {
          // Retrieve existing appointment data or initialize an empty array
          var appointments = JSON.parse(localStorage.getItem("appointments")) || [];

          // Add new appointment data to the array
          appointments.push(appointment);

          // Save the updated array back to localStorage under "appointments" key
          localStorage.setItem("appointments", JSON.stringify(appointments));
      } else {
          console.log("Sorry, your browser does not support web storage...");
      }
  }

  // Function to load appointments from localStorage
  function loadAppointments() {
      // Check if localStorage is supported
      if (typeof(Storage) !== "undefined") {
          // Retrieve appointments from localStorage
          var appointments = JSON.parse(localStorage.getItem("appointments")) || [];

          // Display appointments
          appointments.forEach(function(appointment) {
              displayAppointment(appointment);
          });
      } else {
          console.log("Sorry, your browser does not support web storage...");
      }
  }
    
  // Function to display appointment on the appointment display section
    
  function displayAppointment(appointment) {
      const appointmentElement = document.createElement('div');
      appointmentElement.classList.add('appointment-box');

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

      // Create delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-appointment-button');
      deleteButton.addEventListener('click', function() {
          // Remove the appointment from the display and storage
          appointmentDisplay.removeChild(appointmentElement);
          removeAppointmentFromStorage(appointment); // Pass the appointment object to the removal function
      });
      appointmentElement.appendChild(deleteButton);

      appointmentDisplay.appendChild(appointmentElement);
  }

    // Function to remove appointment from local storage
    function removeAppointmentFromStorage(appointmentToDelete) {
        if (typeof(Storage) !== "undefined") {
            // Retrieve appointments from localStorage
            var appointments = JSON.parse(localStorage.getItem("appointments")) || [];

            // Find and remove the appointment from the array based on a unique identifier
            appointments = appointments.filter(function(appointment) {
                // Here, you can compare appointment properties to identify the specific appointment to delete
                return appointment.datetime !== appointmentToDelete.datetime;
            });

            // Save the updated appointments back to localStorage
            localStorage.setItem("appointments", JSON.stringify(appointments));
        } else {
            console.log("Sorry, your browser does not support web storage...");
        }
    }

  // Function to schedule an appointment
    // Function to reset the appointment form
    function resetAppointmentForm() {
        appointmentForm.reset(); // Reset the form
        appointmentPatientSelection.value = ''; // Reset the patient selection dropdown
        patientNameInput.value = ''; // Clear the patient name input field
    }

    // Function to schedule an appointment
    function scheduleAppointment() {
        const patientName = appointmentPatientSelection.value !== "" ? JSON.parse(appointmentPatientSelection.value).fullName : document.getElementById('patientName').value.trim();
        const appointmentDateTime = document.getElementById('appointmentDateTime').value;
        const appointmentReason = document.getElementById('appointmentReason').value;

        if (patientName === '' || appointmentDateTime === '' || appointmentReason === '') {
            alert('Please fill out all fields.');
            return;
        }

        const appointment = {
            name: patientName,
            datetime: appointmentDateTime,
            reason: appointmentReason
        };

        saveAppointmentData(appointment);
        displayAppointment(appointment);
        resetAppointmentForm(); // Reset the form after scheduling
    }


  // Event listener to autofill patient name
  appointmentPatientSelection.addEventListener('change', function() {
      const selectedPatient = JSON.parse(this.value);
      if (selectedPatient) {
          patientNameInput.value = selectedPatient.fullName;
      } else {
          // If the default option is selected or no patient is selected, clear the patient name field
          patientNameInput.value = '';
      }
  });
});

document.getElementById("Patients").addEventListener("click", function(event){
event.preventDefault();
var href = this.getAttribute("href");
window.location.href = href;
});

document.getElementById("Appointments").addEventListener("click", function(event){
event.preventDefault();
var href = this.getAttribute("href");
window.location.href = href;
});

document.getElementById("MedPersc").addEventListener("click", function(event){
event.preventDefault();
var href = this.getAttribute("href");
window.location.href = href;
});

document.getElementById("Settings").addEventListener("click", function(event){
event.preventDefault();
var href = this.getAttribute("href");
window.location.href = href;
});

document.getElementById("BTDB").addEventListener("click", function(event){
event.preventDefault();
var href = this.getAttribute("href");
window.location.href = href;
});

const appointmentForm = document.getElementById('appointmentForm');
const patientNameInput = document.getElementById('patientName');
const appointmentDateTimeInput = document.getElementById('appointmentDateTime');
const appointmentDisplay = document.getElementById('appointmentDisplay');
const appointmentPatientSelection = document.getElementById('appointmentPatientSelection');

const appointments = [];
