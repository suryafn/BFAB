const CollaborationsHandler = require('./handler');
const routes = require('./route');

module.exports = {
  name: 'collaboration',
  version: '1.0.0',
  register: async (server, {
    collaborationsService, playlistsService, usersService, validator,
  }) => {
    const collaborationsHandler = new CollaborationsHandler(collaborationsService, playlistsService, usersService, validator);

    server.route(routes(collaborationsHandler));
  },
};
