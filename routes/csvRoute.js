const express = require("express");
const router = express.Router();
const multer = require("multer");
const csvRoute = require("../controller/csv")

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
})

const upload = multer({storage:storage})


router.route("/import").post(upload.single("csv"),csvRoute.csvImport)
router.route("/export").post(csvRoute.csvExport);


module.exports = router;