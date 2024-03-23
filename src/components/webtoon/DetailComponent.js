
import React,{ useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {get, getList} from '../../api/webtoonApi'
import { convertGenre, convertDay, convertFanCount } from '../../common/convertValue'
import { Container, IconButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { grey } from '@mui/material/colors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import adult from '../../images/adult_icon.png'
import CarouselComponent from '../../common/CarouselComponent';

const initData = {
    id : 0,
    title : '',
    author : '',
    url : '',
    img : '',
    platform : '',
    updateDay : '',
    rest : '',
    adult : '',
    genre : '',
    likeCount : '',
    fanCount : ''
}
const initState = {
    dtoList:[], pageNumList:[], pageRequestDTO: null, prev: false, next: false,
    totoalCount: 0, prevPage: 0, nextPage: 0, totalPage: 0, current: 0 
}
const size = 20
const value = 'detail'

function DetailComponent({id, genre}) {
    const [webtoon, setWebtoon] = useState(initData)
    const [serverData, setServerData] = useState(initState);
    const [genres, setGenres]= useState(genre)
    const [url, setUrl] = useState('')
    const navigate = useNavigate();

    useEffect(()=>{
        window.scrollTo(0, 0)
        get(id).then(data => {
            setWebtoon(data)
            setGenres(data.genre) 
            setUrl(data.url)
        })
    },[id])

    useEffect(()=>{
        getList({genre, value, size, id}).then(data =>{
            setServerData(data)
        })
    },[id])

    const postUrl = () =>{
        window.location.href= url
    }

    return (
        <div>
            <Container fixed>
            <div className='flex flex-row left-0 mt-6 mb-16 ml-2 relative'>
                <div className='relative'>
                <img    
                    srcSet={`${webtoon.img}`}
                    src={`${webtoon.img}`}
                    alt={webtoon.title}
                    loading="lazy"
                    className='w-[21rem] h-[24rem] rounded-lg object-cover shadow-2xl'
                    />
                   <div className='w-10 absolute z-10 m-1 top-1 left-1'>
                    {webtoon.adult == 'Y' ? <img src={adult} alt="adult"/> : <></>}
                    </div>
                    </div>
                    <div className='flex flex-col ml-10'>
                        <Typography variant='h4' sx={{mb:3, fontWeight:700}}>{webtoon.title}</Typography>
                        <Typography variant='h5'sx={{mb:3, fontWeight:500}}>{webtoon.author}</Typography>
                        <div className='flex'>
                            <Typography variant='body1' sx={{mb:1, fontWeight:500}}>{webtoon.rest == 'N' ? convertDay(webtoon.updateDay) : <></> }</Typography>
                            <Typography variant='body1' sx={{mb:1, fontWeight:500}}>{webtoon.rest == 'Y' ? '휴재' : <></>}</Typography>
                        </div>
                        <Typography variant='body1' sx={{mb:1, fontWeight:500}}>{convertGenre(webtoon.genre)}</Typography>
                        <Typography variant='body1' sx={{mb:1, fontWeight:500}}>{webtoon.platform == 'naver' ? '네이버웹툰' : '카카오웹툰' }</Typography>
                        <div>
                            {webtoon.fanCount != 0 ? <VisibilityIcon sx={{fontSize:15, color: grey[500], mr:1 }} /> : <></>}
                                <span className='mr-3 text-zinc-500 text-sm'>{convertFanCount(webtoon.fanCount)}</span>
                            {webtoon.likeCount != null ? <FavoriteIcon sx={{fontSize:15, color: grey[500], mr:1}} /> : <></>}
                                <span className=' text-zinc-500 text-sm'>{webtoon.likeCount}</span>
                        </div>
                        <div className='absolute bottom-1'>
                            <Button variant="contained" size='large' sx={{width:200, height:60, boxShadow: 'none',}} onClick={postUrl}><Typography variant='h6' color='white'>웹툰 보러가기</Typography></Button>
                            <Button variant='outlined' sx={{width:60, height:60, ml:1}} color='secondary'><FavoriteIcon color='secondary' /></Button> {/** 하트 누르면 색 빨간색으로 */}
                            <Button variant="outlined" sx={{width:60, height:60, ml:1}} color='secondary'><CreateNewFolderIcon color='secondary'/></Button>
                        </div>
                    </div>
            </div>
            
            </Container>
            {/* + Comment */}
            <Container maxWidth='xl'>
                <CarouselComponent serverData={serverData}/>
            </Container>

        </div>

    );
}

export default DetailComponent;