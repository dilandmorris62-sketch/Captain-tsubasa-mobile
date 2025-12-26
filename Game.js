cat > game.js << 'EOF'
// Captain Tsubasa 5vs5 - Lógica del Prototipo Web
document.addEventListener('DOMContentLoaded', function() {
    // Datos iniciales del juego
    const gameData = {
        teams: {
            nankatsu: [
                { id: 1, name: "Tsubasa Ozora", number: 10, energy: 100, hasBall: true },
                { id: 2, name: "Genzo Wakabayashi", number: 1, energy: 100, hasBall: false },
                { id: 3, name: "Taro Misaki", number: 11, energy: 100, hasBall: false },
                { id: 4, name: "Ryo Ishizaki", number: 2, energy: 100, hasBall: false },
                { id: 5, name: "Kojiro Hyuga", number: 9, energy: 100, hasBall: false }
            ],
            toho: [
                { id: 6, name: "Kojiro Hyuga", number: 9, energy: 100, hasBall: false },
                { id: 7, name: "Ken Wakashimazu", number: 1, energy: 100, hasBall: false },
                { id: 8, name: "Hikaru Matsuyama", number: 5, energy: 100, hasBall: false },
                { id: 9, name: "Jun Misugi", number: 6, energy: 100, hasBall: false },
                { id: 10, name: "Shun Nitta", number: 11, energy: 100, hasBall: false }
            ]
        },
        match: {
            scoreNankatsu: 0,
            scoreToho: 0,
            minute: 0,
            ballPosition: { x: 50, y: 50 },
            ballWith: "nankatsu", // "nankatsu" o "toho"
            playerWithBall: 0 // índice del jugador con balón
        },
        skills: {
            "Drive Shot": { user: "Tsubasa Ozora", power: 95, cost: 40 },
            "Tiger Shot": { user: "Kojiro Hyuga", power: 97, cost: 50 },
            "God Hand": { user: "Genzo Wakabayashi", power: 90, cost: 45 },
            "Falcon Shot": { user: "Hikaru Matsuyama", power: 85, cost: 35 }
        }
    };

    // Inicializar el juego
    initializeGame();

    // FUNCIONES PRINCIPALES
    function initializeGame() {
        loadTeams();
        startMatchInterval();
        console.log("✅ Juego inicializado correctamente");
        addLogEntry("Partido iniciado: Nankatsu SC vs Toho Academy");
    }

    function loadTeams() {
        // Cargar jugadores de Nankatsu
        const nankatsuList = document.getElementById('nankatsu-players');
        nankatsuList.innerHTML = '';
        
        gameData.teams.nankatsu.forEach(player => {
            const playerElement = document.createElement('div');
            playerElement.className = 'player-item';
            playerElement.innerHTML = `
                <div class="player-name">
                    ${player.hasBall ? '⚽ ' : ''}${player.name}
                </div>
                <div class="player-number">#${player.number}</div>
                <div class="player-energy">${player.energy}%</div>
            `;
            nankatsuList.appendChild(playerElement);
        });

        // Cargar jugadores de Toho
        const tohoList = document.getElementById('toho-players');
        tohoList.innerHTML = '';
        
        gameData.teams.toho.forEach(player => {
            const playerElement = document.createElement('div');
            playerElement.className = 'player-item';
            playerElement.innerHTML = `
                <div class="player-name">
                    ${player.hasBall ? '⚽ ' : ''}${player.name}
                </div>
                <div class="player-number">#${player.number}</div>
                <div class="player-energy">${player.energy}%</div>
            `;
            tohoList.appendChild(playerElement);
        });
    }

    // NAVEGACIÓN ENTRE PANTALLAS
    window.showScreen = function(screenId) {
        // Ocultar todas las pantallas
        const screens = ['main-menu', 'teams-screen', 'match-screen', 'skills-screen', 'stats-screen'];
        screens.forEach(screen => {
            const element = document.getElementById(screen);
            if (element) element.style.display = 'none';
        });

        // Mostrar la pantalla seleccionada
        const targetScreen = document.getElementById(screenId + '-screen');
        const mainMenu = document.getElementById('main-menu');
        
        if (targetScreen) {
            targetScreen.style.display = 'block';
            mainMenu.style.display = 'none';
        } else {
            mainMenu.style.display = 'block';
        }

        // Si es la pantalla de equipos, recargar datos
        if (screenId === 'teams') {
            loadTeams();
        }
    };

    // SIMULACIÓN DE PARTIDO
    function startMatchInterval() {
        setInterval(() => {
            if (document.getElementById('match-screen').style.display === 'block') {
                gameData.match.minute++;
                document.getElementById('match-minute').textContent = gameData.match.minute;
                
                // Mover la pelota aleatoriamente
                if (Math.random() > 0.7) {
                    moveBallRandomly();
                }
            }
        }, 3000); // Cada 3 segundos = 1 minuto de juego
    }

    function moveBallRandomly() {
        const ball = document.getElementById('ball');
        const newX = 20 + Math.random() * 60;
        const newY = 20 + Math.random() * 60;
        
        ball.style.left = `${newX}%`;
        ball.style.top = `${newY}%`;
        
        // Cambiar posesión aleatoriamente
        if (Math.random() > 0.8) {
            gameData.match.ballWith = gameData.match.ballWith === 'nankatsu' ? 'toho' : 'nankatsu';
            addLogEntry(`¡Cambio de posesión! Ahora ataca: ${gameData.match.ballWith === 'nankatsu' ? 'Nankatsu' : 'Toho'}`);
        }
    }

    // ACCIONES DEL PARTIDO
    window.matchAction = function(action) {
        const teamWithBall = gameData.match.ballWith;
        const isNankatsu = teamWithBall === 'nankatsu';
        
        switch(action) {
            case 'pass':
                addLogEntry(`${isNankatsu ? 'Nankatsu' : 'Toho'} realiza un pase preciso`);
                moveBallRandomly();
                break;
                
            case 'shoot':
                const shootSuccess = Math.random() > 0.5;
                if (shootSuccess) {
                    // GOL!
                    if (isNankatsu) {
                        gameData.match.scoreNankatsu++;
                        document.getElementById('score-nankatsu').textContent = gameData.match.scoreNankatsu;
                        addLogEntry('⚽⚽⚽ ¡GOOOL DE NANKATSU! ¡Increíble!');
                    } else {
                        gameData.match.scoreToho++;
                        document.getElementById('score-toho').textContent = gameData.match.scoreToho;
                        addLogEntry('⚽⚽⚽ ¡GOOOL DE TOHO! ¡Magnífico!');
                    }
                    
                    // Animación especial
                    const ball = document.getElementById('ball');
                    ball.style.transition = 'all 0.3s ease';
                    ball.style.transform = `translate(-50%, -50%) scale(1.5)`;
                    setTimeout(() => {
                        ball.style.transform = `translate(-50%, -50%) scale(1)`;
                    }, 300);
                    
                    // Resetear pelota al centro
                    setTimeout(() => {
                        ball.style.left = '50%';
                        ball.style.top = '50%';
                    }, 500);
                } else {
                    addLogEntry(`El disparo de ${isNankatsu ? 'Nankatsu' : 'Toho'} fue desviado`);
                }
                break;
                
            case 'skill':
                const skills = Object.keys(gameData.skills);
                const randomSkill = skills[Math.floor(Math.random() * skills.length)];
                useSkill(randomSkill);
                break;
                
            case 'simulate':
                simulateQuickMatch();
                break;
        }
    };

    // SIMULACIÓN RÁPIDA DE PARTIDO
    function simulateQuickMatch() {
        addLogEntry('--- SIMULACIÓN RÁPIDA ACTIVADA ---');
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const actions = ['pase', 'disparo', 'regate', 'centro'];
                const randomAction = actions[Math.floor(Math.random() * actions.length)];
                const randomTeam = Math.random() > 0.5 ? 'Nankatsu' : 'Toho';
                
                addLogEntry(`${randomTeam}: ${randomAction} peligroso...`);
                
                // Ocasionalmente un gol
                if (Math.random() > 0.7) {
                    if (randomTeam === 'Nankatsu') {
                        gameData.match.scoreNankatsu++;
                        document.getElementById('score-nankatsu').textContent = gameData.match.scoreNankatsu;
                        addLogEntry('⚽ ¡GOOOL!');
                    } else {
                        gameData.match.scoreToho++;
                        document.getElementById('score-toho').textContent = gameData.match.scoreToho;
                        addLogEntry('⚽ ¡GOOOL!');
                    }
                }
                
                gameData.match.minute += 5;
                document.getElementById('match-minute').textContent = gameData.match.minute;
            }, i * 800);
        }
    }

    // SISTEMA DE HABILIDADES
    window.useSkill = function(skillName) {
        const skill = gameData.skills[skillName];
        if (!skill) return;
        
        // Mostrar modal con la habilidad
        document.getElementById('modal-title').textContent = skillName;
        document.getElementById('modal-description').textContent = `Usado por: ${skill.user} | Potencia: ${skill.power}/100`;
        
        // Animación especial según la habilidad
        const animationDiv = document.getElementById('modal-animation');
        animationDiv.innerHTML = getSkillAnimation(skillName);
        
        document.getElementById('skill-modal').style.display = 'flex';
        
        // Añadir al log
        addLogEntry(`✨ ${skill.user} usa ${skillName}! (Potencia: ${skill.power})`);
    };

    function getSkillAnimation(skillName) {
        const animations = {
            'Drive Shot': '🌀⚽🌀',
            'Tiger Shot': '🐯⚽💥',
            'God Hand': '✋🌟✨',
            'Falcon Shot': '🦅⚽⬇️'
        };
        return animations[skillName] || '🌟✨⚽';
    }

    window.closeModal = function() {
        document.getElementById('skill-modal').style.display = 'none';
    };

    // SISTEMA DE LOG
    function addLogEntry(message) {
        const logEntries = document.getElementById('log-entries');
        const entry = document.createElement('p');
        entry.textContent = `[${gameData.match.minute}'] ${message}`;
        
        logEntries.appendChild(entry);
        
        // Mantener solo las últimas 10 entradas
        while (logEntries.children.length > 10) {
            logEntries.removeChild(logEntries.firstChild);
        }
        
        // Auto-scroll al final
        logEntries.scrollTop = logEntries.scrollHeight;
    }

    // PANTALLAS ADICIONALES
    window.showScreen('main'); // Mostrar menú principal al cargar
    
    console.log("🎮 Prototipo Captain Tsubasa 5vs5 cargado correctamente");
});
EOF￼Enter
