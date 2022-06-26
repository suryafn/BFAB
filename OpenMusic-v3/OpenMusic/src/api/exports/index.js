const ExportsHandler = require('./handler');
const routes = require('./route');

module.exports = {
  name: 'exports',
  version: '1.0.0',
  register: async (server, { exportsService, playlistsService, validator }) => {
    const exportsHandler = new ExportsHandler(exportsService, playlistsService, validator);
    server.route(routes(exportsHandler));
  },
};
