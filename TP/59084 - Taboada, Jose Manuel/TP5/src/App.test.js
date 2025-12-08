import request from "supertest";
import { expect, describe, test } from "@jest/globals";

import app from

describe("GET All", () => {
    test("1. Debe responder con un status 200", async () => {
        const res = await request(app).get("/personas").send();
        expect(res.statusCode).toBe(200);
    });

    test("2. Debe retornar un JSON", async () => {
        const res = await request(app).get("/personas").send();
        expect(res.type).toBe("application/json");
    });

    test("3. Debe responder con un array", async () => {
        const res = await request(app).get("/personas").send();
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("4. Debe tener al menos 5 personas", async () => {
        const res = await request(app).get("/personas").send();
        expect(res.body.length).toBeGreaterThanOrEqual(5);
    });

    test("5. Debe retornar un array de personas", async () => {
        const res = await request(app).get("/personas").send();
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    nombre: expect.any(String),
                    apellido: expect.any(String),
                    edad: expect.any(Number),
                    borrado: expect.any(Boolean),
                    actualizado: expect.any(Number)
                })
            ])
        );
    });
});

describe("Crear una persona", () => {

    test("1. Crear una persona (retorna código 201)", async () => {
        const nuevaPersona = { nombre: "Carlos", apellido: "González", edad: 30 };
        const res = await request(app).put("/personas").send(nuevaPersona);
        expect(res.statusCode).toBe(201);
    });

    test("2. Crear una persona (y retorna su id)", async () => {
        const nuevaPersona = { nombre: "Carlos", apellido: "González", edad: 30 };

        const res = await request(app).put("/personas").send(nuevaPersona);
        expect(res.body.id).toBeDefined();
    });

    test("3. Crear una persona (debe haber una más)", async () => {
        const nuevaPersona = { nombre: "Carlos", apellido: "González", edad: 30 };

        const leerAntes = await request(app).get("/personas").send();
        const cantidadAntes = leerAntes.body.length;

        const res = await request(app).put("/personas").send(nuevaPersona);
        expect(res.body.id).toBeDefined();

        const leerDespues = await request(app).get("/personas").send();
        const cantidadDespues = leerDespues.body.length;

        expect(cantidadDespues).toBe(cantidadAntes + 1);
    });
});

describe("Actualizar una persona", () => {
    test("1. Actualizar una persona (retorna código 201)", async () => {
        const personaActualizada = { id: 2, nombre: "Luisa", apellido: "Hernández", edad: 31 };
        const res = await request(app).put("/personas").send(personaActualizada);
        expect(res.statusCode).toBe(201);
    });

    test("2. Si no existe la persona, no se actualiza", async () => {
        const personaInexistente = { id: 100, nombre: "Pedro", apellido: "González", edad: 35 };
        const res = await request(app).put("/personas").send(personaInexistente);
        expect(res.statusCode).toBe(404);
    });

    test("3. Actualizar una persona (y retorna la persona actualizada)", async () => {
        const personaActualizada = { id: 2, nombre: "LuisaXX", apellido: "Hernández", edad: 31 };

        const res = await request(app).put("/personas").send(personaActualizada);
        expect(res.body.borrado).toBeDefined();
        expect(res.body.actualizado).toBeDefined();
        expect(res.body.nombre).toBe(personaActualizada.nombre);
    });
});

describe("Borrar una persona", () => {
    test("1. Borrar una persona (retorna código 201)", async () => {
        const personaABorrar = { id: 2 };
        const res = await request(app).put("/personas").send(personaABorrar);
        expect(res.statusCode).toBe(201);
    });

    test("2. Si no existe la persona, no se borra", async () => {
        const personaInexistente = { id: 100 };
        const res = await request(app).put("/personas").send(personaInexistente);
        expect(res.statusCode).toBe(404);
    });

    test("3. Borrar una persona (y retorna la persona borrada)", async () => {
        const personaABorrar = { id: 3, borrado: true };

        const res = await request(app).put("/personas").send(personaABorrar);
        expect(res.body.borrado).toBe(true);
        expect(res.body.actualizado).toBeDefined();
        expect(res.body.id).toBe(personaABorrar.id);
    });

    test("4. Borrar una persona (debe haber una menos)", async () => {
        const personaABorrar = { id: 4, borrado: true };

        const leerAntes = await request(app).get("/personas").send();
        const cantidadAntes = leerAntes.body.length;

        const res = await request(app).put("/personas").send(personaABorrar);
        expect(res.body.id).toBe(personaABorrar.id);

        const leerDespues = await request(app).get("/personas").send();
        const cantidadDespues = leerDespues.body.length;

        expect(cantidadDespues).toBe(cantidadAntes - 1);
    });
});
