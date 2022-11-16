import { Router } from "express";
import { getAllImages, uploadedImage } from "../controllers/imageController.js";
import { processFile } from "../middleware/multerMiddeware.js";

const imageRouter = Router();

imageRouter.get('/', getAllImages);

imageRouter.post('/:username', processFile, uploadedImage);  //el coso de multer este tiene que estar en una carpeta middwalre algo asi para hacerlo bien

export default imageRouter;