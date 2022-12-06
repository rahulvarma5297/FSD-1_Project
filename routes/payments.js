const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const pay = require('../schemas/payment');
const User = require('../schemas/user');


router.get('/views/payment', (req, res) => res.render('payment'));
router.get('/payment/:id',(req,res)=>{
    let username = req.params.id
    User.findOne({ username: username})
    .then(user=>{
        res.render('payment',{user})
    })

})
router.post('/payment/:id',(req, res) => {
    let username = req.params.id
    const num  = req.body.number;
    const hold = req.body.holder;
    const mon = req.body.expmon;
    const year = req.body.expyear;
    const cvv = req.body.cvv
    const newpe = new pay({
        number : num,
        name: hold,
        expmonth: mon,
        expyear: year,
        cvv: cvv        
    });
   
        //save user
        newpe.save().then(pay => {
            // router.get('/book/:id',(req,res)=>{
                // const username = req.params.id
                User.findOne({ username: username})
                .then(user=>{
                    res.render('index',{user})
                })
            
            // })
            // console.log(book);
            // res.redirect('/');
        })
    
})

module.exports = router;