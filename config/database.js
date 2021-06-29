module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "mysql",
        host: env("DATABASE_HOST", "mysql52.mydevil.net"),
        port: env.int("DATABASE_PORT", 3306),
        database: env("DATABASE_NAME", "m1105_rankingm"),
        username: env("DATABASE_USERNAME", "m1105_rankingm"),
        password: env("DATABASE_PASSWORD", "Hr9cQNogKGvyCWIJboG5"),
        ssl: env.bool("DATABASE_SSL", false),
      },
      options: {},
    },
  },
});

// module.exports = ({ env }) => ({
//   defaultConnection: "default",
//   connections: {
//     default: {
//       connector: "bookshelf",
//       settings: {
//         client: "mysql",
//         host: env("DATABASE_HOST", "127.0.0.1"),
//         port: env.int("DATABASE_PORT", 3306),
//         database: env("DATABASE_NAME", "carwashstrapi"),
//         username: env("DATABASE_USERNAME", "root"),
//         password: env("DATABASE_PASSWORD", ""),
//         ssl: env.bool("DATABASE_SSL", false),
//       },
//       options: {},
//     },
//   },
// });
