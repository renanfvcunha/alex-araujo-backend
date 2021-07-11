'use strict';
const { sanitizeEntity } = require('strapi-utils')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async auth(ctx) {
    const { cnpj, senha } = ctx.request.body

    if (!cnpj || !senha) {
      return ctx.send({ err: 'Verifique se os campos estão preenchidos' }, 400)
    }

    try {
      const entity = await strapi.services.clientes.findOne({ cnpj });
  
      if (!entity) {
        return ctx.send({ err: 'Usuário E/Ou Senha Incorreto(s)' }, 401)
      }

      const pass = await bcrypt.compare(senha, entity.senha)

      if (!pass) {
        return ctx.send({ err: 'Usuário E/Ou Senha Incorreto(s)' }, 401)
      }
  
      const token = jwt.sign({ id: entity.id }, process.env.CLIENT_SECRET, {
        expiresIn: '1d'
      })
    
      return ctx.send({ token, entity: sanitizeEntity(entity, { model: strapi.models.clientes }) })
    } catch (err) {
      return ctx.send({ err: 'Erro Interno do Servidor' }, 500)
    }
  },
  async findByToken(ctx) {
    const token = ctx.headers['x-access-token'];

    if (!token) {
      throw new Error('Token Não Enviado!')
    }

    return await strapi.services.clientes.findByToken(token)
  }
};
