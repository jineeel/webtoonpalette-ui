import React, { useEffect, useState } from 'react';
import { getList } from '../../api/webtoonApi';
import useCustomMove from '../../hooks/useCustomMove';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PageComponent from '../../common/PageComponent';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import WebtoonListComponent from '../../common/WebtoonListComponent';
import WebtoonSimpleComponent from '../../common/WebtoonSimpleComponent';
import {getFavoriteWebtoon} from '../../api/favoriteApi';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
import useCustomValue from '../../hooks/useCustomValue';
import useCustomLogin from '../../hooks/useCustomLogin';

const initState = {
    dtoList:[], pageNumList:[], pageRequestDTO: null, prev: false, next: false,
    totoalCount: 0, prevPage: 0, nextPage: 0, totalPage: 0, current: 0 }

function FavoriteComponent(props) {
    const [serverData, setServerData] = useState(initState);
    const [selectTab, setSelectTab] = useState('webtoon');
    const loginInfo = useSelector(state => state.loginSlice)
    const memberInfo = useSelector(state => state.memberSlice)
    const {  isLogin, moveToLogin} = useCustomLogin()
    const {page, size, moveToFavorite} = useCustomMove()
    const {genre, selectList, selectGenre } = useCustomValue()
    const [favorite, setFavorite] = useState(false);

    const memberId = loginInfo.id;

    const handleChange = (event, newValue) => {
        setSelectTab(newValue);
        // localStorage.setItem('tabValue',newValue);
        // movePlatformList({ platform: newValue, genre:genre });
    };
   
    useEffect(() => {
        localStorage.setItem('tabValue',selectTab);
    },[selectTab])

    useEffect(() => {
        moveToFavorite({genre:genre})
        localStorage.setItem('genreSelected', genre);
    },[genre])

    useEffect(() => {
        moveToFavorite({page:page, genre:genre})
    },[page])

    useEffect(()=>{
        if(!isLogin){
            return moveToLogin();
        }
        getFavoriteWebtoon({memberId,page,size,genre}).then(data =>{  
            setServerData(data)
        })
    },[selectTab, page, genre, favorite]) 

    const handleSelectGenre = (e) => {
        selectGenre(e.target.value)
    }

    const changeFavoriteState = () =>{
        setFavorite(!favorite)
    }

    return (
        <div>
            <span className='m-3 font-medium text text-neutral-800 flex flex-col items-center'>나의 좋아요 목록</span>
            <TabContext value={selectTab}>
                <TabList onChange={handleChange} centered className='mb-0 mt-0' indicatorColor='secondary' textColor='secondary'>
                    <Tab label="웹툰" value="webtoon" className='w-52'/>
                    <Tab label="팔레트" value="palette" className='w-52'/>
                </TabList>
                
                <TabPanel value="webtoon">
                        <select className="block w-40 p-2 mb-2 text-sm
                            text-gray-800 border border-gray-200 rounded-lg bg-gray-10 outline-0 dark:text-white" 
                            onChange={handleSelectGenre} value={genre}>
                            {selectList.map((item) => {
                                return <option value={item.value} key={item.value}>{item.name}</option>;
                            })}
                        </select>          

                        <div className='flex flex-row justify-between w-full mt-6'>
                                <WebtoonSimpleComponent serverData={serverData} changeFavoriteState={changeFavoriteState}/>
                        </div>
                </TabPanel>
                <TabPanel value="palette">
                        <div>
                            palette
                        </div>
                </TabPanel>
        </TabContext>
       <PageComponent serverData={serverData} movePage={moveToFavorite} value={genre}  />
   </div>
    );
}

export default FavoriteComponent;