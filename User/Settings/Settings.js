document.addEventListener("DOMContentLoaded", function(){
    var signOutButton = document.getElementById("signOut");

    signOutButton.addEventListener("click", function(){
        window.location.href = "../../index.html";
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve form data from local storage if available
    var formData = JSON.parse(localStorage.getItem('formData')) || {};

    // Populate form fields with the retrieved data
    document.getElementById('name').value = formData.name || 'User';
    document.getElementById('email').value = formData.email || '';
    document.getElementById('phone').value = formData.phone || '';
    document.getElementById('address').value = formData.address || '';
    document.getElementById('dob').value = formData.dob || '';
    document.getElementById('gender').value = formData.gender || 'blank';
    document.getElementById('language').value = formData.language || 'blank';
    document.getElementById('timezone').value = formData.timezone || 'gmt-12';
    document.getElementById('emergency_contact_name').value = formData.emergency_contact_name || '';
    document.getElementById('emergency_contact_phone').value = formData.emergency_contact_phone || '';
    document.getElementById('blood_type').value = formData.blood_type || '';
    document.getElementById('allergies').value = formData.allergies || '';
    document.getElementById('medical_conditions').value = formData.medical_conditions || '';
    document.getElementById('occupation').value = formData.occupation || 'blank';

    // Add event listener to the form submission
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission

        // Collect form data
        var formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            dob: document.getElementById('dob').value,
            gender: document.getElementById('gender').value,
            language: document.getElementById('language').value,
            timezone: document.getElementById('timezone').value,
            emergency_contact_name: document.getElementById('emergency_contact_name').value,
            emergency_contact_phone: document.getElementById('emergency_contact_phone').value,
            blood_type: document.getElementById('blood_type').value,
            allergies: document.getElementById('allergies').value,
            medical_conditions: document.getElementById('medical_conditions').value,
            occupation: document.getElementById('occupation').value
        };

        // Store form data in local storage
        localStorage.setItem('formData', JSON.stringify(formData));

       
    alert("User profile was updated and saved.");
        // Reset form submission
        return false;
    });
});
// Add event listener to the sign-out button
document.querySelector('.sign-out-button').addEventListener('click', function() {
    // Display a confirmation prompt
    var confirmation = confirm("Are you sure you want to sign out?");

    // If user confirms, proceed with sign-out
    if (confirmation) {
        // Redirect to the main index.html page
        window.location.href = "../../index.html";

        // Prevent access back with the back button
        window.onbeforeunload = function() {
            
        };
    }
});
