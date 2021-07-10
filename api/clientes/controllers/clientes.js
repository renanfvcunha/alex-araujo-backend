'use strict';
const { sanitizeEntity } = require('strapi-utils')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async auth(ctx) {
    const { cnpj, senha } = ctx.request.body

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
    // Alterar schema graphql

    const token = ctx.headers['x-access-token'];

    if (!token) {
      return ctx.send({ err: 'Token Não Enviado!' }, 401)
    }

    try {
      const decoded = jwt.verify(token, process.env.CLIENT_SECRET)

      if (decoded && decoded.id) {
        const entity = await strapi.services.clientes.findOne({ id: decoded.id });
        return sanitizeEntity(entity, { model: strapi.models.clientes });
      }
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        return ctx.send({ err: 'Token Inválido!' }, 401)
      }

      if (err.name === 'TokenExpiredError') {
        return ctx.send({ err: 'Token Expirado! Faça login novamente.' }, 401)
      }

      return ctx.send({ err: 'Erro Interno do Servidor' }, 500)
    }
  }
};
