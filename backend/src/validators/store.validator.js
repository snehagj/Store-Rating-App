const Joi = require('joi');

const storeCreate = Joi.object({
  name: Joi.string().min(3).max(150).required(),
  email: Joi.string().email().allow('', null),
  address: Joi.string().max(400).allow('', null),
  ownerId: Joi.number().integer().optional()
});

module.exports = { storeCreate };
