// Função para redirecionar para a segunda tela
function goToSecondaryScreen() {
    window.location.href = 'secondary-screen.html';
}

// Adiciona um evento de clique ao botão
document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('click', goToSecondaryScreen);
    }
});