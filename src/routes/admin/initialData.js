const express = require("express");
const { initialData } = require("../../controller/admin/initialdata");

const router = express.Router();



router.post("/initialdata",initialData);




module.exports = router;