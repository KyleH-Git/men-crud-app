const express = require("express");
const router = express.Router();
const Account = require("../models/account.js");
const Post = require('../models/post.js');
const bcrypt = require("bcrypt");

router.get('/sign-in', (req, res) => {
    res.render('sign-in.ejs', {
        accountInfo: req.session.user
    });
})

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
        username: accountExists.username,
        _id: accountExists._id,
        accountname: accountExists.accountName,
    }

    res.redirect('/');
});

router.get('/sign-up', (req, res) => {
    res.render('sign-up.ejs',{
        accountInfo: req.session.user
    });
})

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
        const account = await Account.create({
            accountName: req.body.accountName,
            password: hashedPassword,
            username: req.body.accountName});
        console.log('made user')
    
    
        req.session.user = {
            username: account.username,
            _id: account._id,
            accountname: account.accountName,
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
    const posts = await Post.find().populate('author').exec(); 
    res.render('profile.ejs', {
        posts: posts,
        accountInfo: req.session.user
    });
});

router.get('/:accountId/edit/username', (req, res) => {
    res.render('editusername.ejs', {
        accountInfo: req.session.user
    });
});

router.put('/:accountId/edit/username', async (req, res) => {
    const account = await Account.findByIdAndUpdate(req.params.accountId, {username: req.body.newUsername}, {new: true});
    console.log(account);
    req.session.user.username = account.username;
    res.redirect('/auth/profile');
});

router.get('/:accountId/edit/password', (req, res) => {
    res.render('editpassword.ejs', {
        accountInfo: req.session.user
    });
});

router.put('/:accountId/edit/password', async (req, res) => {
    if(req.body.newPassword !== req.body.confirmPassword){
        return res.redirect('/auth/profile');
    }
    const hashedPassword = bcrypt.hashSync(req.body.newPassword, 10);

    await Account.findByIdAndUpdate(req.params.accountId, {password: hashedPassword});
    res.redirect('/auth/profile');
});


module.exports = router;