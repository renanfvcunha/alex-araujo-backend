'use strict';
const { sanitizeEntity } = require('strapi-utils')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async auth(cnpj, senha) {
    try {
      const entity = await strapi.services.clientes.findOne({ cnpj });
  
      if (!entity) {
        throw new Error('userOrPassMismatch')
      }

      const pass = await bcrypt.compare(senha, entity.senha)

      if (!pass) {
        throw new Error('userOrPassMismatch')
      }
  
      const token = jwt.sign({ id: entity.id }, process.env.CLIENT_SECRET, {
        expiresIn: '1d'
      })
    
      return { token, cliente: sanitizeEntity(entity, { model: strapi.models.clientes }) }
    } catch (err) {
      throw err
    }
  },
  async findByToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.CLIENT_SECRET)

      if (decoded && decoded.id) {
        const entity = await strapi.services.clientes.findOne({ id: decoded.id })
        return sanitizeEntity(entity, { model: strapi.models.clientes })
      }
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new Error('invalidToken')
      }

      if (err.name === 'TokenExpiredError') {
        throw new Error('expiredToken')
      }

      throw err
    }
  }
};
