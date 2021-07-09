'use strict';
const { sanitizeEntity } = require('strapi-utils')
const jwt = require('jsonwebtoken')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async auth(ctx) {
    const { cnpj, senha } = ctx.request.body

    const entity = await strapi.services.clientes.findOne({ cnpj, senha });

    if (!entity) {
      return ctx.send({ err: 'Usuário E/Ou Senha Incorreto(s)' }, 401)
    }

    const token = jwt.sign({ id: entity.id }, process.env.CLIENT_SECRET, {
      expiresIn: '1d'
    })
  
    return ctx.send({ token, entity: sanitizeEntity(entity, { model: strapi.models.clientes }) })
  }
};
