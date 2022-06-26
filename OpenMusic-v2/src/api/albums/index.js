const AlbumsHandler = require('./handler');
const routes = require('./route');

module.exports = {
  name: 'albumPlugin',
  version: '1.1.0',
  register: async (server, { albumService, validator }) => {
    const albumHandler = new AlbumsHandler(albumService, validator);
    server.route(routes(albumHandler));
  },
};
