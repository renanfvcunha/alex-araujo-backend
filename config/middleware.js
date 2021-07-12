module.exports = {
  settings: {
    cors: {
      enabled: true,
      origin: '*',
      headers: [
        'Content-Type',
        'Authorization',
        'X-Frame-Options',
        'X-Access-Token'
      ]
    },
  },
};
