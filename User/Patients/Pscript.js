// User Dashboard

document.addEventListener("DOMContentLoaded", function(){
    var signOutButton = document.getElementById("signOut");

    signOutButton.addEventListener("click", function(){
        window.location.href = "../../index.html";
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

document.getElementById("BTDB").addEventListener("click", function(event){
  event.preventDefault();

  var href = this.getAttribute("href");

  window.location.href = href;
})

// End of Patient's Dashboard

//New Patient Popup
document.getElementById("newPatientButton").addEventListener("click", function() {
    patientForm.reset();
    document.getElementById("pformHeader").textContent = "New Patient Form";
    document.getElementById("popupForm").style.display = "block";
});
document.addEventListener("DOMContentLoaded", function() {
    // Get the exit button
    var exitButton = document.getElementById("exitButton");

    // Get the popup form
    var popupForm = document.getElementById("popupForm");

    // Add click event listener to the exit button
    exitButton.addEventListener("click", function() {
        // Hide the popup form
        popupForm.style.display = "none";
    });
});

document.addEventListener("DOMContentLoaded", function() {
    loadPatients();

  document.getElementById("searchButton").addEventListener("click", function() {
      searchPatients();
  });

  document.getElementById("searchInput").addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
          searchPatients();
      }
  });
  
    // Get the form and add a submit event listener
    var patientForm = document.getElementById("patientForm");
    patientForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

      //Error Message if not filled out correctly
      var inputs = patientForm.querySelectorAll("input[type='text'], input[type='date'], textarea");
      var isEmpty = Array.from(inputs).some(function(input) {
          return input.value.trim() === '';
      });

      if (isEmpty) {
          alert("Please fill out all fields before submitting.");
          return;
      }

        // Get form inputs
        var fullName = document.getElementById("fullName").value;
        var dob = document.getElementById("dob").value;
        var bloodGroup = document.getElementById("bloodGroup").value;
        var rhFactor = document.getElementById("rhFactor").value;
        var maritalStatus = document.getElementById("maritalStatus").value;
        var ageFormat = document.getElementById("ageFormat").value;
        var phoneResidence = document.getElementById("phoneResidence").value;
        var mobilePhone = document.getElementById("mobilePhone").value;
        var email = document.getElementById("email").value;
        var emergencyContactName = document.getElementById("emergencyContactName").value;
        var emergencyContactPhone = document.getElementById("emergencyContactPhone").value;
        var currentIllnesses = document.getElementById("currentIllnesses").value;
        var previousIllnesses = document.getElementById("previousIllnesses").value;
        var specificAllergies = document.getElementById("specificAllergies").value;
        var currentMedications = document.getElementById("currentMedications").value;
        var pastMedications = document.getElementById("pastMedications").value;
        var labReports = document.getElementById("labReports").value;
        var radiologyVideos = document.getElementById("radiologyVideos").value;

        // Create patient object
        var patient = {
            fullName: fullName,
            dob: dob,
            bloodGroup: bloodGroup,
            rhFactor: rhFactor,
            maritalStatus: maritalStatus,
            ageFormat: ageFormat,
            phoneResidence: phoneResidence,
            mobilePhone: mobilePhone,
            email: email,
            emergencyContactName: emergencyContactName,
            emergencyContactPhone: emergencyContactPhone,
            currentIllnesses: currentIllnesses,
            previousIllnesses: previousIllnesses,
            specificAllergies: specificAllergies,
            currentMedications: currentMedications,
            pastMedications: pastMedications,
            labReports: labReports,
            radiologyVideos: radiologyVideos,
            staffNotes: "",
            patientPhoto: "",
        };

        // Save patient to local storage
        updatePatientDetails(patient)

        // Hide the form
        document.getElementById("popupForm").style.display = "none";

        // Reset form
        patientForm.reset();
    });
});

// Function to load patinets from localStroage
function loadPatients(){
  var patients = JSON.parse(localStorage.getItem("patients")) || [];
  patients.forEach(function(patient){
    updatePatientDetails(patient)
  })
}

// Function to save patient to local storage or update if already exists
function saveOrUpdatePatient(patient) {
    var patients = JSON.parse(localStorage.getItem("patients")) || [];
    var existingPatientIndex = patients.findIndex(function(p) {
        return p.fullName === patient.fullName;
    });
    if (existingPatientIndex !== -1) {
        // Update existing patient
        patients[existingPatientIndex] = patient;
    } else {
        // Add new patient
        patients.push(patient);
    }
    localStorage.setItem("patients", JSON.stringify(patients));
}

