const request = require('supertest');
const app = require('../app');
const Actors = require('../models/Actors');
const Directors = require('../models/Directors');
const Genres = require('../models/Genres');
require('../models')
let id;

test('GET /movies debe traer todas las peliculas', async () => {
  const res = await request(app).get('/movies');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies debe crear una pelicula', async () => {
  const movie = { 
    name: "jhon wick ",
    image: "https://play-lh.googleusercontent.com/yngfkXYS5O2pJZoFHVvHmC5SQPCmzAsEomJv9J_vwWGxvR6nFTyDyaXsimY8w_21tjqVR5pPCKDxT-IR2fs",
    synopsis: "De Gramont explica que la Alta Mesa le ha dado recursos ilimitados para encontrar y matar a John Wick. Como castigo, De Gramont despoja a Winston de sus funciones como gerente, lo declara",
    releaseYear:  2023
  };
  const res = await request(app).post('/movies').send(movie);
  console.log(res.body)
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test('PUT /movies/:id debe actualizar una pelicula', async () => {
  const movieUpdated = { 
    name: "jhon wick 4" 
  }
  const res = await request(app).put(`/movies/${id}`).send(movieUpdated);
  expect(res.status).toBe(200);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(movieUpdated.name);
});

test('POST /movies/:id/actors debe insertar el actor a una pelicula', async() => {
    const actor = await Actors.create({ 
        firstName: "robert",
        lastName: "downey jr",
        nationality: "estadounidense",
        image: "https://media.gq.com.mx/photos/5ffa22129274cd36fe35681a/1:1/w_2027,h_2027,c_limit/robert-downey-jr-star-wars.jpg",
        birthday: "1998-04-26"
      });
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1)
});

test('POST /movies/:id/directors debe insertar el director a una pelicula', async() => {
    const director = await Directors.create({ 
        firstName: "Fernando",
        lastName: "Cayo",
        nationality: "Español",
        image: "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSj_Fu1A9e3jAUXHAZ8q9gO28ljjUtzZB6a-lYTCm4qnJoMHs3Yyb3u-0O6pyNFyPtQ",
        birthday: "1968-04-22",
      });
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1)
});
test('POST /movies/:id/genres debe insertar el genero a una pelicula', async() => {
    const genre = await Genres.create({ 
        name: "suspenso"
      });
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1)
});

test('DELETE /movies/:id debe eliminar un director', async () => {
  const res = await request(app).delete(`/movies/${id}`);
  expect(res.status).toBe(204);
});