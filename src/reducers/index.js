import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import profileEmail from './profile_email';
import profileName from './profile_name';
import fetch_user_information from './fetch_user_information';

import set_username from './set_username';
import store_login_info from './store_login_info';



const rootReducer = combineReducers({
  form,
  set_username,
  store_login_info,
  auth: authReducer,
  profile_email: profileEmail,
  profile_name: profileName

 

});

export default rootReducer;


