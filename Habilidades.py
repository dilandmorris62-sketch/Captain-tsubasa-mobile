herecat > habilidades.py << 'EOF'
# habilidades.py - Habilidades especiales por jugador
class Habilidad:
    def __init__(self, nombre, costo_energia, potencia, descripcion):
        self.nombre = nombre
        self.costo = costo_energia
        self.potencia = potencia
        self.descripcion = descripcion
    
    def usar(self, jugador):
        if jugador.energia >= self.costo:
            jugador.energia -= self.costo
            return f"🌟 {jugador.nombre} usa {self.nombre}! ({self.descripcion})"
        return f"💤 {jugador.nombre} no tiene energía para {self.nombre}"

# Catálogo de habilidades del universo Captain Tsubasa
HABILIDADES_DISPONIBLES = {
    "Tsubasa Ozora": [
        Habilidad("Drive Shot", 40, 90, "Disparo con efecto curva"),
        Habilidad("Drive Pass", 30, 85, "Pase preciso imposible de interceptar"),
        Habilidad("Miracle Drive", 60, 95, "Disparo desde media cancha")
    ],
    "Kojiro Hyuga": [
        Habilidad("Tiger Shot", 50, 95, "Disparo demoledor"),
        Habilidad("Tiger Tackle", 35, 80, "Entrada potente"),
        Habilidad("Neo Tiger Shot", 70, 98, "Versión mejorada del Tiger Shot")
    ],
    "Genzo Wakabayashi": [
        Habilidad("God Hand", 45, 90, "Atajada milagrosa"),
        Habilidad("Megaton Punch", 40, 85, "Despeje con puño")
    ],
    "Hikaru Matsuyama": [
        Habilidad("Falcon Shot", 40, 85, "Disparo en picado"),
        Habilidad("Falcon Tackle", 35, 80, "Entrada aérea")
    ]
}

def mostrar_habilidades_jugador(nombre_jugador):
    if nombre_jugador in HABILIDADES_DISPONIBLES:
        print(f"\n🎯 Habilidades de {nombre_jugador}:")
        for habilidad in HABILIDADES_DISPONIBLES[nombre_jugador]:
            print(f"   • {habilidad.nombre}: {habilidad.descripcion}")
            print(f"     Costo: {habilidad.costo} energía | Potencia: {habilidad.potencia}/100")
    else:
        print(f"\n⚠️ {nombre_jugador} no tiene habilidades especiales registradas.")

def usar_habilidad(jugador, nombre_habilidad):
    if jugador.nombre in HABILIDADES_DISPONIBLES:
        for habilidad in HABILIDADES_DISPONIBLES[jugador.nombre]:
            if habilidad.nombre == nombre_habilidad:
                return habilidad.usar(jugador)
    return "❌ Habilidad no disponible"

# Prueba del sistema
if __name__ == "__main__":
    from players import Jugador
    
    print("="*50)
    print("🌟 SISTEMA DE HABILIDADES ESPECIALES")
    print("="*50)
    
    tsubasa = Jugador("Tsubasa Ozora", "Nankatsu", 10)
    hyuga = Jugador("Kojiro Hyuga", "Toho", 9)
    
    mostrar_habilidades_jugador("Tsubasa Ozora")
    mostrar_habilidades_jugador("Kojiro Hyuga")
    
    print("\n" + "="*50)
    print("Prueba de uso:")
    print(usar_habilidad(tsubasa, "Drive Shot"))
    print(usar_habilidad(hyuga, "Tiger Shot"))
    
    print("\n✅ Sistema de habilidades funcionando!")
    print("="*50)
EOF
