import React, { useEffect, useState } from 'react';
import { getSearch } from '../../api/webtoonApi';
import useCustomMove from '../../hooks/useCustomMove';
import WebtoonListComponent from '../../common/WebtoonListComponent';
import { Typography } from "@mui/material";
import PageComponent from '../../common/PageComponent';
import { useSelector } from 'react-redux';

const initState = {
    dtoList:[], pageNumList:[], pageRequestDTO: null, prev: false, next: false,
    totalCount: 0, prevPage: 0, nextPage: 0, totalPage: 0, current: 0 
}
function WebtoonComponent(props) {
    
    const [serverData, setServerData] = useState(initState)
    const {keyword, page, moveToSearchWebtoon} = useCustomMove()
    const [favorite, setFavorite] = useState(false);
    const memberInfo = useSelector(state => state.memberSlice)

    const fin = true;
    useEffect(()=>{
        window.scrollTo(0,0)
    },[page])
    useEffect(()=>{
        const memberId = memberInfo.id

        moveToSearchWebtoon({keyword, page})

        getSearch({keyword, page, fin, memberId}).then(data => {
            
            setServerData(data)

         })
    },[keyword,page,favorite])

    const changeFavoriteState = () =>{
        setFavorite(!favorite)
    }

    return (
       <div>
            <div className='mt-2 mb-5'>
                <span className='text-2xl font-medium'>'{keyword}'</span> 
                <span>  검색 결과  {serverData.totalCount}건</span>
            </div>
            <div className='mb-10'>
                <Typography variant='h6' sx={{mt:2, mb:1, fontSize:18}}>웹툰</Typography>
                <WebtoonListComponent serverData={serverData} changeFavoriteState={changeFavoriteState}/>
            </div>
            <PageComponent serverData={serverData} movePage={moveToSearchWebtoon} keyword={keyword}/>
        </div>
    );
}

export default WebtoonComponent;