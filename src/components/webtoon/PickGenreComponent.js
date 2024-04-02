import React, { useEffect, useState } from 'react';
import { Container, Button } from '@mui/material';
import WebtoonLimitComponent from '../../common/WebtoonLimitComponent';
import { getList } from '../../api/webtoonApi';
import { useSelector } from 'react-redux';
import { convertGenre } from '../../common/convertValue';
import useCustomMove from '../../hooks/useCustomMove';

const initState = {
    dtoList:[], pageNumList:[], pageRequestDTO: null, prev: false, next: false,
    totoalCount: 0, prevPage: 0, nextPage: 0, totalPage: 0, current: 0 
}

function PickGenreComponent(props) {
    const [serverData, setServerData] = useState(initState)
    const memberInfo = useSelector(state => state.memberSlice)
    const [favorite, setFavorite] = useState(false);
    const { moveGenreList } = useCustomMove()
    let memberId = memberInfo.id
    const genre = props.genre
    const fin = false;

    useEffect(() => {
        getList({ genre, fin, memberId }).then(data => {
            setServerData(data)
        })     
    }, [genre, memberId, favorite])


    const changeFavoriteState = () =>{
        setFavorite(!favorite)
    }

    const handleClickMore = (genre) => {

        localStorage.setItem('genreSelected',genre);
        moveGenreList({genre:genre})
    }
    return (
        <div>
        <Container fixed sx={{mb:6}}>
            <div className="mb-5 mt-5 pt-6 flex flex-row justify-between border-t border-neutral-100">
            <span className="font-medium text-neutral-800 text-xl">{props.title}</span>
            {serverData.totalCount > 6 ? <Button sx={{color:'grey.800'}} onClick={()=>{handleClickMore(genre)}}>더보기</Button> : <></>}
            </div>
            <WebtoonLimitComponent serverData={serverData} changeFavoriteState={changeFavoriteState} />
        </Container>
        </div>
    );
}

export default PickGenreComponent;