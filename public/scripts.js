// Form submission functionality
function submitForm() {
    const state = document.getElementById('state').value;
    const district = document.getElementById('district').value;
    const locality = document.getElementById('locality').value;
    const studentName = document.getElementById('studentName').value;
    const className = document.getElementById('class').value;
    const school = document.getElementById('school').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const email = document.getElementById('email').value;

    const formData = {
        state,
        district,
        locality,
        studentName,
        class: className,
        school,
        mobileNumber,
        email
    };

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('searchForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was a problem with your submission.');
    });
}
