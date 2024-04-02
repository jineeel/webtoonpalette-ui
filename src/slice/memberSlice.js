import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import CryptoJS from "crypto-js";
import createTransform from "redux-persist/lib/createTransform";

const initialState = { 
    id: '',
    username: '',
    nickname: '',
    uploadFileName: '',
    providerId : '' ,
    social: '',
    role: '',
    genreNames: []
}

const memberSlice = createSlice({
    name: 'memberSlice',
    initialState,
    reducers: {
        setMemberInfo: (state, action) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.nickname = action.payload.nickname;
            state.uploadFileName = action.payload.uploadFileName;
            state.providerId = action.payload.providerId;
            state.social = action.payload.social;
            state.role = action.payload.role;
            state.genreNames = action.payload.genreNames;
        },
        resetMemberInfo: (state) => {
            state.id = '';
            state.username = '';
            state.nickname = '';
            state.uploadFileName = '';
            state.providerId = '';
            state.social = '';
            state.role = '';
            state.genreNames = [];
        }   
    },
   
})

export const secretKey = process.env.REACT_APP_CRYPTO_SECRET_KEY;

const encryptor = createTransform(
    (inboundState, key) => {
      // 암호화
      return CryptoJS.AES.encrypt(JSON.stringify(inboundState), secretKey).toString();
    },
    (outboundState, key) => {
      // 복호화
      const bytes  = CryptoJS.AES.decrypt(outboundState, secretKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
  );
const persistConfig = {
    key: 'root',
    storage,
    transforms: [encryptor]
};

const persistedReducer = persistReducer(persistConfig, memberSlice.reducer);

export const { setMemberInfo, resetMemberInfo } = memberSlice.actions
export default persistedReducer