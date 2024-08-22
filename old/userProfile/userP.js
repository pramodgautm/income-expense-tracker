function editProfile() {
    document.getElementById('profile-form').classList.toggle('d-none');
}

document.getElementById('profile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('inputUsername').value;
    const email = document.getElementById('inputEmail').value;

    document.getElementById('username').innerText = username;
    document.getElementById('email').innerText = email;

    document.getElementById('profile-form').classList.add('d-none');
});

document.getElementById('settings-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Handle settings save logic here
    alert('Settings saved!');
});
