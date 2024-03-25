import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

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
const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, memberSlice.reducer);

export const { setMemberInfo, resetMemberInfo } = memberSlice.actions
export default persistedReducer