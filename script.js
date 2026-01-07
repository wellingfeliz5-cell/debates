function startGame() {
    const n1 = document.getElementById('name1').value || "VARONES";
    const n2 = document.getElementById('name2').value || "HEMBRAS";

    document.getElementById('display-name1').innerText = n1.toUpperCase();
    document.getElementById('display-name2').innerText = n2.toUpperCase();

    document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');

    renderDots('dots1', 1);
    renderDots('dots2', 2);
}

function renderDots(containerId, teamNum) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    for (let i = 0; i < 10; i++) {
        const d = document.createElement('div');
        d.className = 'dot';
        
        // Estilo para centrar el texto "x2"
        d.style.display = 'flex';
        d.style.justifyContent = 'center';
        d.style.alignItems = 'center';
        d.style.fontSize = '2rem';
        d.style.color = '#000';

        d.onclick = () => {
            // Lógica de rotación de 3 estados
            if (!d.classList.contains('green') && !d.classList.contains('red') && !d.dataset.double) {
                // Estado 1: Verde (1 punto)
                d.classList.add('green');
            } else if (d.classList.contains('green') && !d.dataset.double) {
                // Estado 2: Rojo (1 punto)
                d.classList.remove('green');
                d.classList.add('red');
            } else if (d.classList.contains('red')) {
                // Estado 3: Verde con X2 (2 puntos)
                d.classList.remove('red');
                d.classList.add('green');
                d.dataset.double = "true";
                d.innerText = "X2";
            } else {
                // Volver a Gris (Vacío)
                d.classList.remove('green');
                delete d.dataset.double;
                d.innerText = "";
            }
            updateScore(teamNum);
        };
        container.appendChild(d);
    }
}

function updateScore(teamNum) {
    const container = document.getElementById(`dots${teamNum}`);
    
    // Puntos normales (Verdes sin el marcador double)
    const greens = Array.from(container.querySelectorAll('.dot.green')).filter(d => !d.dataset.double).length;
    
    // Puntos rojos
    const reds = container.querySelectorAll('.dot.red').length;
    
    // Comodines X2 (Verdes con el marcador double)
    const doubles = Array.from(container.querySelectorAll('.dot.green')).filter(d => d.dataset.double).length;

    // Conteo final: Verdes simples + (Comodines * 2)
    document.getElementById(`green-count${teamNum}`).innerText = greens + (doubles * 2);
    document.getElementById(`red-count${teamNum}`).innerText = reds;
}