import { mon } from "../config/connDB.js";

export const imageSchema = new mon.Schema({
    url:  {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ownerUsername: {        
        type: String,
        required: true}
    }, {
    versionKey: false
})

export const ImageModel = mon.model('images', imageSchema);