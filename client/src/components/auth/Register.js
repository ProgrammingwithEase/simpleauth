import React,{ Fragment ,useState } from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import {Link,Redirect} from 'react-router-dom';
import { setAlert  } from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types'


export const Register = ({setAlert,register,Authenticated}) => {
  const [formData,setFromData] =useState({

name:'',
email:'',
password:'',
password2:''

  });
 

  const {name,email,password,password2} = formData;
const onChange =  e=>setFromData({...formData,[e.target.name]:e.target.value});

const onSubmit = async e=>{
e.preventDefault();

if(password!==password2)
{
  setAlert('password do not match','danger');
}
else{

  register({name,email,password});

  const newUser = {
    name,
    email,
    password
  }
try {
  
  const config = {
    headers:{
      'Content-Type':'application/json'
    }
  }
    const body = JSON.stringify(newUser);

    const res = await axios.post('/api/users',body,config);
   
   
  

    console.log(res.data);


  
  
} catch (error) {
  
console.log(error.response.data); 
}

}

};




// if(!Authenticated){
//   return <Redirect to="/login"/>
// }

 
if(Authenticated){
  return <Redirect to="/profile"/>
}


return ( <Fragment>
   <h1 className="large text-primary text-center blocks">Sign Up</h1>
      <p className="lead text-center  blocks m5 "><i className="fas fa-user"></i> Create Your Account</p>

      <form className="common_form" onSubmit={e=>onSubmit(e)}>
   
        <input type="text" placeholder="Please Enter Your name" name="name" value={name} onChange={e=>onChange(e)}/>
      
 
    
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e=>onChange(e)}  />

      
          <input type="password" placeholder="Password"   name="password"  value={password}  onChange={e=>onChange(e)} />
       
          <input type="password" placeholder="Re Enter Password"  name="password2"   value={password2}   onChange={e=>onChange(e)}   />
        
        

     

  
        <button className="btnnew">Signup</button>


      </form>
      <p className="my-1 text-center mform-extra">
        Already have an account? <Link to="/Login">Sign In</Link>
      </p>

    </Fragment>
);

};

Register.propTypes = {
  setAlert:PropTypes.func.isRequired,
  register:PropTypes.func.isRequired,
  IsAuthenticated:PropTypes.bool
};
 
const mapStateToProps = state =>({
  auth:state.auth.IsAuthenticated,
  Authenticated:state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
{setAlert,register}

)(Register);
