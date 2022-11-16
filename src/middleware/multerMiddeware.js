//este middleware accede al request del cliente y le agrega un campo file que seria el archivo enviado, es como  un paso intermedio entre la request y el response.

import MULTER, { memoryStorage } from 'multer';

const FILE_NAME_POST = 'postImg';

const imageFileFilter = (_req, file, cb) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

//storage es donde se va a guardar el archivo, y memorystorage engine stores the files in memory as Buffer objects.
const multer = MULTER({
    storage: memoryStorage(), //aca se dice que el archivo se guarde en memoria como un buffer.
    //fileFilter: imageFileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024
    }
}).single(FILE_NAME_POST); //toma solo un archivo con el nombre indicado (si hubiera mas tomaria solo uno).

const processFile = (req, res, next) => {
    multer(req, res, () => { //multer procesa la request y le aplica los cambios pertinentes si ta tood bien.
        console.log('Hhhshshhd');
        if (!req.file) { 
            console.log('No entro');
            return res.status(400).send({ error: true, message: `Not file detected. Be sure that the name of the file is ${FILE_NAME_POST}`}); //si no hay ningun archivo con el nombre indicado devuelve mensaje de error.
        }
        next(); //que siga procesando la request
    });
};

export {processFile};