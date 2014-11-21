var Joi = require('joi');

module.exports = [
   { method: 'GET', path: '/hello', handler: getHello },
   { method: 'GET', path: '/products', handler: getProducts },
   { method: 'GET', path: '/products/{id}', handler: getProduct,
      config: {
         validate: {
            params: {
               id: Joi.number()
                .required()
            }
         }
      }
   },
   { method: 'POST', path: '/products', handler: addProduct,
      config: {
         validate: {
            payload: { limit: Joi.number().integer() }
         }
      }
   }
];

var products = [
   {
      id: 1,
      name: 'Guitar'
   },
   {
      id: 2,
      name: 'Banjo'
   },
   {
      id: 3,
      name: 'Ukelele'
   }
];

function getHello(request, reply) {
   reply('hello world');
}

function getProducts(request, reply) {

   if (request.query.name) {
      reply(findProducts(request.query.name));
   }
   else {
      reply(products);
   }
}

function findProducts(name) {

   return products.filter(function(product) {
      return product.name.toLowerCase() === name.toLowerCase();
   });
}

function getProduct(request, reply) {

   var product = products.filter(function(p) {
      return p.id === request.params.id;
   }).pop();

   reply(product);
}

function addProduct(request, reply) {

   var product = {
      id: products[products.length - 1].id + 1,
      name: request.payload.name
   };

   products.push(product);

   reply(product).code(201).header('Location', '/products/' + product.id);
}