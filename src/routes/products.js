// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');


/****** MULTER Config */
const storage = multer.diskStorage({
    destination: ( req,  file,  cb ) =>{
        // direccion donde guardamos las imagenes
        const pathImage = path.join(__dirname, '..','..', 'public', 'images', 'products');

        cb(null, pathImage);
    },

    filename: (req,  file, cb) =>{
        // Declarando el nombre del archivo
        console.log(file)

        const fileNewName = 'img-' + Date.now() + path.extname(file.originalname);

        cb(null, fileNewName)
    }
})

const upload = multer({ storage });


/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***********   MULTER    *******/ 
router.get('/create/', productsController.create); 
// /products
router.post('/', upload.single('image') ,productsController.store); // crear un nuevo recurso


/*** GET ONE PRODUCT ***/ 
// /products/detail/:id
router.get('/detail/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
