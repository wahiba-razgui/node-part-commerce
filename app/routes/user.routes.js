const {authJwt} = require("../middlewares");
const userController = require("../controllers/user.controller");
const {verifySignUp} = require("../middlewares");
var router = require("express").Router();

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.get("/", [authJwt.verifyToken, authJwt.isManager || authJwt.isAdmin], userController.getAll);

    router.put('/',
        [
            authJwt.verifyToken, authJwt.isManager || authJwt.isAdmin,
            verifySignUp.checkDuplicateUsernameOrEmailOnUpdate,
            verifySignUp.checkRolesExisted
        ], userController.update);

    router.delete('/:id', [authJwt.verifyToken, authJwt.isManager || authJwt.isAdmin], userController.delete);

    app.use("/api/users", router);
};
