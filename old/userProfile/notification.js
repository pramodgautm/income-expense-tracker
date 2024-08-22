function showNotification(message, type) {
    const notificationArea = document.getElementById('notification-area');
    const notification = document.createElement('div');
    notification.classList.add('notification', `notification-${type}`);
    notification.innerText = message;

    // Append the notification to the notification area
    notificationArea.appendChild(notification);

    // Automatically remove the notification after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Example function to trigger notifications
function triggerNotifications() {
    showNotification('Profile updated successfully!', 'success');
    showNotification('Failed to save settings!', 'error');
    showNotification('New feature available!', 'info');
    showNotification('Password will expire soon!', 'warning');
}

// Example event listeners to demonstrate notifications
document.getElementById('profile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Simulate profile update
    const username = document.getElementById('inputUsername').value;
    const email = document.getElementById('inputEmail').value;

    document.getElementById('username').innerText = username;
    document.getElementById('email').innerText = email;

    document.getElementById('profile-form').classList.add('d-none');
    showNotification('Profile updated successfully!', 'success');
});

document.getElementById('settings-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Simulate settings save
    showNotification('Settings saved successfully!', 'success');
});

function editProfile() {
    document.getElementById('profile-form').classList.toggle('d-none');
}

// Trigger example notifications on page load
window.onload = function() {
    triggerNotifications();
};
