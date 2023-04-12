import express = require("express");
import {getObject, createObject} from "../controllers/renameController";

const router = express.Router();

router.route("/").get(getObject).post(createObject);

export default router;