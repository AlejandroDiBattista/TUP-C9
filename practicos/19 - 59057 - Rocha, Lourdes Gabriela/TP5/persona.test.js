import request from 'supertest';
import app from '../app';

describe('API Tests', () => {
  it('GET /people should return active people', async () => {
    const res = await request(app).get('/people');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.arrayContaining([
      expect.objectContaining({ firstName: 'Carlos', deleted: false }),
      expect.objectContaining({ firstName: 'Ana', deleted: false }),
      expect.objectContaining({ firstName: 'Miguel', deleted: false }),
      expect.objectContaining({ firstName: 'Elena', deleted: false }),
      expect.objectContaining({ firstName: 'Javier', deleted: false }),
    ]));
  });

  it('PUT /people should add a new person', async () => {
    const newPerson = { firstName: 'Juan', lastName: 'Perez', age: 22 };
    const res = await request(app).put('/people').send(newPerson);
    expect(res.statusCode).toEqual(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toEqual('Juan');
  });

  it('PUT /people should update an existing person', async () => {
    const newPerson = { firstName: 'Sofia', lastName: 'Gonzalez', age: 27 };
    const res = await request(app).put('/people').send(newPerson);
    const updatedPerson = { id: res.body.id, age: 28 };
    const updateRes = await request(app).put('/people').send(updatedPerson);
    expect(updateRes.statusCode).toEqual(200);
    expect(updateRes.body.age).toEqual(28);
  });

  it('PUT /people should logically delete a person', async () => {
    const newPerson = { firstName: 'Luis', lastName: 'Rodriguez', age: 32 };
    const res = await request(app).put('/people').send(newPerson);
    const deletedPerson = { id: res.body.id, deleted: true };
    const deleteRes = await request(app).put('/people').send(deletedPerson);
    expect(deleteRes.statusCode).toEqual(200);
    const getRes = await request(app).get('/people');
    expect(getRes.body.find(p => p.id === deletedPerson.id)).toBeUndefined();
  });
});
