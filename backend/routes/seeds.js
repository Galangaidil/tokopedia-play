const express = require('express');
const router = express.Router();
const Video = require('../models/video.model');
const Product = require('../models/product.model');
const Comment = require('../models/comment.model');
const {faker} = require('@faker-js/faker');

const youtubeEmbededVideosUrl = [
    "https://www.youtube.com/embed/q32mn4ls6Co",
    "https://www.youtube.com/embed/0jffk3JA1Bo",
    "https://www.youtube.com/embed/5hXoNuZUbNM",
    "https://www.youtube.com/embed/3_yxVjV88Zk",
    "https://www.youtube.com/embed/Ix09qfew6oA",
    "https://www.youtube.com/embed/jiUxHm9l1KY",
    "https://www.youtube.com/embed/Up5kkJ0hEU0",
    "https://www.youtube.com/embed/x3cANGNPyx0",
    "https://www.youtube.com/embed/zvWKqUiovAM",
    "https://www.youtube.com/embed/gAkwW2tuIqE",
    "https://www.youtube.com/embed/3nFbRd4FnRo",
    "https://www.youtube.com/embed/ms6ltwRC1sE",
    "https://www.youtube.com/embed/6UJnu25ji2A"
]

/* GET seeds data. */
router.get('/', async function (req, res) {
    const numVideos = 12; // You can adjust this to the desired number of videos

    try {
        const seedData = async () => {
            const videos = [];
            const products = [];
            const comments = [];

            const numProductsArr = [];
            const numCommentsArr = [];

            for (let i = 0; i < numVideos; i++) {
                const video = {
                    title: faker.lorem.sentence(),
                    thumbnail_url: faker.image.url(),
                    url: youtubeEmbededVideosUrl[(Math.floor(Math.random() * youtubeEmbededVideosUrl.length))],
                };
                videos.push(video);

                // Generate a random number of products between 5 and 10 for each video
                const numProducts = faker.number.int({min: 5, max: 10});
                numProductsArr.push(numProducts);
                for (let j = 0; j < numProducts; j++) {
                    const product = {
                        videoId: '', // We'll assign this later
                        title: faker.lorem.sentence(),
                        description: faker.lorem.paragraph(),
                        price: faker.commerce.price(),
                        link: faker.internet.url(),
                        photo: faker.image.url(),
                    };
                    products.push(product);
                }

                // Generate a random number of comments between 10 and 20 for each video
                const numComments = faker.number.int({min: 10, max: 20});
                numCommentsArr.push(numComments);
                for (let k = 0; k < numComments; k++) {
                    const comment = {
                        videoId: '', // We'll assign this later
                        username: faker.internet.userName(),
                        body: faker.lorem.paragraph(),
                    };
                    comments.push(comment);
                }
            }

            // Insert videos first to get their generated _id
            const insertedVideos = await Video.insertMany(videos);

            // Now update products and comments with the correct videoId
            let productIndex = 0;
            let commentIndex = 0;
            for (let i = 0; i < numVideos; i++) {
                const videoId = insertedVideos[i]._id;

                // Update products
                const numProducts = numProductsArr[i];
                for (let j = 0; j < numProducts; j++) {
                    products[productIndex].videoId = videoId;
                    productIndex++;
                }

                // Update comments
                const numComments = numCommentsArr[i];
                for (let k = 0; k < numComments; k++) {
                    comments[commentIndex].videoId = videoId;
                    commentIndex++;
                }
            }

            // Insert products and comments
            await Promise.all([
                Product.insertMany(products),
                Comment.insertMany(comments)
            ]);

            console.log("Seeding data successfully");
            return {message: "Seeding data successfully"};
        };

        seedData()
            .then((response) => res.status(200).json(response))
            .catch((err) => {
                console.error("Seeding error:", err);
                res.status(500).json({message: err.message});
            });
    } catch (err) {
        console.error("Unexpected error:", err);
        res.status(500).json({message: "Unexpected error"});
    }


});

/* DELETE seeds data. */
router.delete('/', async function (req, res) {
    try {
        await Video.deleteMany({});
        await Product.deleteMany({});
        await Comment.deleteMany({});

        res.status(200).json({message: "Deleting data successfully"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

module.exports = router;
