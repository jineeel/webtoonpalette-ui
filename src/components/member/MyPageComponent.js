import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slice/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { persistor } from "../..";
import { resetMemberInfo } from '../../slice/memberSlice';
import { useEffect, useState } from "react";
import { API_SERVER_HOST } from "../../api/webtoonApi";
import profileIcon from '../../images/profile_icon.png'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import PaletteIcon from '@mui/icons-material/Palette';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';

const host = API_SERVER_HOST

const initState = {
    username: '',
    nickname: '',
    uploadFileName: ''
}
function MyPageComponent(props) {

    const {  moveToPath, isLogin, moveToLoginReturn, doLogout } = useCustomLogin()
    const memberInfo = useSelector(state => state.memberSlice)
    const [member, setMember] = useState(initState)
    const [imgFile, setImgFile] = useState(``);

    const dispatch = useDispatch()

    useEffect(()=>{
        setMember({...memberInfo})
        setImgFile(`${host}/api/member/view/${memberInfo.uploadFileName}`)
    },[])

    if(!isLogin){
        return moveToLoginReturn()
    }

    const purge = async () => {
        await persistor.purge();
    }

    const handleClickLogout = () => {
        doLogout()
        purge()
        dispatch(resetMemberInfo())
        moveToPath("/")
    }

    return (
        <div className="flex flex-col items-center">
            <Typography variant="h6" sx={{mt:6, mb:4}}>마이페이지</Typography>
            <div>
                <img src={imgFile ? imgFile :  profileIcon} alt="프로필 이미지" className='size-40 rounded-full object-cover shadow-xl'/>
            </div>
            <span className="font-medium m-5">{member.nickname} 님</span>

            <List
                sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper', mb:5}}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton sx={{ borderBottom: 1, borderColor:'grey.100'}} component={Link} to="/member/modify">
                    <ListItemIcon>
                        <AutoFixNormalIcon />
                    </ListItemIcon>
                    내 정보
                </ListItemButton>

                <ListItemButton sx={{ borderBottom: 1, borderColor:'grey.100'}} component={Link} to="/">
                    <ListItemIcon>
                        <PaletteIcon />
                    </ListItemIcon>
                    나의 팔레트
                </ListItemButton>

                <ListItemButton sx={{ borderBottom: 1, borderColor:'grey.100'}} component={Link} to="/">
                    <ListItemIcon>
                        <FavoriteIcon />
                    </ListItemIcon>
                    좋아요 목록
                </ListItemButton>

                <ListItemButton sx={{ borderBottom: 1, borderColor:'grey.100'}} component={Link} to="/">
                    <ListItemIcon>
                        <CommentIcon />
                    </ListItemIcon>
                    내가 쓴 댓글
                </ListItemButton>

            </List>

            <Button variant="outlined" color="secondary" onClick={handleClickLogout} sx={{ fontSize:16}}>로그아웃</Button>
            
        </div>
    );
}

export default MyPageComponent;