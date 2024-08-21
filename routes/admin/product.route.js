const express = require("express");
const multer = require("multer");
const router = express.Router();
const controller = require("../../controller/admin/product.controller.js");
const storageMulter = require("../../helpers/storeMulter.js");
const upload = multer({ storage: storageMulter() });
const validate = require("../../validates/admin/product.validate.js");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.patch("/delete/:id", controller.delete);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  validate.create,
  controller.createPost
);



router.get("/edit/:id", controller.edit);


router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  validate.create,
  controller.editPatch
);



router.get("/detail/:id", controller.detail);


module.exports = router;
