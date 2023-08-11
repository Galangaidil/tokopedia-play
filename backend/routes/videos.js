const express = require('express');
const router = express.Router();
const Video = require('../models/video.model');
const Product = require('../models/product.model');
const Comment = require('../models/comment.model');

/* GET videos listing. */
router.get('/', async function (req, res) {
    try {
        const videos = await Video.find({}, "_id title thumbnail_url");
        res.status(200).json(videos);
    } catch (e) {
        res.status(500).json({message: e.message})
    }
});

/* GET video detail. */
router.get('/:id', async function (req, res) {
    try {
        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({message: 'Video not found'});
        }

        res.status(200).json(video);
    } catch (e) {
        res.status(500).json({message: e.message})
    }
});

/* GET products listing by video id. */
router.get('/:id/products', async function (req, res) {
    try {
        const products = await Product.find({videoId: req.params.id}, "-description");
        res.status(200).json(products);
    } catch (e) {
        res.status(500).json({message: e.message})
    }
});

/* GET comments listing by video id. */
router.get('/:id/comments', async function (req, res) {
    try {
        const comments = await Comment.find({videoId: req.params.id});
        res.status(200).json(comments);
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

/* POST comment. */
router.post('/:id/comments', async function (req, res) {
    try {
        const comment = new Comment({
            videoId: req.params.id,
            username: req.body.username,
            body: req.body.body
        });

        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (e) {
        res.status(422).json({message: e.message})
    }
});

module.exports = router;
