const LikesHandler = require('./handler');
const routes = require('./route');

module.exports = {
  name: 'likes',
  version: '1.0.0',
  register: async (server, { likesService, albumService, cacheService }) => {
    const likesHandler = new LikesHandler(likesService, albumService, cacheService);
    server.route(routes(likesHandler));
  },
};
