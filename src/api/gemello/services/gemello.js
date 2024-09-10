'use strict';

/**
 * gemello service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::gemello.gemello');
