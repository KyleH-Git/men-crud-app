const express = require("express");
const router = express.Router();
const Post = require('../models/post.js');
const account = require("../models/account.js");



const newPost = async( req, res) => {

};

router.get('/new', async(req, res) =>{
    if(!req.session.user){
        res.redirect('/auth/profile')
    } else {
        res.render('newpost.ejs', {
            accountInfo: req.session.user
        })
    }

    
});

router.get('/home', async(req, res) => {
    const posts = await Post.find().populate('author', 'id').exec();
    
    res.render('index.ejs', {
        posts: posts,
        accountInfo: req.session.user
    });
});

router.post('/new-gleet', async (req, res) => {
    console.log(req.body)
    await Post.create({content: req.body.content, author: req.body._id});
    res.redirect('/post/home')
});

const show = async( req, res) => {

};

const edit = async( req, res) => {

};

const update = async( req, res) => {

};

router.delete('/:postId', async (req, res) => {
    await Post.findByIdAndDelete(req.params.postId)
    res.redirect('/auth/profile')
});

const destroy = async( req, res) => {

};

module.exports = router;
