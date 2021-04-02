"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

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
};
