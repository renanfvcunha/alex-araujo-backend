'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async auth(ctx) {
    const { cnpj, senha } = ctx.options.input

    if (!cnpj || !senha) {
      throw new Error('fieldsMismatch')
    }

    return await strapi.services.clientes.auth(cnpj, senha)
  },
  async findByToken(ctx) {
    const token = ctx.headers['x-access-token'];

    if (!token) {
      throw new Error('notSentToken')
    }

    return await strapi.services.clientes.findByToken(token)
  }
};
