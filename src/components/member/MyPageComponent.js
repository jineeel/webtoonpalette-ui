import { useDispatch } from "react-redux";
import { logout } from "../../slice/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { persistor } from "../..";
import { resetMemberInfo } from '../../slice/memberSlice';

function MyPageComponent(props) {

    const {  moveToPath, isLogin, moveToLoginReturn, doLogout } = useCustomLogin()
    const dispatch = useDispatch()
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
            <Typography variant="h5" sx={{mt:10, mb:10}}>마이페이지</Typography>
            <Link to={'/member/modify'}>회원 정보 수정</Link>
            <Link>내 서재</Link>
            <Link>좋아요 작품</Link>
            <Link>내가 쓴 댓글</Link>
            <Button onClick={handleClickLogout}>로그아웃</Button>
            
        </div>
    );
}

export default MyPageComponent;