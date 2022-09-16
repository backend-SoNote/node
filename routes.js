const authController = require("./api/controllers/authController");

module.exports = (app) => {
  app.route("/auth/signup").post(authController.signup);
  app.route("/auth/signin").post(authController.signin);
    
  // app
  //   .route("/user/:userId")
  //   .get(userController.read_a_user)
  //   .put(userController.update_a_user)
  //   .delete(userController.delete_a_user);
};
