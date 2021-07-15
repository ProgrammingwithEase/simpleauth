
const express = require('express');
const {check , validationResult} = require('express-validator');
const gravatar = require('gravatar');
const User  = require('../../models/User');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
//const auth = require('../../middleware/auth');
/// initialize body parser middleware




router.post('/',[

    check('name','name is required').not().isEmpty(),
    check('email','email is required').isEmail(),
    check('password','enter password with at least 6 character long').isLength({min:6})


],async(req,res)=>{

const errors = validationResult(req);


if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
}

 



// see if user exits 

try {
    const {name,email,password}=req.body;

     let  user =  await User.findOne({email});

    if(user){
      return  res.status(400).json({errors:[{msg:'User Already Exits'}]});
    }


    const avatar = gravatar.url(email,{
        s:'200',
        r:'pg',
        d:'mm'
    })


     user = new User({
         name,
         email,
        avatar,
        password
     });


     // encrypt password



     const salt = await bcrypt.genSalt(12);
      user.password= await bcrypt.hash(password,salt);



      await user.save();

      const payload = {
          user:{
              id:user.id
          }
      }

      jwt.sign(
          payload,
          config.get('mysecret')
          ,
          {expiresIn:360000},
          (err,token)=>{
              if(err) throw err;
            return  res.json({token});
          }
          );


} catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
}






// Encrytp password


//  return jsonwebtoken 







 
});


// router.get('/me',auth,async(req,res)=>{
//  //   res.send('Authorized succesfull');
    
//     try {
            
//         const userinfo = await User.findOne({_id:req.user.id});
    
//         if(!userinfo){
//             return res.status(400).json({msg:'Sorry'});
//         }
//     return res.json(userinfo);
    
//     } catch (error) {
//         console.log(error.message);
//         return res.status(500).send('Server Error');
//     }

 

//     });
    


module.exports = router;
