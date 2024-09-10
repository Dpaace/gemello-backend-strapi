module.exports = [
  {
    name: "strapi::body",
    config: {
      formLimit: "1gb",
      jsonLimit: "1gb",
      textLimit: "1gb",
      formidable: {
        maxFileSize: 1024 * 1024 * 1024,
      },
    },
  },
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  // 'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