// Function to add patient to the patient list
function addOrUpdatePatientToList(patient) {
    var patientList = document.querySelector("#patientList ul");
    var existingPatientItem = patientList.querySelector(`li[data-fullname="${patient.fullName}"]`);

    if (existingPatientItem) {
        // Update existing patient item
        existingPatientItem.querySelector(".patient-photo img").src = patient.patientPhoto || 'placeholder.jpg';
        existingPatientItem.querySelector(".patient-info p:nth-of-type(1)").textContent = `Full Name: ${patient.fullName}`;
        existingPatientItem.querySelector(".patient-info p:nth-of-type(2)").textContent = `Date of Birth: ${patient.dob}`;
    } else {
        // Create new patient item
        var listItem = document.createElement("li");
        listItem.setAttribute("data-fullname", patient.fullName);
        listItem.innerHTML = `
            <div class="patient-photo">
              <label for="photoUpload">
                  <img src="${patient.patientPhoto || 'placeholder.jpg'}" alt="Patient Image" title="Click to Change/Upload Photo">
              </label>
              <input type="file" id="photoUpload" accept="image/*" style="display: none;"> <!-- Hidden input -->
            </div>
            <div class="patient-info">
                <p><strong>Full Name:</strong> ${patient.fullName}</p>
                <p><strong>Date of Birth:</strong> ${patient.dob}</p>
                <p><strong>Allergies:</strong> ${patient.specificAllergies}</p>
                <button class="deleteButton">Delete</button>
                <button class="editButton">EMR</button>
                <button class="notesButton">Staff Notes</button>
            </div>
        `;
        patientList.appendChild(listItem);
      
        // Add event listeners to new patient item buttons
        var deleteButton = listItem.querySelector(".deleteButton");
        deleteButton.addEventListener("click", function() {
            deletePatient(listItem);
        });

        var editButton = listItem.querySelector(".editButton");
        editButton.addEventListener("click", function() {
            displayPatientDetails(patient);
        });

        var notesButton = listItem.querySelector(".notesButton");
        notesButton.addEventListener("click", function() {
            displayStaffNotes(patient);
        });

        // Photo Upload within HTML portion
        var photoUploadInput = listItem.querySelector("#photoUpload");
        photoUploadInput.addEventListener("change", function() {
            savePatientPhoto(patient.fullName); // Pass the fullName when saving the photo
        });
    }
}

// Update patient details in local storage and patient list
function updatePatientDetails(patient) {
    saveOrUpdatePatient(patient);
    addOrUpdatePatientToList(patient);
}

function displayPatientDetails(patient) {
    // Fill the form with patient's information
    document.getElementById("fullName").value = patient.fullName;
    document.getElementById("dob").value = patient.dob;
    document.getElementById("bloodGroup").value = patient.bloodGroup;
    document.getElementById("rhFactor").value = patient.rhFactor;
    document.getElementById("maritalStatus").value = patient.maritalStatus;
    document.getElementById("ageFormat").value = patient.ageFormat;
    document.getElementById("phoneResidence").value = patient.phoneResidence;
    document.getElementById("mobilePhone").value = patient.mobilePhone;
    document.getElementById("email").value = patient.email;
    document.getElementById("emergencyContactName").value = patient.emergencyContactName;
    document.getElementById("emergencyContactPhone").value = patient.emergencyContactPhone;
    document.getElementById("currentIllnesses").value = patient.currentIllnesses;
    document.getElementById("previousIllnesses").value = patient.previousIllnesses;
    document.getElementById("specificAllergies").value = patient.specificAllergies;
    document.getElementById("currentMedications").value = patient.currentMedications;
    document.getElementById("pastMedications").value = patient.pastMedications;
    document.getElementById("labReports").value = patient.labReports;
    document.getElementById("radiologyVideos").value = patient.radiologyVideos;
    
    // Display the popup form
    document.getElementById("pformHeader").textContent = "Electronic Medical Record";
    document.getElementById("popupForm").style.display = "block";
  
}

