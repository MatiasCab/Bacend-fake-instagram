import mongoose from "mongoose";
import { ImageModel } from "../models/imageScheme.js";
import { UserModel, userSchema } from "../models/userSchema.js";


export const createUser = (req, res) => {

    const imageTst = new ImageModel({
        _id: new mongoose.Types.ObjectId(),
        url: 'ososo',
        description: 'dmmdmdd'
    })

    imageTst.save();

    const testUser = new UserModel({
        _id: 'pistachin1dddddd10',
        username: 'pistachindddd1010',
        name: 'Pistacddddo',
        ubication: 'Piriapoddddddddlis, UY.',
        profileImage: 'https://storage.googleapis.com/example-images-test/454-scaled-880x872.jpg',
        images: [imageTst._id]
    });

    testUser.save(function (err, doc) {
        console.log(doc);
    });

    res.status(200).send({ message: "todo bien" });
};

export const getUsersPreview = (req, res) => {
    UserModel.find({}, {
        name: 1,
        username: 1,
        profileImage: 1,
        _id: 0,
    }).populate({
        path: 'images',
        select: {
            url: 1,
            description: 1,
            _id: 0
        }
    }).exec((err, result) => {
        if (err) throw err;
        res.send(result);
    });
};

export const getUserById = (req, res) => {
    UserModel.findOne({ username: req.params.username }, 'username name ubication -_id profileImage', (err, result) => {
        if (err) throw err;
        if (result.size == 0) {
            res.status(404).send({ message: `User ${username} dont exist` });
        } else {
            res.status(200).send(result);
        }
    })
};

