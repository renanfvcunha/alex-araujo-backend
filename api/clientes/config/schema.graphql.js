module.exports = {
  definition: '',
  query: 'findByToken: Clientes!',
  resolver: {
    Query: {
      findByToken: {
        description: 'Return client by sending access token',
        resolver: 'application::clientes.clientes.findByToken'
      }
    }
  }
};
