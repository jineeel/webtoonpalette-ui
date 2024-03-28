import React, { useEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FolderIcon from '@mui/icons-material/Folder';
import { Link } from "react-router-dom";
import { Container } from '@mui/material';
import logo from '../../images/logoNew.png'
import SearchComponent from '../search/SearchComponent'
import { useSelector } from 'react-redux';
import { API_SERVER_HOST } from '../../api/webtoonApi';
import profileIcon from '../../images/profile_icon.png';
import PaletteIcon from '@mui/icons-material/Palette';

const host = API_SERVER_HOST

function Header(props) {
  const navigate = useNavigate();
  const loginState = useSelector(state => state.loginSlice)
  const memberInfo = useSelector(state => state.memberSlice)
  const [imgFile, setImgFile] = useState(``);

  useEffect(()=>{
    setImgFile(`${host}/api/member/view/s_${memberInfo.uploadFileName}`)
  }, [loginState, memberInfo])

  const handleClickMenu = () => {
    localStorage.removeItem('tabValue')
  }
  return (
    <Container pixed="true">
      <Toolbar
        sx={{
          justifyContent: "space-between",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{ width: "250px" }}
          onClick={() => {
            navigate("/");
          }}
        />

        <div className='flex'>
          <SearchComponent />
          <IconButton sx={{ mr: 1}} component={Link} to="/list"><PaletteIcon fontSize="small" /></IconButton>
          <IconButton sx={{ mr: 1 }} component={Link} to="/favorite"><FavoriteIcon fontSize="small" /></IconButton>

          {loginState.providerId ?
            <Link to={'/mypage'}><img src={ imgFile ? imgFile :  profileIcon} alt="" className='size-12 rounded-full object-cover'/></Link>
          : 
            <IconButton sx={{ mr: 1 }} component={Link} to="/member/login"><AccountCircleIcon fontSize="large" /></IconButton> }
        </div>
      </Toolbar>

      <nav id='navbar' className="flex">
          <div className="w-4/5" >
              <ul className="flex p-4 text-gray-700 font-medium">
                <li className="px-4"> <Link to={'/'}>추천 웹툰</Link> </li>
                <li className="px-4" onClick={handleClickMenu}> <Link to={'/today'}>오늘의 웹툰</Link> </li>
                <li className="px-4" onClick={handleClickMenu}> <Link to={'/genre'}>장르</Link> </li>
                <li className="px-4" onClick={handleClickMenu}> <Link to={'/rank'}>랭킹</Link> </li>
                <li className="px-4" onClick={handleClickMenu}> <Link to={'/platform'}>플랫폼</Link> </li>
                <li className="px-4"> <Link to={'/platform'}>추천 팔레트</Link> </li>
              </ul>
          </div>
      </nav>
    </Container>
  );

}

export default Header;