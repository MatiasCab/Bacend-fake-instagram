import { mon } from "../config/connDB.js";

export const userSchema = new mon.Schema({
    username: {
        type: String,
        required: true
    },
    _id:  {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    ubication: String,
    friends: [{
        type: mon.Schema.Types.ObjectId
    }],
    profileImage: String,
    images: [{
        type: mon.Schema.Types.ObjectId,
        ref: 'images'
    }]
}, {
    versionKey: false
})

export const UserModel = mon.model('users', userSchema);