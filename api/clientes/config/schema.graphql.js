module.exports = {
  definition: `
    input authInput {
      cnpj: String!
      senha: String!
    },
    type Auth {
      token: String!,
      cliente: Clientes!
    }
  `,
  query: 'findByToken: Clientes!',
  mutation: `auth(input: authInput!): Auth`,
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
          const ctx = {...context, options}
          return await strapi.controllers.clientes.auth(ctx);
        },
      }
    }
  }
};
