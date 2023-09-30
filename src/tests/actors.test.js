const request = require('supertest');
const app = require('../app');

let id;

test('GET /actors debe traer todos los actores', async () => {
  const res = await request(app).get('/actors');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors debe crear un actor', async () => {
  const actor = { 
    firstName: "robert",
    lastName: "downey jr",
    nationality: "estadounidense",
    image: "https://media.gq.com.mx/photos/5ffa22129274cd36fe35681a/1:1/w_2027,h_2027,c_limit/robert-downey-jr-star-wars.jpg",
    birthday: "1998-04-26"
  }
  const res = await request(app).post('/actors').send(actor);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(actor.firstName);
});

test('PUT /actors/:id debe actualizar un actor', async () => {
  const actorUpdated = { 
    firstName: "ironman" 
  }
  const res = await request(app).put(`/actors/${id}`).send(actorUpdated);
  console.log(res.body)
  expect(res.status).toBe(200);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(actorUpdated.firstName);
});

test('DELETE /actors/:id debe eliminar un actor', async () => {
  const res = await request(app).delete(`/actors/${id}`);
  expect(res.status).toBe(204);
});
