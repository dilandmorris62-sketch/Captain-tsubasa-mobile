// ESQUEMA GameManager.cs - Actualizado para Nankatsu vs Toho

/*
Variables necesarias:
- enum GameState { Menu, Playing, Paused, Goal, Ended }
- GameState currentState;
  
- int scoreNankatsu = 0;
- int scoreToho = 0;
  
- float matchTime = 600f; // 10 minutos total
- bool isFirstHalf = true;
  
- GameObject[] teamNankatsu; // Array de 5 jugadores
- GameObject[] teamToho;     // Array de 5 jugadores
  
- GameObject ball;
- Camera mainCamera;

Funciones principales:
1. InitializeTeams()
   - Instancia jugadores de Nankatsu
   - Instancia jugadores de Toho
   - Asigna posiciones iniciales

2. UpdateScore(string teamScored)
   - if (teamScored == "Nankatsu") scoreNankatsu++;
   - if (teamScored == "Toho") scoreToho++;
   - UpdateUI();
   - StartGoalCelebration();

3. SpecialMoveActivated(string playerName, string moveType)
   - Maneja efectos especiales por jugador
   - Ej: "Tsubasa_DriveShot", "Hyuga_TigerShot"
   - Aplica bonificaciones/multiplicadores

4. EndMatch()
   - Muestra resultado final
   - Desbloquea logros si es necesario
   - Botón "Revancha" o "Menú"
*/

// Ejemplo de inicialización en pseudocódigo:
void SetupTeams() {
    // Crear equipo Nankatsu
    teamNankatsu = new GameObject[5];
    teamNankatsu[0] = InstantiatePlayer("Tsubasa", "Midfielder", new Vector3(-10, 0, 0));
    // ... otros 4 jugadores
    
    // Crear equipo Toho
    teamToho = new GameObject[5];
    teamToho[0] = InstantiatePlayer("Hyuga", "Forward", new Vector3(10, 0, 0));
    // ... otros 4 jugadores
} 
