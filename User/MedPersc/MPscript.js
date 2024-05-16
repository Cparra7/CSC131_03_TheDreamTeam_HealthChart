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
})

document.getElementById("Settings").addEventListener("click", function(event){
  event.preventDefault();
  var href = this.getAttribute("href");
  window.location.href = href;
});

document.addEventListener("DOMContentLoaded", function() {
    // Get the pharmacy select element
    var selectBox = document.getElementById("pharmacy");
    // Get the other pharmacy text box
    var textBox = document.getElementById("otherPharmacy");

    // Add event listener to the pharmacy select element
    selectBox.addEventListener("change", function() {
        if (selectBox.value === "other") {
            textBox.style.display = "block";
        } else {
            textBox.style.display = "none";
        }
    });

    // Function to calculate age from Date of Birth
    function calculateAge(birthDate) {
        var today = new Date();
        var birthDate = new Date(birthDate);
        var age = today.getFullYear() - birthDate.getFullYear();
        var month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    var dobInput = document.getElementById("dob");
    var ageDisplay = document.getElementById("ageDisplay");

    // Add event listener to Date of Birth input
    dobInput.addEventListener("change", function() {
        var dob = dobInput.value;
        var age = calculateAge(dob);
        ageDisplay.textContent = "Age: " + age;
    });

    // Add event listener to the new prescription button
    // Add event listener to the new prescription button
    document.getElementById("newPrescriptionButton").addEventListener("click", function() {
        // Reset the form
        document.getElementById("patientForm").reset();
        // Display the popup form
    document.getElementById("popupForm").style.display = "block";

    var patientSelection = document.getElementById("patientSelection");

    // Retrieve patients from localStorage
    var patients = JSON.parse(localStorage.getItem("patients")) || [];

    // Clear previous options
    patientSelection.innerHTML = '<option value="">Select a patient...</option>';

    // Populate the dropdown list with previous patients
    patients.forEach(function(patient) {
        var option = document.createElement("option");
        option.text = patient.fullName;
        option.value = JSON.stringify(patient); // Storing patient object as JSON string
        patientSelection.add(option);
    });

        patientSelection.addEventListener("change", function() {
                var selectedPatient = JSON.parse(patientSelection.value);
                // Populate the form with selected patient's details
                document.getElementById("fullName").value = selectedPatient.fullName;
                document.getElementById("dob").value = selectedPatient.dob;
                document.getElementById("email").value = selectedPatient.email;
              //  document.getElementById("phone").value = selectedPatient.phone;
                document.getElementById("gender").value = selectedPatient.gender;
                // Optionally, you can trigger other fields to update based on selected patient
            });

            // Show or hide the patient selection based on user choice
            var newPatientCheckbox = document.getElementById("newPatientCheckbox");
            newPatientCheckbox.addEventListener("change", function() {
                if (newPatientCheckbox.checked) {
                    document.getElementById("patientSelection").style.display = "none";
                    document.getElementById("fullName").style.display = "block";
                    // Optionally, you can reset the dropdown selection
                    patientSelection.selectedIndex = 0;
                } else {
                    document.getElementById("patientSelection").style.display = "block";
                    document.getElementById("fullName").style.display = "none";
                    // Optionally, you can clear the entered patient name
                    document.getElementById("fullName").value = "";
                }
            });

        });


    // Get the exit button inside the popup form
    var exitButton = document.getElementById("exitButton");
    // Get the popup form
    var popupForm = document.getElementById("popupForm");

    // Add event listener to the exit button
    exitButton.addEventListener("click", function() {
        // Hide the popup form
        popupForm.style.display = "none";
    });

    // Get the form element
    var form = document.getElementById("patientForm");

    // Add event listener to the form submission
    form.addEventListener("submit", function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get form data
        var formData = {
            fullName: form.fullName.value,
            dob: form.dob.value,
            email: form.email.value,
            phone: form.phone.value,
            gender: form.gender.value,
            symptoms: form.symptoms.value,
            diagnosis: form.diagnosis.value,
            prescription: form.prescription.value,
            pharmacy: form.pharmacy.value,
            otherPharmacyText: form.otherPharmacyText.value,
            consent: form.consent.checked,
            sentDate: new Date().toLocaleString() // Include the current date and time
        };

        // Save form data to storage
        saveFormData(formData);

        // Add form data to prescription list
        addPrescriptionToList(formData);

        // Reset the form
        form.reset();

        // Hide the popup form
        document.getElementById("popupForm").style.display = "none";
    });

    // Load prescriptions from localStorage when the page loads
    loadPrescriptions();

    // Function to save form data to storage
    function saveFormData(formData) {
        // Check if localStorage is supported
        if (typeof(Storage) !== "undefined") {
            // Retrieve existing data or initialize an empty array
            var prescriptions = JSON.parse(localStorage.getItem("prescriptions")) || [];

            // Check if the patient already exists in the list
            var existingPatientIndex = prescriptions.findIndex(function(item) {
                return item.fullName === formData.fullName && item.dob === formData.dob;
            });

            if (existingPatientIndex !== -1) {
                // If the patient exists, update the data
                prescriptions[existingPatientIndex] = formData;
            } else {
                // If the patient doesn't exist, add new form data to the array
                prescriptions.push(formData);
            }

            // Save the updated array back to localStorage
            localStorage.setItem("prescriptions", JSON.stringify(prescriptions));
        } else {
            console.log("Sorry, your browser does not support web storage...");
        }
    }

    // Function to load prescriptions from localStorage
    function loadPrescriptions() {
        // Check if localStorage is supported
        if (typeof(Storage) !== "undefined") {
            // Retrieve prescriptions from localStorage
            var prescriptions = JSON.parse(localStorage.getItem("prescriptions")) || [];
            // Add each prescription to the list
            prescriptions.forEach(function(formData) {
                addPrescriptionToList(formData);
            });
        } else {
            console.log("Sorry, your browser does not support web storage...");
        }
    }

    // Function to add form data to prescription list
    function addPrescriptionToList(formData) {
        var patientList = document.getElementById("patientList");
        var listItem = document.createElement("li");
        listItem.innerHTML = `
            <div class="patient-info">
                <p><strong>Full Name:</strong> ${formData.fullName}</p>
                <p><strong>Date of Birth:</strong> ${formData.dob}</p>
                <p><strong>Sent Date:</strong> ${formData.sentDate}</p>
                <button class="popup-button details-button">Prescription Details</button>
                <button class="popup-button delete-button">Cancel Prescription Request</button>
            </div>
        `;
        patientList.querySelector("ul").appendChild(listItem);

        // Add event listener to handle prescription details button
        listItem.querySelector(".details-button").addEventListener("click", function() {
            populateForm(formData); // Populate the form with patient's details
            document.getElementById("popupForm").style.display = "block"; // Show the popup form
        });
    }

    // Function to populate the form with patient's details
    function populateForm(formData) {
        document.getElementById("fullName").value = formData.fullName;
        document.getElementById("dob").value = formData.dob;
        document.getElementById("email").value = formData.email;
        document.getElementById("phone").value = formData.phone;
        document.getElementById("gender").value = formData.gender;
        document.getElementById("symptoms").value = formData.symptoms;
        document.getElementById("diagnosis").value = formData.diagnosis;
        document.getElementById("prescription").value = formData.prescription;
        document.getElementById("pharmacy").value = formData.pharmacy;
        if (formData.pharmacy === "other") {
            document.getElementById("otherPharmacy").style.display = "block";
            document.getElementById("otherPharmacyText").value = formData.otherPharmacyText;
        } else {
            document.getElementById("otherPharmacy").style.display = "none";
        }
        document.getElementById("consent").checked = formData.consent;
    }


  
    // Add event listener to handle delete prescription request
    document.getElementById("patientList").addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-button")) {
            var confirmation = confirm("Are you sure you want to delete this prescription request?");
            if (confirmation) {
                var listItem = event.target.closest("li");
                var fullName = listItem.querySelector(".patient-info strong").nextSibling.textContent.trim(); // Get only the text content and trim any leading/trailing whitespace

                // Retrieve prescriptions from localStorage
                var prescriptions = JSON.parse(localStorage.getItem("prescriptions")) || [];

                // Filter out the prescription to delete
                prescriptions = prescriptions.filter(function(formData) {
                    return formData.fullName !== fullName;
                });

                // Save the updated prescriptions back to localStorage
                localStorage.setItem("prescriptions", JSON.stringify(prescriptions));

                // Remove the list item from the DOM
                listItem.remove();
            }
        }
    });

    // Search Functionality
    document.getElementById("searchButton").addEventListener("click", function() {
        searchPrescriptions();
    });

    document.getElementById("searchInput").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            searchPrescriptions();
        }
    });

    function searchPrescriptions() {
        var searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();
        var prescriptionList = document.getElementById("patientList").querySelectorAll("li");

        prescriptionList.forEach(function(prescription) {
            var fullName = prescription.querySelector(".patient-info p:first-child").textContent.split(":")[1].trim().toLowerCase();
            if (fullName.includes(searchTerm)) {
                // Display the prescription details if the search matches the patient's name
                var prescriptions = JSON.parse(localStorage.getItem("prescriptions"));
                var matchedPrescription = prescriptions.find(function(p) {
                    return p.fullName.toLowerCase() === fullName;
                });
                populateForm(matchedPrescription);
                document.getElementById("popupForm").style.display = "block";
            }
        });
    }
    
    
});
