module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('WEBSITE', 'http://127.0.0.1'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'a18f8c6dd39c84d403f4941019273bac'),
    },
  },
});
