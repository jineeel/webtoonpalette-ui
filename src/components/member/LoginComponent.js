import * as React from 'react';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import google from '../../images/google.png';
import naver from '../../images/naver.png';
import kakao from '../../images/kakao.png';
import { Link, useNavigate } from "react-router-dom";
import { getKakaoLoginLink } from '../../api/kakaoApi';
import { getNaverLoginLink } from '../../api/naverApi';

const kakaologin = getKakaoLoginLink()
const naverlogin = getNaverLoginLink()

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
          <Link to={kakaologin}><img src={google} alt="google" style={{ width: "50px", margin:10}} value="google"/></Link>
          <Link to={naverlogin}><img src={naver} alt="naver" style={{ width: "50px" , margin:10}} value="naver"/></Link>
          <Link to={kakaologin}><img src={kakao} alt="kakao" style={{ width: "50px" ,margin:10}} value="kakao"/></Link>
          </Box>
        </Box>

      </Container>

  );
}

export default LoginComponent;