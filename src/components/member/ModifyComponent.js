import React, { useEffect, useState, useRef } from 'react';
import { getMember, putMember } from '../../api/memberApi';
import { useDispatch, useSelector } from 'react-redux';
import profileIcon from '../../images/profile_icon.png'
import { API_SERVER_HOST } from '../../api/webtoonApi';
import memberSlice from './../../slice/memberSlice';
import { setMemberInfo } from '../../slice/memberSlice';
import { Typography } from '@mui/material';
import GenreSelectComponent from './GenreSelectComponent';

const host = API_SERVER_HOST

const initState = {
    username: '',
    nickname: '',
    uploadFileName: ''
}
function ModifyComponent({props}) {
    const loginInfo = useSelector(state => state.loginSlice)
    const memberInfo = useSelector(state => state.memberSlice)
    const dispatch = useDispatch()

    const [member, setMember] = useState(initState)
    const [imgFile, setImgFile] = useState(``);
    const [changeImage, setChangeImage] = useState(false)
    const [selectedGenre, setSelectedGenre] = useState([]);

    const uploadRef = useRef()

    useEffect(()=>{
        setMember({...memberInfo})
        setImgFile(`${host}/api/member/view/s_${memberInfo.uploadFileName}`)

    },[loginInfo, memberInfo])

    const handleChangeMember = (e) => {
        member[e.target.name] = e.target.value
        setMember({...member})
    }

    const handleClickModify = () => {
        const file = uploadRef.current.files[0]
        const formData = new FormData()

        if(file !== undefined ){
            console.log("file: "+file)
            formData.append("file", file)   
        }
        console.log("selectedGenre:"+selectedGenre)
        console.log("member.uploadFileName:"+member.uploadFileName)
        formData.append("uploadFileName", member.uploadFileName)
        formData.append("username", member.username)
        formData.append("nickname", member.nickname)
        formData.append("changeImage", changeImage)
        formData.append("genreNames", selectedGenre)

        putMember(loginInfo.id, formData).then(data => {
            alert("수정완료") //임시
            dispatch(setMemberInfo(data))
        })
    }

    const handleChangeImage = () => {
        const file = uploadRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
            setImgFile(reader.result);
        };
        setChangeImage(true)
    }

    const handleClickImageDelete = (e) => {
        member.uploadFileName = null
        uploadRef.current.value = ''
        setMember({...member})
        setImgFile('');
        setChangeImage(true)
    }
    const handleSelectedGenre = (genre) => {
        setSelectedGenre(genre);
    };
    return (
        <div className="flex flex-col items-center">
            회원수정
            <div>
            <img src={imgFile ? imgFile :  profileIcon} alt="프로필 이미지" className='size-40 rounded-full object-cover'/>
            <button onClick={handleClickImageDelete}>프로필 사진 삭제</button>
                <label htmlFor="uploadFileName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">프로필 사진</label>
                <input ref={uploadRef} onChange={handleChangeImage} accept="image/*" type={'file'} id="uploadFileName" name="uploadFileName" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
            </div>
            <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이메일</label>
                <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={member.username} readOnly />
            </div>
            <div>
                <label htmlFor="nickname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">닉네임</label>
                <input type="text" id="nickname" name="nickname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={member.nickname} onChange={handleChangeMember}/>
            </div>
            <div>
                <Typography variant='body1'>선호 장르 선택</Typography>
                <GenreSelectComponent selectedGenre={selectedGenre} onSelectedGenre={handleSelectedGenre} genreNames={member.genreNames}/>
            </div>
            <div>
                <button type="button"
                    className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                    onClick={handleClickModify}>
                    회원 정보 수정
                </button>
            </div>
        </div>
    );
}

export default ModifyComponent;