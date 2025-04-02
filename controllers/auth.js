const express = require("express");
const router = express.Router();
const Account = require("../models/account.js");
const Post = require('../models/post.js');
const bcrypt = require("bcrypt");

router.post('/sign-in', async(req, res) => {
    const accountExists = await Account.findOne({ accountName: req.body.accountName})
    if(!accountExists) {
        return res.redirect('/');
    }

    console.log(accountExists)
    const validPassword = bcrypt.compareSync(
        req.body.password,
        accountExists.password
    );
    
    console.log('afer pass check')
    if(!validPassword){
        return res.redirect('/');
    }

    req.session.user = {
        username: accountExists.accountName,
        _id: accountExists._id,
    }

    res.redirect('/');
});

router.post('/sign-up', async (req, res) => {
    const accountExists = await Account.findOne({ accountName: req.body.accountName});
    console.log(accountExists)
    if(accountExists){
        return res.redirect('/');
    }

    console.log('passwordcheck')
    if(req.body.password !== req.body.confirmPassword){
        return res.redirect('/');
    }

    console.log('hashing password')
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    try{
        const account = await Account.create(req.body);
        console.log('made user')
    
    
        req.session.user = {
            username: account.accountName,
            _id: account._id,
        }
        console.log('saved sessionid')
        res.redirect('/');
    } catch (err) {
        res.redirect('/');
    }
   
});

router.get('/sign-out', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.get('/profile', async(req, res) =>{
    const posts = await Post.find().populate('author', 'id').exec(); 
    res.render('profile.ejs', {
        posts: posts,
        accountInfo: req.session.user
    });
});

router.post('/profile-sign-up', async (req, res) => {
    const accountExists = await Account.findOne({ accountName: req.body.accountName});
    console.log(accountExists)
    if(accountExists){
        return res.redirect('/auth/profile');
    }

    console.log('passwordcheck')
    if(req.body.password !== req.body.confirmPassword){
        return res.redirect('/auth/profile');
    }

    console.log('hashing password')
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    try{
        const account = await Account.create(req.body);
        console.log('made user')
    
    
        req.session.user = {
            username: account.accountName,
            _id: account._id,
        }
        console.log('saved sessionid')
        res.redirect('/auth/profile');
    } catch (err) {
        res.redirect('/auth/profile');
    }
   
});

router.post('/profile-sign-in', async(req, res) => {
    const accountExists = await Account.findOne({ accountName: req.body.accountName})
    if(!accountExists) {
        return res.redirect('/auth/profile');
    }

    console.log(accountExists)
    const validPassword = bcrypt.compareSync(
        req.body.password,
        accountExists.password
    );
    
    console.log('afer pass check')
    if(!validPassword){
        return res.redirect('/auth/profile');
    }

    req.session.user = {
        username: accountExists.accountName,
        _id: accountExists._id,
    }

    res.redirect('/auth/profile');
});

module.exports = router;