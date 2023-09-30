const request = require('supertest');
const app = require('../app');

let id;

test('GET /directors debe traer todos los directores', async () => {
  const res = await request(app).get('/directors');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors debe crear un director', async () => {
  const director = { 
    firstName: "Fernando",
    lastName: "Cayo",
    nationality: "Español",
    image: "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSj_Fu1A9e3jAUXHAZ8q9gO28ljjUtzZB6a-lYTCm4qnJoMHs3Yyb3u-0O6pyNFyPtQ",
    birthday: "1968-04-22",
  }
  const res = await request(app).post('/directors').send(director);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(director.firstName);
});

test('PUT /directors/:id debe actualizar un director', async () => {
  const directorUpdated = { 
    firstName: "Fernando jimenez", 
  }
  const res = await request(app).put(`/directors/${id}`).send(directorUpdated);
  expect(res.status).toBe(200);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(directorUpdated.firstName);
});

test('DELETE /directors/:id debe eliminar un director', async () => {
  const res = await request(app).delete(`/directors/${id}`);
  expect(res.status).toBe(204);
});