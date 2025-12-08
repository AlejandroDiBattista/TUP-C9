import pandas as pd
import numpy as np
from numpy.random import randint

# ej1
def cargar_datos():
    
    widths = [10, 30, 10, 5]
    
    
    raw_data = """2024-08-27Mirinda                             1510   14
2024-08-27Mirinda                             1560   12
2024-08-28Torasso                              940    8
2024-08-29Pepsi Cola                          1210   10
2024-08-30Mirinda                             1520    1
2024-09-01Mirinda                             1550   15
2024-09-01Sprite                               810    4
2024-09-02Coca Cola                           1100    4
2024-09-02Pepsi Cola                          1220   13
2024-09-02Torasso                              910    5
2024-09-02Torasso                              920    3
2024-09-03Coca Cola                           1020    8
2024-09-03Mirinda                             1570    7
2024-09-03Mirinda                             1590    2
2024-09-04Pepsi Cola                          1220   13
2024-09-05Mirinda                             1500    3
2024-09-05Pepsi Cola                          1300    5
2024-09-06Coca Cola                           1080    1
2024-09-06Sprite                               860   12
2024-09-06Torasso                              930    3
2024-09-07Coca Cola                           1080   14
2024-09-07Sprite                               870   13
2024-09-08Coca Cola                           1040   10
2024-09-08Mirinda                             1580    2
2024-09-08Pepsi Cola                          1240    9
2024-09-09Mirinda                             1500    3
2024-09-09Sprite                               850    9
2024-09-10Mirinda                             1590    8
2024-09-10Pepsi Cola                          1250   12
2024-09-11Sprite                               810    6
2024-09-11Sprite                               820   14
2024-09-12Coca Cola                           1080    4
2024-09-13Mirinda                             1580    5
2024-09-13Pepsi Cola                          1250   13
2024-09-14Coca Cola                           1080   15
2024-09-14Pepsi Cola                          1270   14
2024-09-15Coca Cola                           1100    1
2024-09-15Mirinda                             1500   13
2024-09-15Sprite                               870   14
2024-09-15Torasso                              900   13"""

    data = []
    for line in raw_data.split('\n'):
        fecha = line[:widths[0]].strip()
        producto = line[widths[0]:widths[0]+widths[1]].strip()
        precio = float(line[widths[0]+widths[1]:widths[0]+widths[1]+widths[2]].strip())
        cantidad = int(line[widths[0]+widths[1]+widths[2]:].strip())
        data.append([fecha, producto, precio, cantidad])
    
    
    df = pd.DataFrame(data, columns=['fecha', 'producto', 'precio', 'cantidad'])
    df['fecha'] = pd.to_datetime(df['fecha'])
    return df

# ej 2
def calcular_totales(datos):
    datos['importe'] = datos['precio'] * datos['cantidad']
    importe_total = datos['importe'].sum()
    cantidad_total = datos['cantidad'].sum()
    return importe_total, cantidad_total

# ej3
def unidades_vendidas(datos):
    return datos.groupby('producto')['cantidad'].sum().sort_values(ascending=False)

# ej 4
def precio_promedio(datos):
    return datos.groupby('producto')['precio'].mean().round(2)

# ej5
def ranking_productos(datos, top=3):
    return unidades_vendidas(datos).head(top)

# ej 6
def ventas_por_mes(datos):
    datos['mes'] = datos['fecha'].dt.strftime('%Y-%m')
    return datos.pivot_table(
        values='cantidad',
        index='producto',
        columns='mes',
        aggfunc='sum',
        fill_value=0
    )

# ej 7
def resumen_ventas(datos):
    resumen = pd.DataFrame({
        'precio_promedio': precio_promedio(datos),
        'unidades_vendidas': unidades_vendidas(datos),
        'importe_total': datos.groupby('producto').apply(
            lambda x: (x['precio'] * x['cantidad']).sum()
        )
    }).round(2)
    return resumen.sort_index()

# ej 8
def f(x, coeficientes):
    a, b, c = coeficientes
    return a*x**2 + b*x + c

def error(y, y_pred):
    return y - y_pred

def buscar_coeficientes_exactos():
    X = np.array([0,1,2,3,5])
    Y = np.array([0,8,12,12,0])
    
    # 
    for a in range(-5, 6):
        for b in range(-10, 11):
            for c in range(-5, 6):
                y_pred = f(X, (a,b,c))
                if np.all(np.abs(error(Y, y_pred)) < 0.0001):  
                    return a, b, c
    return None

# ej 9
def buscar_coeficientes():
    X = np.array([0, 1, 2, 3, 5])
    Y = np.array([0, 8, 12, 11, 1])
    
    
    coeficientes = randint(-10, 10, 3)
    learning_rate = 0.001
    
    mejor_error = float('inf')
    mejor_coef = coeficientes.copy()
    
    while mejor_error > 1:
        
        y_pred = f(X, coeficientes)
        current_error = error(Y, y_pred)
        
        
        nuevos_coef = coeficientes + np.random.normal(0, learning_rate, 3)
        y_pred_nuevo = f(X, nuevos_coef)
        nuevo_error = error(Y, y_pred_nuevo)
        
        
        if np.sum(nuevo_error**2) < mejor_error:
            mejor_error = np.sum(nuevo_error**2)
            mejor_coef = nuevos_coef.copy()
            coeficientes = nuevos_coef.copy()
    
    return mejor_coef

if __name__ == "__main__":
    # panda
    datos = cargar_datos()
    
    print("\n=== Ejercicio 2: Totales ===")
    importe, cantidad = calcular_totales(datos)
    print(f"Las ventas fueron de ${importe:.2f} en {cantidad} unidades")
    
    print("\n=== Ejercicio 3: Unidades vendidas por producto ===")
    print(unidades_vendidas(datos))
    
    print("\n=== Ejercicio 4: Precio promedio por producto ===")
    print(precio_promedio(datos))
    
    print("\n=== Ejercicio 5: Top 3 productos más vendidos ===")
    print(ranking_productos(datos))
    
    print("\n=== Ejercicio 6: Ventas por mes ===")
    print(ventas_por_mes(datos))
    
    print("\n=== Ejercicio 7: Resumen general de ventas ===")
    print(resumen_ventas(datos))
    
    # numpyy
    print("\n=== Ejercicio 8: Coeficientes exactos ===")
    coef_exactos = buscar_coeficientes_exactos()
    print(f"Coeficientes exactos: {coef_exactos}")
    
    print("\n=== Ejercicio 9: Coeficientes minimización ===")
    coef_min = buscar_coeficientes()
    print(f"Coeficientes minimización: {coef_min}")