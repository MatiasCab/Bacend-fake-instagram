
import { Storage } from '@google-cloud/storage'; 
import dotenv from "dotenv";

dotenv.config();

const storage = new Storage({
    keyFilename: "service-account.json",
    projectId: process.env.GC_STORAGE
});

const imageBucket = storage.bucket('example-images-test'); //esto va en el .env

async function getIMageTestBucket() {
    const [url] = await imageBucket
        .file("a-peek-from-space.png")
        .getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + 1 * 60 * 1000
        });
    return url;
};

function getBucket(){
    return imageBucket;
};

export {
    getIMageTestBucket,
    getBucket
};