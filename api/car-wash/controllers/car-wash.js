"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const slugify = require("slugify");

module.exports = {
  getVoivodeships: async (ctx) => {
    const voivodeships = await strapi
      .query("car-wash")
      .model.query((qb) => {
        qb.select("voivodeship_slug AS slug")
          .distinct("voivodeship AS name")
          .orderBy("slug", "ASC");
      })
      .fetchAll();

    ctx.send(voivodeships);
  },

  getCitiesByTypeAndVoivodeship: async (ctx) => {
    const { voivodeship, type } = ctx.params;

    //TODO: make it dynamic
    let typeId = type === "autospa" ? 2 : 1;

    const cities = await strapi
      .query("car-wash")
      .model.query((qb) => {
        qb.select("city_slug AS slug")
          .distinct("city AS name")
          .where("voivodeship_slug", voivodeship)
          .andWhere("car_wash_type", typeId)
          .orderBy("slug", "ASC");
      })
      .fetchAll();

    ctx.send(cities);
  },

  // rebuildSlugs: async (ctx) => {
  //   const query = {
  //     _limit: 5000,
  //   };
  //   const entity = await strapi.services["car-wash"].find(query);

  //   entity.forEach((item) => {
  //     if (item.name) {
  //       const stringToSlug = item.name + "-" + item.full_address;
  //       const newSlug = slugify(stringToSlug).toLowerCase();
  //       const id = item.id;
  //       // strapi.query("car-wash").update({ id }, { slug: newSlug });
  //     }
  //   });

  //   ctx.send(entity);
  // },
};
