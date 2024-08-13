import request from "supertest";
import { expect, describe, test } from "@jest/globals";

import servidor from "./app.js";

describe("GET All", () => {
    test("1. Debe responder con un status 200", async () => {
        const res = await request(servidor).get("/personas").send();
        expect(res.statusCode).toBe(200);
    });

    test("2. Debe retornar un JSON", async () => {
        const res = await request(servidor).get("/personas").send();
        expect(res.type).toBe("application/json");
    });

    test("3. Debe responder con un array", async () => {
        const res = await request(servidor).get("/personas").send();
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("4. Debe tener al menos 5 personas", async () => {
        const res = await request(servidor).get("/personas").send();
        expect(res.body.length).toBeGreaterThanOrEqual(5);
    });

    test("5. Debe retornar un array de personas", async () => {
        const res = await request(servidor).get("/personas").send();
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    identificador: expect.any(Number),
                    nombre: expect.any(String),
                    apellido: expect.any(String),
                    edad: expect.any(Number),
                    eliminado: expect.any(Boolean),
                    actualizado: expect.any(Number)
                })
            ])
        );
    });
});

describe("Crear una persona", () => {
    test("1. Crear una persona (retorna codigo)", async () => {
        const persona = { nombre: "Juan", apellido: "Perez", edad: 30 };
        const res = await request(servidor).put("/personas").send(persona);
        expect(res.statusCode).toBe(201);
    });

    test("2. Crear una persona (y retorna su identificador)", async () => {
        const persona = { nombre: "Juan", apellido: "Perez", edad: 30 };

        const res = await request(servidor).put("/personas").send(persona);
        expect(res.body.identificador).toBeDefined();
    });

    test("3. Crear una persona (debe haber uno más)", async () => {
        const persona = { nombre: "Juan", apellido: "Perez", edad: 30 };

        const leer = await request(servidor).get("/personas").send();
        const antes = leer.body.length;

        const crear = await request(servidor).put("/personas").send(persona);
        expect(crear.body.identificador).toBeDefined();

        const leer2 = await request(servidor).get("/personas").send();
        const despues = leer2.body.length;

        expect(despues).toBe(antes + 1);
    });
});

describe("Actualizar una persona", () => {
    test("1. Actualizar una persona (retorna código)", async () => {
        const persona = { identificador: 2, nombre: "Juan", apellido: "Perez", edad: 30 };
        const res = await request(servidor).put("/personas").send(persona);
        expect(res.statusCode).toBe(201);
    });

    test("2. Si no existe la persona, no se actualiza", async () => {
        const persona = { identificador: 100, nombre: "Juan", apellido: "Perez", edad: 30 };
        const res = await request(servidor).put("/personas").send(persona);
        expect(res.statusCode).toBe(404);
    });

    test("3. Actualizar una persona (y retorna la persona actualizada)", async () => {
        const persona = { identificador: 2, nombre: "JuanXX", apellido: "Perez", edad: 30 };

        const res = await request(servidor).put("/personas").send(persona);
        console.log(">>>>", res.body);
        expect(res.body.eliminado).toBeDefined();
        expect(res.body.actualizado).toBeDefined();

        expect(res.body.nombre).toBe(persona.nombre);
    });
});

describe("Borrar una persona", () => {
    test("1. Borrar una persona (retorna código)", async () => {
        const persona = { identificador: 2 };
        const res = await request(servidor).put("/personas").send(persona);
        expect(res.statusCode).toBe(201);
    });

    test("2. Si no existe la persona, no se borra", async () => {
        const persona = { identificador: 100 };
        const res = await request(servidor).put("/personas").send(persona);
        expect(res.statusCode).toBe(404);
    });

    test("3. Borrar una persona (y retorna la persona eliminada)", async () => {
        const persona = { identificador: 3, eliminado: true };

        const res = await request(servidor).put("/personas").send(persona);
        expect(res.body.eliminado).toBe(true);
        expect(res.body.actualizado).toBeDefined();
        expect(res.body.identificador).toBe(persona.identificador);
    });

    test("4. Borrar una persona (debe haber uno menos)", async () => {
        const persona = { identificador: 4, eliminado: true };

        const leerAntes = await request(servidor).get("/personas").send();
        const antes = leerAntes.body.length;

        const borrar = await request(servidor).put("/personas").send(persona);
        expect(borrar.body.identificador).toBe(persona.identificador);

        const leerDespues = await request(servidor).get("/personas").send();
        const despues = leerDespues.body.length;

        expect(despues).toBe(antes - 1);
    });
});