document.addEventListener("DOMContentLoaded", function() {
    // Get the exit button for staff notes popup
    var staffNotesExitButton = document.getElementById("staffNotesExitButton");

    // Get the staff notes popup form
    var staffNotesPopup = document.getElementById("staffNotesPopup");

    // Add click event listener to the exit button for staff notes popup
    staffNotesExitButton.addEventListener("click", function() {
        // Hide the staff notes popup form
        staffNotesPopup.style.display = "none";
    });

    // Add event listener to the "Staff Notes" button in each patient item
    var notesButtons = document.querySelectorAll(".notesButton");
    notesButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            // Get the patient information associated with this button
            var listItem = button.closest("li");
            var fullName = listItem.querySelector("p:nth-of-type(1)").innerText.split(":")[1].trim();

            // Find the patient object
            var patients = JSON.parse(localStorage.getItem("patients")) || [];
            var patient = patients.find(function(p) {
                return p.fullName === fullName;
            });

            // Fill the staff notes popup form with the patient's staff notes
            document.getElementById("staffNotesInput").value = patient.staffNotes || "";

            // Display the staff notes popup form
            staffNotesPopup.style.display = "block";
        });
    });

    // Get the save button for staff notes popup form
    var staffNotesSaveButton = document.getElementById("staffNotesSaveButton");

    // Add click event listener to the save button
    staffNotesSaveButton.addEventListener("click", function() {
       saveStaffNotes(); // Call the saveStaffNotes function when the button is clicked
    });
});

// Function to delete patient
function deletePatient(patientItem) {
    var patientList = document.querySelector("#patientList ul");
    patientList.removeChild(patientItem);

    // Remove patient from local storage
    var fullName = patientItem.querySelector(".patient-info p:first-child").textContent.split(":")[1].trim();
    removePatientFromStorage(fullName);
}

// Function to remove patient from local storage
function removePatientFromStorage(fullName) {
    var patients = JSON.parse(localStorage.getItem("patients")) || [];
    var updatedPatients = patients.filter(function(patient) {
        return patient.fullName !== fullName;
    });
    localStorage.setItem("patients", JSON.stringify(updatedPatients));
}

function searchPatients() {
    var searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();
    var patientList = document.querySelector("#patientList ul");
    var patients = patientList.querySelectorAll("li");

    patients.forEach(function(patient) {
        var fullName = patient.querySelector(".patient-info p:first-child").textContent.split(":")[1].trim().toLowerCase();
        if (fullName.includes(searchTerm)) {
            // Display the patient's form if the search matches the patient's name
            var patientData = JSON.parse(localStorage.getItem("patients"));
            var matchedPatient = patientData.find(function(p) {
                return p.fullName.toLowerCase() === fullName;
            });
            displayPatientDetails(matchedPatient);
        }
    });
}

// Function to display staff notes
function displayStaffNotes(patient) {
    // Fill the form with patient's information
    document.getElementById("fullName").value = patient.fullName;
    document.getElementById("dob").value = patient.dob;

    // Fill the staff notes popup form with existing staff notes or an empty string
    var existingStaffNotes = patient.staffNotes || ""; // If staffNotes exist, use them; otherwise, use an empty string

    // Create a textarea element for staff notes
    var staffNotesElement = document.createElement("textarea");
    staffNotesElement.id = "staffNotes";
    staffNotesElement.rows = 4; // Set the number of rows as needed
    staffNotesElement.cols = 50; // Set the number of columns as needed
    staffNotesElement.value = existingStaffNotes; // Fill textarea with existing staff notes or an empty string
}

// Function to save staff notes
function saveStaffNotes() {
    var fullName = document.getElementById("fullName").value;
    var staffNotes = document.getElementById("staffNotesInput").value; // Use correct ID here

    var patients = JSON.parse(localStorage.getItem("patients")) || [];
    var patientToUpdate = patients.find(function(patient) {
        return patient.fullName === fullName;
    });

    // Update staff notes for the patient
    if (patientToUpdate) {
        patientToUpdate.staffNotes = staffNotes;
        localStorage.setItem("patients", JSON.stringify(patients));
    }

    // Hide the form
    document.getElementById("staffNotesPopup").style.display = "none"; // Ensure correct ID is used
}

function getBase64Image(img){
  var canvas = document.createElement("canvas");
  canvas.width = 225;
  canvas.height = 225;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  var dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/,"");
}

function savePatientPhoto(fullName) {
    var photoInput = document.getElementById("photoUpload");
    var imgFile = photoInput.files[0]; // Get the first selected file
    if (imgFile) {
        var reader = new FileReader();
        reader.readAsDataURL(imgFile);
        reader.onload = function () {
            var imgData = reader.result; // Base64 representation of the image
            var patients = JSON.parse(localStorage.getItem("patients")) || [];
            var patientToUpdateIndex = patients.findIndex(function (patient) {
                return patient.fullName === fullName;
            });
            if (patientToUpdateIndex !== -1) {
                // Update patient photo
                patients[patientToUpdateIndex].patientPhoto = imgData;
                localStorage.setItem("patients", JSON.stringify(patients));
                // Update patient photo in the patient list
                addOrUpdatePatientToList(patients[patientToUpdateIndex]);
            } else {
                console.log("Patient not found in local storage.");
            }
        };
    } else {
        console.log("No image selected.");
    }
}






