const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

// Get all ideas
router.get('/', async (req, res) => {
    try {
        const ideas = await Idea.find();

        return res.status(200)
            .json({ success: true, data: ideas });
    } catch (err) {
        console.error(err);
        res.status(500)
            .json({ success: false, error: 'Server error' });
    }
});

// Get single idea by id
router.get('/:id', async (req, res) => {

    try {
        const idea = await Idea.findById(req.params.id);
        res.json({ success: true, data: idea });
    } catch (err) {
        console.error(err);
        res.status(500)
            .json({ success: false, error: 'Server error' });
    }

});

// Add a new idea
router.post('/', async (req, res) => {
    const idea = new Idea({
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username
    });

    try {
        const savedIdea = await idea.save();

        return res.status(201)
            .json({ success: true, data: savedIdea });
    } catch (err) {
        console.error(err);
        res.status(500)
            .json({ success: false, error: 'Server error' });
    }
});

// Update an idea
router.put('/:id', async (req, res) => {
    try {
        const updatedIdea = await Idea.findByIdAndUpdate(req.params.id, {
            $set: {
                text: req.body.text,
                tag: req.body.tag
            }
        },
            { new: true }
        );
        res.json({ success: true, data: updatedIdea });
    } catch (err) {
        console.error(err);
        res.status(500)
            .json({ success: false, error: 'Server error' });
    }
});

// Delete an idea
router.delete('/:id', async (req, res) => {
    try {
        await Idea.findByIdAndRemove(req.params.id);
        res.json({ success: true, data: {} });
    } catch (err) {
        console.error(err);
        res.status(500)
            .json({ success: false, error: 'Server error' });
    }
});

module.exports = router;