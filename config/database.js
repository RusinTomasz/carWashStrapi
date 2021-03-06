module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "mysql",
        host: env("DATABASE_HOST", env("DB_HOST")),
        port: env.int("DATABASE_PORT", 3306),
        database: env("DATABASE_NAME", env("DB_NAME")),
        username: env("DATABASE_USERNAME", env("DB_USERNAME")),
        password: env("DATABASE_PASSWORD", env("DB_PASS")),
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
