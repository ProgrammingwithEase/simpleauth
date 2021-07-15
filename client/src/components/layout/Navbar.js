import React from 'react'
import {Link} from 'react-router-dom';
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';
import { Fragment } from 'react';

export const Navbar = ({auth:{isAuthenticated,loading},logout}) => {
  
const authLinks = (

  <ul>
<li>
        <Link to='/profile'>Profile</Link>
        <i class="fas fa-user"></i>{''}
        
        </li>
  <li>


      <a onClick={logout} href='#!'>
        <i class="fas fa-sign-out-alt"></i>{''}
       <span className='hide-sm'>Logout</span> 
        
        </a>
      </li>
 
</ul>


  );
   
  const guestLinks = (
    <ul>
    <li>
        <Link to='/profile'>Profile</Link>
        </li>
    <li>
        <Link to='/login'>Login</Link>
        
        </li>
    <li>
        <Link to='/register'>Register</Link>
        </li>
  </ul>
  );
  return (



        <nav className="main-menu">

<div className="logo">
 
 </div>
        {!loading&& (<Fragment>{isAuthenticated?authLinks:guestLinks}</Fragment>)}
       
      </nav> 
    )
}



Navbar.propTypes ={
logout:PropTypes.func.isRequired,
auth:PropTypes.object.isRequired,
}

const mapStateProps = state =>({

  auth:state.auth
});
export default connect(mapStateProps,{logout})(Navbar);
