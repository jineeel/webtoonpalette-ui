import React, { useEffect, useState } from 'react';
import { getSearch } from '../../api/webtoonApi';
import useCustomMove from '../../hooks/useCustomMove';
import WebtoonListComponent from '../../common/WebtoonListComponent';
import { Typography } from "@mui/material";

import PageComponent from '../../common/PageComponent';


const initState = {
    dtoList:[], pageNumList:[], pageRequestDTO: null, prev: false, next: false,
    totalCount: 0, prevPage: 0, nextPage: 0, totalPage: 0, current: 0 
}
function WebtoonComponent(props) {
    
    const [serverData, setServerData] = useState(initState)
    const {keyword, page,  moveToSearchWebtoon} = useCustomMove()

    useEffect(()=>{
        moveToSearchWebtoon({keyword, page})
         getSearch({keyword, page}).then(data => {
             setServerData(data)
             window.scrollTo(0,0)
         })
    },[keyword,page])

    return (
       <div>
            <div className='mt-2 mb-5'>
                <span className='text-2xl font-medium'>'{keyword}'</span> 
                <span>  검색 결과  {serverData.totalCount}건</span>
            </div>
            <div className='mb-10'>
                <Typography variant='h6' sx={{mt:2, mb:1, fontSize:18}}>웹툰</Typography>
                <WebtoonListComponent serverData={serverData}/>
            </div>
            <PageComponent serverData={serverData} movePage={moveToSearchWebtoon} keyword={keyword}/>
        </div>
    );
}

export default WebtoonComponent;