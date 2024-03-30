import React, { useEffect, useState } from 'react';
import { getList, getListLogin } from '../../api/webtoonApi';
import useCustomMove from '../../hooks/useCustomMove';
import WebtoonListComponent from '../../common/WebtoonListComponent';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PageComponent from '../../common/PageComponent';
import { todayOfWeek } from '../../common/convertValue';
import useCustomLogin from '../../hooks/useCustomLogin';
import { useSelector } from 'react-redux';

const initState = {
    dtoList:[], pageNumList:[], pageRequestDTO: null, prev: false, next: false,
    totoalCount: 0, prevPage: 0, nextPage: 0, totalPage: 0, current: 0 }

const value = 'today'

function TodayComponent(props) {
    const tabValue = localStorage.getItem("tabValue") ? localStorage.getItem("tabValue") : todayOfWeek();

    const {page, size, moveTodayList, refresh} = useCustomMove()
    const [serverData, setServerData] = useState(initState);
    const [updateDay, setUpdateDay] = useState(tabValue);
    const memberInfo = useSelector(state => state.memberSlice)
    const [favorite, setFavorite] = useState(false);
    const fin = true;
  
    useEffect(() => {
        localStorage.setItem('tabValue',updateDay);
      }, [updateDay]);

    const handleChange = (event, newValue) => {
        setUpdateDay(newValue);
        moveTodayList({ updateDay: newValue });
        
    };

    useEffect(()=>{
        moveTodayList({ page:page, updateDay: updateDay });
    },[])
    
    //페이지가 변경되면 스크롤을 올린다.
    useEffect(()=>{
        window.scrollTo(0,0)
    },[page])

    useEffect(()=>{

        const memberId = memberInfo.id

        getList({page,size,updateDay,value,fin, memberId}).then(data =>{

            setServerData(data)
        })
        
    }, [page,size,updateDay,refresh,favorite]);

    const changeFavoriteState = () =>{
        setFavorite(!favorite)
    }
    return (
      <div> 
            <TabContext value={updateDay}>
                <TabList onChange={handleChange}  centered className='mb-0 mt-0'>
                    <Tab label="월" value="mon" />
                    <Tab label="화" value="tue" />
                    <Tab label="수" value="wed" />
                    <Tab label="목" value="thu" />
                    <Tab label="금" value="fri" />
                    <Tab label="토" value="sat" />
                    <Tab label="일" value="sun" />
                    <Tab label="매일 + " value="naverDaily" />
                    <Tab label="완결" value="finished" />
                </TabList>
                
                <TabPanel value={updateDay}>
                    <WebtoonListComponent serverData={serverData} changeFavoriteState={changeFavoriteState}/>
                </TabPanel>
            </TabContext>
            <PageComponent serverData={serverData} movePage={moveTodayList} updateDay={updateDay} />
      </div>
    );
}

export default TodayComponent;