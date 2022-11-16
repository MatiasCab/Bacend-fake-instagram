import { getBucket } from "../config/connStorage.js";
import { ImageModel } from "../models/imageScheme.js";
import mongoose from "mongoose";

const uploadedImage = (req, res) => {
    let file = req.file; //se obtiene el objeto file puesto por multer
    let fileName = file.originalname
    let username = req.params.username

    const blob = getBucket()
        .file(fileName)
        .save(file.buffer, async (err) => {
            if (!err) {
                const [url] = await getBucket()
                    .file(fileName)
                    .getSignedUrl({
                        version: 'v4',
                        action: 'read',
                        expires: Date.now() + 20 * 60 * 1000
                    });
                const imageTst = new ImageModel({
                    _id: new mongoose.Types.ObjectId(),
                    url: url,
                    description: fileName,
                    ownerUsername: username
                })
                let newImage = await imageTst.save();
                console.log(newImage);
                res.status(201).send({ succes: true, message: "Image uploaded!" });
            } else {
                res.status(500).send({ error: true, message: "Image can not be uploaded :(" });
            }
        });

    // const blobStream = blob.createWriteStream({
    //     metadata: {
    //         contentType: file.mimetype
    //     }
    // });

    // blobStream.on('finish', () => {
    //     res.status(201).send({succes: true, message: "Image uploaded"});
    // }); 

    // blobStream.end(file.buffer); //file. buffer contiene un buffer con el archivo entero
};

export const getAllImages = (req, res) => {
    let limit = 1;
    let startIndex = req.query.startIndex ? Number(req.query.startIndex) : 0;

    if (req.query.searchInfo) {
        ImageModel.find({ description: { $regex: req.query.searchInfo } }, {}, { skip: startIndex, limit: limit },
            (err, result) => {
                if (err) {
                    res.status(500).send({message: 'Server error'});
                }

                let response = {
                    lastIndex: startIndex + limit,
                    images: result
                };

                res.status(200).send(response);
            });
    } else {
        ImageModel.find({}, {}, { skip: startIndex, limit: limit },
            (err, result) => {
                if (err) {
                    res.status(500).send({message: 'Server error'});
                }

                let response = {
                    lastIndex: startIndex + limit,
                    images: result
                };

                res.status(200).send(response);
            });
    };
};


export { uploadedImage };