import React, { useState } from 'react';
import 'styles/login/Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const[email, setEmail]=useState('');
  const[password, setPassword]=useState('');
  const[confirmPassword, setConfirmPassword]=useState('');
  const[phoneNumber, setPhoneNumber]=useState('');
  const[code, setCode]=useState('');
  const[role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (code === 'XJ7dH9kL3tZ2') {
      setRole('admin');
    } else {
      setRole('user');
    }

    console.log(code);
    console.log(`Registered as: ${role}`);
    navigate('/login');
  };

  return (
    <div className="register_container">
      <div className='email_text'>Email</div>
      <div style={{height:8}}></div>
      <input className='confirm_email' type='text' placeholder='admin@naver.com' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
      <div style={{height:24}}></div>
      <div className='password_text'>Password</div>
      <div style={{height:8}}></div>
      <input className='confirm_password' type='text' placeholder='value' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
      <div style={{height:24}}></div>
      <div className='confirmPassword_text'>Confirm Password</div>
      <div style={{height:8}}></div>
      <input className='confirm_confirmPassword' type='text' placeholder='value' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></input>
      <div style={{height:24}}></div>
      <div className='phoneNumber_text'>전화번호</div>
      <div style={{height:8}}></div>
      <input className='confirm_phoneNumber' type='text' placeholder='010-3252-3131' value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}></input>
      <div style={{height:24}}></div>
      <div className='code_text'>초대 코드</div>
      <div style={{height:8}}></div>
      <input className='confirm_code' type='text' placeholder='value' value={code} onChange={(e)=>setCode(e.target.value)}></input>
      <div style={{height:24}}></div>

      <button className='register_button' onClick={handleRegister}>Register</button>
      <div style={{height:24}}></div>

      <div className='api_login'>
        <button><img src='/naver.png'></img></button>
        <button><img src='/google.png'></img></button>
        <button><img src='/kakao.png'></img></button>
      </div>

    </div>
  );
}

export default Register;
