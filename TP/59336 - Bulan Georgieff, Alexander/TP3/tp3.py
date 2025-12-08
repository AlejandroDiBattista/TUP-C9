import datetime
from collections import defaultdict

def cargar_datos():
    datos = []
    with open("datos.dat", "r") as file:
        for linea in file:
            fecha = datetime.datetime.strptime(linea[:10].strip(), "%Y-%m-%d").date()
            producto = linea[10:40].strip()
            precio = float(linea[40:50].strip())
            cantidad = int(linea[50:].strip())
            datos.append({
                "fecha": fecha,
                "producto": producto,
                "precio": precio,
                "cantidad": cantidad
            })
    return datos

def calcular_totales(datos):
    importe_total = sum(item["precio"] * item["cantidad"] for item in datos)
    cantidad_total = sum(item["cantidad"] for item in datos)
    return importe_total, cantidad_total

def unidades_vendidas(datos):
    ventas = defaultdict(int)
    for item in datos:
        ventas[item["producto"]] += item["cantidad"]
    return dict(ventas)

def listar_ventas(ventas):
    for producto, cantidad in ventas.items():
        print(f"{producto}: {cantidad} unidades")

def precio_promedio(datos):
    totales = defaultdict(lambda: {"suma": 0, "cantidad": 0})
    for item in datos:
        producto = item["producto"]
        totales[producto]["suma"] += item["precio"] * item["cantidad"]
        totales[producto]["cantidad"] += item["cantidad"]
    
    return {producto: info["suma"] / info["cantidad"] for producto, info in totales.items()}

def listar_precios(precios):
    for producto, precio in precios.items():
        print(f"{producto}: ${precio:.2f}")

def ranking_productos(datos, top=3):
    ventas = unidades_vendidas(datos)
    return sorted(ventas.items(), key=lambda x: x[1], reverse=True)[:top]

def listar_ranking(ranking):
    for i, (producto, cantidad) in enumerate(ranking, 1):
        print(f"{i}. {producto}: {cantidad} unidades")

def ventas_por_mes(datos):
    ventas = defaultdict(lambda: defaultdict(int))
    for item in datos:
        mes = item["fecha"].strftime("%Y-%m")
        ventas[mes][item["producto"]] += item["cantidad"]
    return dict(ventas)

def listar_ventas_mensuales(ventas):
    for mes in sorted(ventas.keys()):
        print(f"\nMes: {mes}")
        for producto, cantidad in ventas[mes].items():
            print(f"  {producto}: {cantidad} unidades")

def resumen_ventas(datos):
    resumen = defaultdict(lambda: {"total": 0, "cantidad": 0, "importe": 0})
    for item in datos:
        producto = item["producto"]
        precio = item["precio"]
        cantidad = item["cantidad"]
        resumen[producto]["total"] += precio * cantidad
        resumen[producto]["cantidad"] += cantidad
        resumen[producto]["importe"] += precio * cantidad
    
    for producto, info in resumen.items():
        info["promedio"] = info["total"] / info["cantidad"]
    
    return dict(resumen)

def informe_ventas(resumen):
    for producto in sorted(resumen.keys()):
        datos = resumen[producto]
        print(f"{producto}:")
        print(f"  Precio promedio: ${datos['promedio']:.2f}")
        print(f"  Unidades vendidas: {datos['cantidad']}")
        print(f"  Importe total: ${datos['importe']:.2f}")
        print()

# Ej
datos = cargar_datos()
importe, cantidad = calcular_totales(datos)
print(f"Las ventas fueron de ${importe:.2f} en {cantidad} unidades")

print("\nUnidades vendidas por producto:")
ventas = unidades_vendidas(datos)
listar_ventas(ventas)

print("\nPrecio promedio por producto:")
precios = precio_promedio(datos)
listar_precios(precios)

print("\nRanking de productos más vendidos:")
ranking = ranking_productos(datos)
listar_ranking(ranking)

print("\nVentas por mes:")
ventas_mensuales = ventas_por_mes(datos)
listar_ventas_mensuales(ventas_mensuales)

print("\nInforme general de ventas:")
resumen = resumen_ventas(datos)
informe_ventas(resumen)