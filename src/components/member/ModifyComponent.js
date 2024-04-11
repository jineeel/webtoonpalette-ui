import React, { useEffect, useState, useRef } from "react";
import { getMember, putMember } from "../../api/memberApi";
import { useDispatch, useSelector } from "react-redux";
import profileIcon from "../../images/profile_icon.png";
import { API_SERVER_HOST } from "../../api/webtoonApi";
import memberSlice from "./../../slice/memberSlice";
import { setMemberInfo } from "../../slice/memberSlice";
import { Button, Typography } from "@mui/material";
import GenreSelectComponent from "./GenreSelectComponent";
import useCustomLogin from "../../hooks/useCustomLogin";
import ResultModalComponent from "../../common/ResultModalComponent";

const host = API_SERVER_HOST;

const initState = {
  username: "",
  nickname: "",
  uploadFileName: "",
};
function ModifyComponent({ props }) {
  const loginInfo = useSelector((state) => state.loginSlice);
  const memberInfo = useSelector((state) => state.memberSlice);
  const dispatch = useDispatch();

  const [member, setMember] = useState(initState);
  const [imgFile, setImgFile] = useState(``);
  const [changeImage, setChangeImage] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const { isLogin, moveToLoginReturn } = useCustomLogin();
  const [resultModal, setResultModal] = useState(false);
  const [openToggle, setOpenToggle] = useState(false);
  const uploadRef = useRef();

  useEffect(() => {
    setMember({ ...memberInfo });
    setImgFile(`${host}/api/member/view/${memberInfo.uploadFileName}`);
  }, [loginInfo, memberInfo]);

  if (!isLogin) {
    return moveToLoginReturn();
  }

  const handleChangeMember = (e) => {
    member[e.target.name] = e.target.value;
    setMember({ ...member });
  };

  const handleClickModify = () => {
    const file = uploadRef.current.files[0];
    const formData = new FormData();

    if (file !== undefined) {
      formData.append("file", file);
    }

    formData.append("uploadFileName", member.uploadFileName);
    formData.append("username", member.username);
    formData.append("nickname", member.nickname);
    formData.append("changeImage", changeImage);
    formData.append("genreNames", selectedGenre);

    putMember(loginInfo.id, formData).then((data) => {
      setResultModal(true);
      setOpenToggle(!openToggle);
      dispatch(setMemberInfo(data));
    });
  };

  const handleChangeImage = () => {
    const file = uploadRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      setImgFile(reader.result);
    };
    setChangeImage(true);
  };

  const handleClickImageDelete = (e) => {
    member.uploadFileName = null;
    uploadRef.current.value = "";
    setMember({ ...member });
    setImgFile("");
    setChangeImage(true);
  };
  const handleSelectedGenre = (genre) => {
    setSelectedGenre(genre);
  };
  return (
    <div className="flex flex-col items-center">
      {resultModal ? <ResultModalComponent openToggle={openToggle} /> : <></>}
      <Typography variant="h6" sx={{ mt: 6, mb: 4 }}>
        내 정보 수정
      </Typography>
      <div className="flex flex-col items-center">
        <label
          htmlFor="uploadFileName"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          프로필 사진
        </label>
        <img
          src={imgFile ? imgFile : profileIcon}
          alt="프로필 이미지"
          className="size-40 rounded-full object-cover"
        />
        <div className="mt-5 mb-5">
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mr: 1 }}
            onClick={() => uploadRef.current.click()}
          >
            사진 변경
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickImageDelete}
          >
            사진 삭제
          </Button>
          <input
            ref={uploadRef}
            onChange={handleChangeImage}
            accept="image/*"
            type={"file"}
            id="uploadFileName"
            name="uploadFileName"
            style={{ display: "none" }}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          이메일
        </label>
        <input
          type="text"
          id="username"
          className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={member.username}
          readOnly
        />
      </div>
      <div>
        <label
          htmlFor="nickname"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          닉네임
        </label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          className="mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          value={member.nickname}
          onChange={handleChangeMember}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="genre"
          className="ml-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          선호 장르 [3개 선택 가능]
        </label>
        <GenreSelectComponent
          name="genre"
          selectedGenre={selectedGenre}
          onSelectedGenre={handleSelectedGenre}
          genreNames={member.genreNames}
        />
      </div>

      <div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleClickModify}
        >
          회원 정보 수정
        </Button>
      </div>
    </div>
  );
}

export default ModifyComponent;
