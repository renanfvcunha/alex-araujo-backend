'use strict';
const { sanitizeEntity } = require('strapi-utils')
const jwt = require('jsonwebtoken')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async findByToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.CLIENT_SECRET)

      if (decoded && decoded.id) {
        const entity = await strapi.services.clientes.findOne({ id: decoded.id });
        return sanitizeEntity(entity, { model: strapi.models.clientes });
      }
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new Error('Token Inválido!')
      }

      if (err.name === 'TokenExpiredError') {
        throw new Error('Token Expirado! Faça login novamente.')
      }

      throw err
    }
  }
};
