import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useCustomLogin from '../../hooks/useCustomLogin';
import { login } from '../../slice/loginSlice';
import { getMember } from '../../api/memberApi';
import { setMemberInfo } from '../../slice/memberSlice';

function RedirectPage(props) {

    const [searchParams] = useSearchParams()
    // const memberInfo = useSelector(state => state.memberSlice)

    const navigate = useNavigate()
    const id = searchParams.get("id")
    const dispatch = useDispatch()

    useEffect(() => {
        if (id) {
            getMember(id).then(memberInfo => {

                dispatch(login(memberInfo));
                dispatch(setMemberInfo(memberInfo));
                navigate('/');

            })
            // if (localStorage.getItem("redirect") === "detail") {
            //     navigate(-1);
            // } else {
            //     navigate('/');
            // }
        }
    }, [id])

    // useEffect(()=>{
       
    // },[memberInfo])
    
    return (
        <div></div>
    );
}

export default RedirectPage;