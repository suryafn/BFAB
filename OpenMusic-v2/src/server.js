require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

const albumsPlugin = require('./api/albums/index');
const songsPlugin = require('./api/songs/index');
const AlbumsService = require('./services/AlbumsService');
const SongsService = require('./services/SongsServices');
const SongAlbumValidator = require('./validation/songalbum/index');
const usersPlugin = require('./api/users/index');
const UsersService = require('./services/UsersService');
const UsersValidator = require('./validation/user/index');
const authenticationsPlugin = require('./api/authentications/index');
const AuthenticationsService = require('./services/AuthenticationsService');
const AuthenticationsValidator = require('./validation/authentications/index');
const TokenManager = require('./tokenize/TokenManager');
const playlistsPlugin = require('./api/playlists/index');
const PlaylistsService = require('./services/PlaylistsService');
const PlaylistsValidator = require('./validation/playlists/index');
const collaborationsPlugin = require('./api/collaborations/index');
const CollaborationsService = require('./services/CollaborationsService');
const CollaborationsValidator = require('./validation/collaborations/index');

const init = async () => {
  const albumService = new AlbumsService();
  const songsService = new SongsService();
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const collaborationsService = new CollaborationsService();
  const playlistsService = new PlaylistsService(collaborationsService);
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
      plugin: Jwt,
    },
  ]);

  server.auth.strategy('openmusic_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    {
      plugin: albumsPlugin,
      options: {
        albumService,
        validator: SongAlbumValidator,
      },
    },
    {
      plugin: songsPlugin,
      options: {
        songsService,
        validator: SongAlbumValidator,
      },
    },
    {
      plugin: usersPlugin,
      options: {
        usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: authenticationsPlugin,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: playlistsPlugin,
      options: {
        playlistsService,
        songsService,
        validator: PlaylistsValidator,
      },
    },
    {
      plugin: collaborationsPlugin,
      options: {
        collaborationsService,
        playlistsService,
        usersService,
        validator: CollaborationsValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
