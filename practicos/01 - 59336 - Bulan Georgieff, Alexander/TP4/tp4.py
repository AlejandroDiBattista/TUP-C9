import random

def calcular_valor(numero, palo):
    # Valores especiales para las cartas del truco
    valores_especiales = {
        1: 14,  # As
        7: 13 if palo in ["espada", "oro"] else 7,
        3: 12,
        2: 11,
    }
    return valores_especiales.get(numero, numero)

class Carta:
    def __init__(self, numero, palo):
        self.numero = numero
        self.palo = palo
        self.valor = calcular_valor(numero, palo)
    
    def __str__(self):
        return f"{self.numero} de {self.palo}"

class Mazo:
    def __init__(self):
        palos = ["oro", "copa", "espada", "basto"]
        numeros = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12]
        self.cartas = [Carta(numero, palo) for palo in palos for numero in numeros]
    
    def mezclar(self):
        random.shuffle(self.cartas)
    
    def repartir(self, cantidad):
        return [self.cartas.pop() for _ in range(cantidad)]

class Jugador:
    def __init__(self, nombre):
        self.nombre = nombre
        self.mano = []
        self.puntos = 0
    
    def recibir_cartas(self, cartas):
        self.mano.extend(cartas)
    
    def jugar_carta(self):
        return self.mano.pop(random.randint(0, len(self.mano) - 1))

class Partida:
    def __init__(self, jugador1, jugador2):
        self.jugador1 = jugador1
        self.jugador2 = jugador2
        self.mazo = Mazo()
    
    def jugar_ronda(self):
        carta1 = self.jugador1.jugar_carta()
        carta2 = self.jugador2.jugar_carta()
        print(f"{self.jugador1.nombre} juega {carta1}")
        print(f"{self.jugador2.nombre} juega {carta2}")
        if carta1.valor > carta2.valor:
            print(f"{self.jugador1.nombre} gana la ronda")
            return self.jugador1
        elif carta2.valor > carta1.valor:
            print(f"{self.jugador2.nombre} gana la ronda")
            return self.jugador2
        else:
            print("Empate en esta ronda")
            return None

    def jugar(self):
        while self.jugador1.puntos < 15 and self.jugador2.puntos < 15:
            print("\nNueva mano:")
            self.mazo = Mazo()  # Crear un nuevo mazo para cada mano
            self.mazo.mezclar()
            self.jugador1.recibir_cartas(self.mazo.repartir(3))
            self.jugador2.recibir_cartas(self.mazo.repartir(3))
            
            puntos_mano = 0
            for _ in range(3):
                ganador_ronda = self.jugar_ronda()
                if ganador_ronda:
                    puntos_mano += 1
            
            if puntos_mano > 1:
                if ganador_ronda == self.jugador1:
                    self.jugador1.puntos += 1
                    print(f"{self.jugador1.nombre} gana la mano")
                else:
                    self.jugador2.puntos += 1
                    print(f"{self.jugador2.nombre} gana la mano")
            else:
                print("Empate en esta mano")
            
            print(f"Puntuación: {self.jugador1.nombre}: {self.jugador1.puntos}, {self.jugador2.nombre}: {self.jugador2.puntos}")
        
        if self.jugador1.puntos >= 15:
            print(f"\n¡{self.jugador1.nombre} gana el juego!")
        else:
            print(f"\n¡{self.jugador2.nombre} gana el juego!")

# Ejemplo de uso
jugador1 = Jugador("Juan")
jugador2 = Jugador("Pedro")
partida = Partida(jugador1, jugador2)
partida.jugar()