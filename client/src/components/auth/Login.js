import React,{ Fragment ,useState } from 'react'
//import axios from 'axios';
import {Link,Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types'

import {login } from '../../actions/auth';
 const Login = ({login,Authenticated,tokens}) => {
  
  const [formData,setFromData] =useState({


email:'',
password:''


  });


  const {email,password} = formData;
const onChange = async e=>
setFromData({...formData,[e.target.name]:e.target.value});

const onSubmit = e=>{
e.preventDefault();

login(email,password);

  };


  console.log(tokens);
  console.log(Authenticated);
  
  if(Authenticated){
    return <Redirect to="/profile"/>
  }


    return ( <Fragment>
 <h1 className="large text-primary text-center blocks">Sign in</h1>
  
      <form className="common_form" onSubmit={e=>onSubmit(e)}>
   
       
 
    
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e=>onChange(e)}  />

      
          <input type="password" placeholder="Password"   name="password"  value={password}   onChange={e=>onChange(e)} />
       
        
        

     

  
        <button className="btnnew">Login</button>


      </form>

      <p className="my-1 text-center mform-extra m5">
        Create  an account? <Link to="/register">Sign Up</Link>
      </p>


    </Fragment>
);

};

Login.propTypes={
  login:PropTypes.func.isRequired,
  Authenticated:PropTypes.bool,
  tokens:PropTypes.string
}
 
const mapStateToProps = state =>({
  Authenticated:state.auth.isAuthenticated,
 tokens:state.auth.token
});

export default  connect(mapStateToProps,{login})(Login);
