import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import google from '../../images/google.png';
import naver from '../../images/naver.png';
import kakao from '../../images/kakao.png';
import { Link, useNavigate } from "react-router-dom";


function LoginComponent() {

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        email: data.get('email'),
        password: data.get('password'),
        });
    };

    const onNaverLogin = () => {
      window.location.href = "http://localhost:8080/oauth2/authorization/naver"
    }
    const onGoogleLogin = () => {
      window.location.href = "http://localhost:8080/oauth2/authorization/google"
    }
    const onKakaoLogin = () => {
      window.location.href = "http://localhost:8080/oauth2/authorization/kakao"
    }



  return (

      <Container component="main" maxWidth="xs">
    
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h6">
            로그인
          </Typography>
          <Typography variant="body1" sx={{ mt: 6}}>
            SNS 계정으로 로그인
          </Typography>
          <Box sx = {{ display:'flex', justifyContent: 'center', mt:5}}>
            <img src={google} alt="google" style={{ width: "50px", margin:10}} value="google"onClick={onGoogleLogin}/>
            <img src={naver} alt="naver" style={{ width: "50px" , margin:10}} value="naver" onClick={onNaverLogin}/>
            <img src={kakao} alt="kakao" style={{ width: "50px" ,margin:10}} value="kakao" onClick={onKakaoLogin}/>
          </Box>
        </Box>

      </Container>

  );
}

export default LoginComponent;