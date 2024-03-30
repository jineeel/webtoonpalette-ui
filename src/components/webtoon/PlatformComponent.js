import React, { useEffect, useState } from 'react';
import { getList } from '../../api/webtoonApi';
import useCustomMove from '../../hooks/useCustomMove';
import WebtoonListComponent from '../../common/WebtoonListComponent';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PageComponent from '../../common/PageComponent';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import useCustomValue from '../../hooks/useCustomValue';
import { useSelector } from 'react-redux';

const initState = {
    dtoList:[], pageNumList:[], pageRequestDTO: null, prev: false, next: false,
    totoalCount: 0, prevPage: 0, nextPage: 0, totalPage: 0, current: 0 }

const value = 'platform'

function PlatformComponent(props) {
    const tabValue = localStorage.getItem("tabValue") ? localStorage.getItem("tabValue") : 'naver';
    // const genreSelected = localStorage.getItem("genreSelected") ? localStorage.getItem("genreSelected") : "ALL" ;

    const {page, size, movePlatformList, refresh} = useCustomMove()
    const [serverData, setServerData] = useState(initState);
    const [platform, setPlatform] = useState(tabValue);
    const { fin, genre, checkFinished, selectGenre, selectList }= useCustomValue()
    const memberInfo = useSelector(state => state.memberSlice)
    const [favorite, setFavorite] = useState(false);
    
    const handleChange = (event, newValue) => {
        setPlatform(newValue);
        movePlatformList({ platform: newValue, genre:genre });
    };

    const handleSelectGenre = (e) => {
        selectGenre(e.target.value)
    };

    useEffect(() => {
        localStorage.setItem('isChecked', JSON.stringify(fin));
    }, [fin]);

    useEffect(() => {
        movePlatformList({ genre: genre, platform:platform});
        localStorage.setItem('genreSelected', genre);
    },[genre])
    
    useEffect(()=>{
        movePlatformList({ page: page, genre: genre, platform:platform});
        localStorage.setItem('tabValue',platform);
    },[platform])
    
    useEffect(()=>{
        window.scrollTo(0,0)
    },[page])

    useEffect(()=>{
        const memberId = memberInfo.id
        
        getList({page,size,platform,genre,fin,value,memberId}).then(data =>{
           
            setServerData(data)
        })
    }, [page,size,platform,refresh,genre,fin,favorite]);

    const changeFavoriteState = () =>{
        setFavorite(!favorite)
    }
    return (
        <div>

             <TabContext value={platform}>
                <TabList onChange={handleChange} centered className='mb-0 mt-0' indicatorColor='primary' textColor='primary'>
                    <Tab label="네이버" value="naver" />
                    <Tab label="카카오" value="kakao" />
                </TabList>
                
                <TabPanel value={platform}>
                <div className='flex flex-row justify-between w-full'>
                    <FormControlLabel
                        sx= {{ mb:1 , mt:-1}}
                        label={<Typography variant="button" color="dark">완결</Typography>}
                        control={<Checkbox checked={fin} onChange={checkFinished} size="small" color='secondary' />}
                    />
                    <select className="block w-40 p-2 mb-2 text-sm
                        text-gray-800 border border-gray-200 rounded-lg bg-gray-10 outline-0 dark:text-white" 
                            onChange={handleSelectGenre} value={genre}>
                            {selectList.map((item) => {
                                return <option value={item.value} key={item.value}>{item.name}</option>;
                            })}
                    </select>  
                </div>
                    <WebtoonListComponent serverData={serverData} changeFavoriteState={changeFavoriteState}/>
                </TabPanel>
            </TabContext>
            <PageComponent serverData={serverData} movePage={movePlatformList} value={genre} platform={platform} />
        </div>
    );
}

export default PlatformComponent;