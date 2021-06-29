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

  sendBasicEmail: async (ctx) => {
    console.log(ctx.body);
    const body = ctx.request.body;
    const { formType, name, subject, email, message, regulations } = body;

    strapi.log.debug(`Trying to send an email`);

    try {
      const emailOptions = {
        to: "rankingmyjni@gmail.com",
        from: "rankingmyjni@gmail.com",
        subject: `${subject} - ${formType}`,
        html: `<h1>${subject}</h1><p>Wiadomość od ${name} o emailu: ${email}</p><br/>
        <h3>Przesłane informacje:</h3>
        <p>Imię i nazwisko: ${name}</p>
        <p>Temat: ${subject}</p>
        <p>Email: ${email}</p>
        <p>Wiadomość: ${message}</p>
        <p>Zgoda: ${regulations}</p>`,
      };

      await strapi.plugins["email"].services.email.send(emailOptions);

      strapi.log.debug(`Email sent`);

      ctx.send({ message: "Email sent" });
    } catch (err) {
      console.log(err);
      strapi.log.error(`Error sending email`, err);
      throw err;
    }

    try {
      const emailOptionsSecond = {
        to: email,
        from: "rankingmyjni@gmail.com",
        subject: subject,
        html: `<p>Dziękujemy za przesłanie informacji. Postaramy się zareagować najszybciej jak to możliwe.</p><br/>
        <h3>Przesłane informacje:</h3>
        <p>Imię i nazwisko: ${name}</p>
        <p>Temat: ${subject}</p>
        <p>Email: ${email}</p>
        <p>Wiadomość: ${message}</p>
        <p>Zgoda: ${regulations}</p>
        `,
      };
      strapi.log.debug(`Trying to send an email to ${email}`);
      await strapi.plugins["email"].services.email.send(emailOptionsSecond);
      strapi.log.debug(`Email sent to ${email}`);
    } catch (err) {
      strapi.log.error(`Error sending email to ${email}`, err);
      throw err;
    }
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
