const express = require("express");
const route = express.Router();
const controller = require("../controller/controller");
const services = require("../services/render");

/**
 * @description Root Route
 * @method GET/
 */
route.get("/", services.home_route);
/**
 * @description login Route
 * @method GET/
 */
route.get("/login", services.home_route);

/**
 * @description forgot Route
 * @method GET/
 */
route.get("/update", services.forgot_route);

/**
 * @description for register user
 * @method POST/ register
 */
route.post("/register", controller.register);

/**
 * @description for login user
 * @method POST/ login
 */
route.post("/login", controller.login);

/**
 * @description for forgot password
 * @method POST/ forgot
 */
route.post("/update", controller.update);

module.exports = route;