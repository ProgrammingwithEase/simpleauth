const express = require ('express');
const router = express.Router();
const {check , validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
//@route post api/auth
//@desc authentictaion user & login
//@acess public
router.get('/',auth,async (req,res)=>{

try{

const user = await User.findById(req.user.id).select('-password');
res.json(user);


}
 
catch(err){

console.log(err.message);
res.status(500).send('Server Error 1');
}

});



// copy code 


router.post('/',[
    
   
check('email','email is Required').isEmail(),
check('password','password is Required ').exists()


],



async (req,res)=>{
    
    
   const errors= validationResult(req);


   if(!errors.isEmpty()){


    return res.status(400).json({errors:errors.array()});
   }

   const {email,password}= req.body;



try {

     // see if user exits


    let user =await User.findOne({email});


    if(!user){
return res
.status(400)
.json({errors: [{ msg:'invalid credential'}]});

    }

const isMatch = await bcrypt.compare(password,user.password);


if(!isMatch){

   return  res
   .status(400)
   .json({errors: [{ msg:'invalid credential'}]});
}
 

 
const payload = {
user:{

    id:  await user.id
}


}

jwt.sign(payload,
    config.get('mysecret'),
    {expiresIn:360000,},(errors,token)=>{
if(errors) throw errors;
res.json({token});
    }
    
    );



   // Return jsonwebtoken


   

  // res.send('User Registerd');
}


catch (err){

console.error(err.message);
res.status(500).send('Server error');

}
  

  




});






module.exports =    router; 
