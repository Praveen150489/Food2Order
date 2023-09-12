module.exports = app => {
    const restaurants = require("../controllers/restaurants.controller.js");
    const users = require("../controllers/users.controller.js");
    const carts = require("../controllers/carts.controller.js");
    const orders = require("../controllers/orders.controller.js");
  
    var restaurantRouter = require("express").Router();
    var userRouter = require("express").Router();
    var cartRouter = require("express").Router();
    var orderRouter = require("express").Router();
  
    // routing of restaurant
    restaurantRouter.get("/", restaurants.getRestaurant);
    restaurantRouter.post("/", restaurants.createRestaurant);
    restaurantRouter.put("/:id", restaurants.updateRestaurant);
    restaurantRouter.delete("/:id", restaurants.deleteRestaurant);
    restaurantRouter.get("/:id", restaurants.getRestaurantById);
    restaurantRouter.get("/restaurantsOwner/:id",restaurants.getOwnerRestaurants);
    app.use("/restaurants", restaurantRouter);

    // routing of users
    userRouter.get("/", users.getUsers);
    userRouter.post("/", users.createUser);
    userRouter.put("/:id", users.updateUser);
    userRouter.delete("/:id", users.deleteUser);
    userRouter.get("/:id", users.getUserById);
    app.use("/users", userRouter);

    // routing of carts
    cartRouter.get("/", carts.getCarts);
    cartRouter.post("/", carts.createCart);
    cartRouter.put("/:id", carts.updateCart);
    cartRouter.delete("/:id", carts.deleteCart);
    cartRouter.get("/:id", carts.getCartById);
    app.use("/carts", cartRouter);

    // routing of orders
    orderRouter.get("/", orders.getOrders);
    orderRouter.post("/", orders.createOrder);
    orderRouter.put("/:id", orders.updateOrder);
    orderRouter.delete("/:id", orders.deleteOrder);
    orderRouter.get("/:id", orders.getOrderById);
    app.use("/orders", orderRouter);
}