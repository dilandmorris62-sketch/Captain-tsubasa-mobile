herecat > partido.py << 'EOF'
# partido.py - Sistema completo de partidos
import random
import time

class Partido:
    def __init__(self, equipo_local, equipo_visitante):
        self.equipo_local = equipo_local
        self.equipo_visitante = equipo_visitante
        self.marcador = [0, 0]  # [local, visitante]
        self.minuto = 0
        self.posesion = equipo_local
        self.esta_jugando = True
    
    def simular_jugada(self):
        # Lógica de jugadas con probabilidades realistas
        eventos_posibles = [
            ("Tiro a puerta", 0.3),
            ("Pase largo", 0.4),
            ("Regate", 0.2),
            ("Falta", 0.1)
        ]
        
        evento = random.choices(
            [e[0] for e in eventos_posibles],
            [e[1] for e in eventos_posibles]
        )[0]
        
        return evento
    
    def avanzar_partido(self):
        while self.minuto < 90 and self.esta_jugando:
            self.minuto += random.randint(1, 5)
            jugada = self.simular_jugada()
            
            # Lógica de goles basada en jugadas
            if jugada == "Tiro a puerta" and random.random() < 0.15:
                if self.posesion == self.equipo_local:
                    self.marcador[0] += 1
                    print(f"⚽ Min {self.minuto}: GOOOL del {self.equipo_local}!")
                else:
                    self.marcador[1] += 1
                    print(f"⚽ Min {self.minuto}: GOOOL del {self.equipo_visitante}!")
            
            # Cambio de posesión
            if random.random() < 0.3:
                self.posesion = self.equipo_visitante if self.posesion == self.equipo_local else self.equipo_local
            
            time.sleep(0.5)
        
        return self.marcador

def jugar_partido_rapido():
    print("="*50)
    print("🎮 PARTIDO 5vs5 - NANKATSU vs TOHO")
    print("="*50)
    
    partido = Partido("Nankatsu SC", "Toho Academy")
    print("Iniciando partido...")
    
    marcador_final = partido.avanzar_partido()
    
    print("\n" + "="*50)
    print("🏁 RESULTADO FINAL")
    print(f"🔵 Nankatsu SC: {marcador_final[0]}")
    print(f"🔴 Toho Academy: {marcador_final[1]}")
    print("="*50)
    
    if marcador_final[0] > marcador_final[1]:
        print("🎉 ¡NANKATSU GANA!")
    elif marcador_final[1] > marcador_final[0]:
        print("🎉 ¡TOHO GANA!")
    else:
        print("🤝 ¡EMPATE!")
    
    input("\nPresiona Enter para continuar...")

if __name__ == "__main__":
    jugar_partido_rapido()
EOF
