import React ,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect }from 'react-redux';
import {getCurrentProfile} from '../../actions/profile'
//import {loadUser} from '../../actions/auth'
// import axios from 'axios';
const Dashboard =  ({getCurrentProfile,auth:{user},profile:{profile,loading}}) => {
    
    useEffect(() => {
        getCurrentProfile();
    } , [] );
          
  
    
    return  loading&& profile===null?<h1 className="text-center">Loading...</h1>:<Fragment>
        <div className="profilecontainer">
    
          <img src="https://img.icons8.com/office/120/000000/circled-user-male-skin-type-3.png"/>
          <h2>Welcome</h2>
           <p className="ptext mb6"  >{user&&user.name}</p>
           <h3 className="m6">Welcome To Simple Auth MernStack Application</h3>
           <div className="demoinfo">
           <span>Technology used to build this App: </span>
           <span>Node</span>
           <span>Express Framework</span>
           <span>MongoDB </span>
           <span>React</span>
           </div>
            </div>

    </Fragment>
      
    
};

Dashboard.propTypes = {
    getCurrentProfile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth:state.auth,
    profile:state.profile
});


export default connect(mapStateToProps,{getCurrentProfile}) (Dashboard);


