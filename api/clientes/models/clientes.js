'use strict';
const bcrypt = require('bcryptjs')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      data.senha = await bcrypt.hash(data.senha, 8);
    },
    async beforeUpdate(params, data) {
      if (data.senha) {
        data.senha = await bcrypt.hash(data.senha, 8);
      }
    },
  }
};
