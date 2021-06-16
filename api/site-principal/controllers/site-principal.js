'use strict';
const { sanitizeEntity } = require('strapi-utils')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */


module.exports = {
  async find(ctx) {
    const entity = await strapi.services['site-principal'].find();
    entity.quemSomos.textos.texto = entity.quemSomos.textos.texto.replace('src="/', `src="${strapi.config.get('server.url')}/`); // Here we modify the 'Content' and add your website "url" to it
    return sanitizeEntity(entity, { model: strapi.models['site-principal'] });
  },
};