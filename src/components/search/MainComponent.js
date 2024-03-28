import React, { useEffect, useState } from 'react';
import { getSearch } from '../../api/webtoonApi';
import useCustomMove from '../../hooks/useCustomMove';
import WebtoonLimitComponent from '../../common/WebtoonLimitComponent';
import { Button, Typography } from "@mui/material";
import SearchResultComponent from './SearchResultComponent';

const initState = {
    dtoList:[], pageNumList:[], pageRequestDTO: null, prev: false, next: false,
    totalCount: 0, prevPage: 0, nextPage: 0, totalPage: 0, current: 0 
}

function MainComponent(props) {
    const [serverData, setServerData] = useState(initState)
    const {keyword, moveToSearchWebtoon} = useCustomMove()

    useEffect(()=>{
         getSearch({keyword}).then(data => {
             setServerData(data)
         })
    },[keyword])

    const handleClickMore = () => {
        moveToSearchWebtoon({keyword})
    }
    return (
        <div>
            <div className='mt-2 mb-5'>
                <span className='text-2xl font-medium'>'{keyword}'</span> 
                <span>  검색 결과  {serverData.totalCount}건</span>
            </div>
            <div className='mb-10'>
                <div className="flex flex-row w-full justify-between border-t border-zinc-100">
                    <Typography variant='h6' sx={{mt:2, mb:1, fontSize:18}}>웹툰</Typography>
                    {serverData.totalCount > 6 ? <Button sx={{mt:2, color:'grey.800', height:30}} onClick={handleClickMore}>더보기</Button> : <></>}
                </div>
                {serverData.totalCount != 0 ? <WebtoonLimitComponent serverData={serverData}/> : <SearchResultComponent />}
            </div>
            
            {/* TODO : Palette로 수정*/}
            <div className='mb-10'>
                <div className="flex flex-row w-full justify-between border-t border-zinc-100">
                    <Typography variant='h6' sx={{mt:2, mb:1, fontSize:18}}>팔레트</Typography>
                    {serverData.totalCount > 6 ? <Button sx={{mt:2, color:'grey.800', height:30}} onClick={handleClickMore}>더보기</Button> : <></>}
                </div>
                {serverData.totalCount != 0 ? <WebtoonLimitComponent serverData={serverData}/> : <SearchResultComponent />}
            </div>
        </div>
    );
}

export default MainComponent;