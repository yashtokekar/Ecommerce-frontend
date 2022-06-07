import React, { useState } from 'react';
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button,Spin } from 'antd';
import { GoogleOutlined, MailOutlined, LoadingOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export const Login = ({history}) => {
  const [email,setEmail] = useState("yash.tokekar@gmail.com");
  const [password,setPassword] = useState("Yash@123");
  const [loading,setLoading] = useState(false);

  let dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await auth.signInWithEmailAndPassword(email,password);
      
      const {user} = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });

      history.push('/');

    } catch(err){
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  }

  const googleLogin = async () => {
    auth.signInWithPopup(googleAuthProvider).then(async (result) => {
      const {user} = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });

      history.push('/');
    }).catch((err) => {
      console.log(err);
      toast.error(err.message);
    });
  };
  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: "white" }} spin />;
  const loginForm = () => (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input 
        type="email" 
        className='form-control' 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        autoFocus 
        placeholder='Your email' />
      </div>

      <div className="form-group">
        <input 
        type="password" 
        className='form-control' 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder='Password' />
      </div>
      
      <Button
        onClick = {onSubmit}
        type = "primary"
        className='mb-3'
        block
        shape = 'round'
        icon = {!loading ? <MailOutlined/> : "" }
        size = "large"
        disabled = {!email || password.length < 6}
      > 
        {!loading ? ("Login with Email/Password") : <Spin indicator={antIcon} />}
      </Button>
      
    </form>
  ) 

  return (

      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4>Login</h4>
            {loginForm()}
            <Button
              onClick = {googleLogin}
              type = "danger"
              className='mb-3'
              block
              shape = 'round'
              icon = {<GoogleOutlined/>}
              size = "large"
            >
        Login with Google
      </Button>
      <Link  to="/forgot/password" className="float-right text-danger">
        Forgot Password
      </Link>
          </div>
        </div>
      </div>
  )
};
