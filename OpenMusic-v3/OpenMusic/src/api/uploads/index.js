const UploadsHandler = require('./handler');
const routes = require('./route');

module.exports = {
  name: 'uploads',
  version: '1.0.0',
  register: async (server, { storageService, albumService, validator }) => {
    const uploadsHandler = new UploadsHandler(storageService, albumService, validator);
    server.route(routes(uploadsHandler));
  },
};
