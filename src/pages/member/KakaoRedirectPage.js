import React, { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useCustomLogin from '../../hooks/useCustomLogin';
import { login } from '../../slice/loginSlice';
import { getAccessToken, getMemberWithAccessToken } from '../../api/kakaoApi';

function KakaoRedirectPage(props) {

    const [searchParams] = useSearchParams()
    const { moveToPath } = useCustomLogin()
    const authCode = searchParams.get("code")
    const dispatch = useDispatch()

    useEffect(() => {
        getAccessToken(authCode).then(accessToken => {

            getMemberWithAccessToken(accessToken).then(memberInfo => {
                console.log("-----------------------")
                console.log(memberInfo)
                dispatch(login(memberInfo))

                // if(memberInfo && memberInfo.social){ //memberInfo 값이 있고 소셜회원이면 회원수정 페이지로
                    // moveToPath("/member/modify")
                // }else{
                    moveToPath("/")
                // }
            })
           
        })
        }, [authCode])

    return (
        <div>
        
        </div>
    );
}

export default KakaoRedirectPage;