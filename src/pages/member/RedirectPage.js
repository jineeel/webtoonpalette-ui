import React, { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useCustomLogin from '../../hooks/useCustomLogin';
import { login } from '../../slice/loginSlice';
import { getMember } from '../../api/memberApi';
import { setMemberInfo } from '../../slice/memberSlice';

function RedirectPage(props) {

    const [searchParams] = useSearchParams()
    const { moveToPath } = useCustomLogin()
    const id = searchParams.get("id")
    const dispatch = useDispatch()

    useEffect(() => {
        getMember(id).then(memberInfo => {
            dispatch(login(memberInfo))
            dispatch(setMemberInfo(memberInfo))
            moveToPath("/")
        })
      
        }, [id])

    return (
        <div></div>
    );
}

export default RedirectPage;