import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FolderIcon from '@mui/icons-material/Folder';
import { Link } from "react-router-dom";
import { Container } from '@mui/material';
import logo from '../../images/logoNew.png'
import Search from './Search';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';

function Header(props) {
  const navigate = useNavigate();
  const loginState = useSelector(state => state.loginSlice)

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
          <Search />
          {/* <IconButton sx={{ mr: 1 }} component={Link} to="/search"><SearchIcon fontSize="small" /></IconButton> */}
          <IconButton sx={{ mr: 1 }} component={Link} to="/list"><FolderIcon fontSize="small" /></IconButton>
          <IconButton sx={{ mr: 1 }} component={Link} to="/favorite"><FavoriteIcon fontSize="small" /></IconButton>

          {loginState.username ?
           <Avatar alt="R" src="../../images/google.png" />
          : 
          <IconButton sx={{ mr: 1 }} component={Link} to="/member/login"><AccountCircleIcon fontSize="medium" /></IconButton> }
        </div>
      </Toolbar>

      <nav id='navbar' className="flex">
          <div className="w-4/5" >
              <ul className="flex p-4 text-gray-700 font-medium">
                <li className="px-4"> <Link to={'/'}>추천 웹툰</Link> </li>
                <li className="px-4"> <Link to={'/today'}>오늘의 웹툰</Link> </li>
                <li className="px-4"> <Link to={'/genre'}>장르</Link> </li>
                <li className="px-4"> <Link to={'/rank'}>랭킹</Link> </li>
                <li className="px-4"> <Link to={'/platform'}>플랫폼</Link> </li>
               
              </ul>
          </div>
      </nav>
    </Container>
  );

}

export default Header;