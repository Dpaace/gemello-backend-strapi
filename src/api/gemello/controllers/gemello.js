// 'use strict';

// /**
//  * gemello controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::gemello.gemello');


// 'use strict';

// /**
//  * gemello controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::gemello.gemello', ({ strapi }) => ({
//     async create(ctx) {
//         const { user } = ctx.state; // Get the logged-in user

//         // Check if user is authenticated
//         if (!user) {
//             return ctx.unauthorized('You must be logged in to create a Gemello.');
//         }

//         // Prepare the data for the creation
//         const { title, assetbundle } = ctx.request.body;

//         const gemelloData = {
//             title,
//             assetbundle,
//             owner: user.id,
//         };

//         // Create the Gemello
//         const gemello = await strapi.service('api::gemello.gemello').create({ data: gemelloData });

//         return gemello;
//     },
// }));



'use strict';

/**
 * gemello controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::gemello.gemello', ({ strapi }) => ({
    async create(ctx) {
        const { user } = ctx.state; // Get the logged-in user

        // Check if user is authenticated
        if (!user) {
            return ctx.unauthorized('You must be logged in to create a Gemello.');
        }

        console.log('Request Body:', ctx.request.body);

        // Handle file upload and other form fields
        const { title } = ctx.request.body;
        const { files } = ctx.request;

        if (!title || !files || !files.assetbundle) {
            return ctx.badRequest('Title and assetbundle are required.');
        }

        // Upload the assetbundle file
        const uploadedFiles = await strapi.plugins.upload.services.upload.upload({
            data: {},
            files: files.assetbundle,
        });

        // Prepare the data for the creation
        const gemelloData = {
            title,
            assetbundle: uploadedFiles[0].id, // Get the ID of the uploaded file
            owner: user.id,
        };

        // Create the Gemello
        const gemello = await strapi.service('api::gemello.gemello').create({ data: gemelloData });

        return gemello;
    },
    async findCustom(ctx) {
        return "Haha Changed"
    },
    async find(ctx) {
        const { user } = ctx.state;

        if (!user) {
            return ctx.unauthorized('You must be logged in to view your Gemellos.');
        }

        const gemellos = await strapi.entityService.findMany('api::gemello.gemello', {
            filters: { owner: user.id },
            populate: '*',
        });

        return gemellos;
    }
}));



