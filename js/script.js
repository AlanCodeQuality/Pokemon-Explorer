function goToSecondaryScreen() {
    window.location.href = 'secondary-screen.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('click', goToSecondaryScreen);
    }
});

