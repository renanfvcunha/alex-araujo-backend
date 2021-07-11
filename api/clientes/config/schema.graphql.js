module.exports = {
  definition: `
    input authInput {
      cnpj: String!
      senha: String!
    }
  `,
  query: 'findByToken: Clientes!',
  mutation: `auth(input: authInput!): Clientes!`,
  resolver: {
    Query: {
      findByToken: {
        description: 'Return client by sending access token',
        resolver: 'application::clientes.clientes.findByToken'
      }
    },
    Mutation: {
      auth: {
        description: 'Authenticate client and return access token',
        resolverOf: 'application::clientes.clientes.auth',
        resolver: async (obj, options, { context }) => {
          return await strapi.controllers.clientes.auth(context);
        },
      }
    }
  }
};
