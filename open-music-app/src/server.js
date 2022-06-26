/* eslint-disable linebreak-style */
/* eslint-disable no-console */
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const AlbumsServices = require('./services/postgres/AlbumsServices');
const SongsServices = require('./services/postgres/SongsServices');
const albums = require('./api/albums');
const AlbumValidator = require('./validator/albums');
const songs = require('./api/songs');
const SongValidator = require('./validator/songs');

const init = async () => {
  const albumsServices = new AlbumsServices();
  const songsServices = new SongsServices();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: albumsServices,
        validator: AlbumValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songsServices,
        validator: SongValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
