"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */
const slugify = require("slugify");

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      if (data.name && data.full_address) {
        const stringToSlug = data.name + "-" + data.full_address;
        data.slug = slugify(stringToSlug).toLowerCase();
      }
    },
    beforeUpdate: async (params, data) => {
      if (data.name && data.full_addres) {
        const stringToSlug = data.name + "-" + data.full_address;
        data.slug = slugify(stringToSlug).toLowerCase();
      }
    },
  },
};
