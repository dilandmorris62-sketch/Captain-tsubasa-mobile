// ESQUEMA TeamsManager.cs - Gestión específica de equipos

/*
Clase para manejar lógica específica por equipo

Variables:
- public string currentTeam; // "Nankatsu" o "Toho"
- public int teamEnergyNankatsu = 100;
- public int teamEnergyToho = 100;
  
- public bool[] specialMoveReady = new bool[5]; // Por jugador

Funciones:
1. SwitchTeamControl(string team)
   - Cambia control entre equipos (para modo práctica)
   - Actualiza UI para mostrar equipo activo

2. UseTeamEnergy(string team, int amount)
   - Gasta energía del equipo para movimientos especiales
   - if (team == "Nankatsu") teamEnergyNankatsu -= amount;
   - Regenera energía con el tiempo

3. GetPlayerSpecialMove(string playerName)
   - Devuelve move especial según jugador
   - Ej: "Tsubasa" -> "DriveShot"
   - "Hyuga" -> "TigerShot" (depende del equipo)

4. CheckTwinShotAvailable()
   - Verifica si Tsubasa y Misaki están en posición
   - Habilita Twin Shot si están cerca y con energía
*/

// Ejemplo de datos de movimientos especiales
Dictionary<string, string> specialMoves = new Dictionary<string, string>()
{
    // Nankatsu
    {"Tsubasa", "DriveShot"},
    {"Misaki", "TwinShot"},
    {"Wakabayashi", "GodHand"},
    {"Ishizaki", "PowerTackle"},
    {"Hyuga_Nankatsu", "TigerShot"},
    
    // Toho
    {"Hyuga_Toho", "TigerShot"},
    {"Wakashimazu", "ZanetsuSave"},
    {"Matsuyama", "FalconShot"},
    {"Misugi", "EleganceDefense"},
    {"Nitta", "QuickShot"}
};
