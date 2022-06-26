const routes = require('./route');
const SongsHandler = require('./handler');

module.exports = {
  name: 'songPlugin',
  version: '1.1.0',
  register: async (server, { songsService, validator }) => {
    const songHandler = new SongsHandler(songsService, validator);
    server.route(routes(songHandler));
  },
};
