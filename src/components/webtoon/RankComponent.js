import React, { useEffect, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import WebtoonListComponent from '../../common/WebtoonListComponent';
import useCustomMove from '../../hooks/useCustomMove';
import Checkbox from '@mui/material/Checkbox';
import useCustomValue from '../../hooks/useCustomValue';
import { getList } from '../../api/webtoonApi';
import { Container } from '@mui/system';
import { useSelector } from 'react-redux';


const initState = {
    dtoList:[], pageNumList:[], pageRequestDTO: null, prev: false, next: false,
    totoalCount: 0, prevPage: 0, nextPage: 0, totalPage: 0, current: 0 
}

const value = 'rank'

function RankComponent(props) {
    const [serverData, setServerData] = useState(initState);
    const { fin, genre, checkFinished, selectGenre, selectList }= useCustomValue()
    const memberInfo = useSelector(state => state.memberSlice)
    const [favorite, setFavorite] = useState(false);

    const handleSelectGenre = (e) => {
        selectGenre(e.target.value)
    };

    useEffect(() => {
        localStorage.setItem('isChecked', JSON.stringify(fin));
      }, [fin]);
    

    useEffect(() => {
        localStorage.setItem('genreSelected', genre);
    },[genre])
    

    useEffect(() => {
        const memberId = memberInfo.id

        getList({genre,fin,value,memberId}).then(data =>{
            setServerData(data)
        })
    }, [genre,fin,favorite]);

    const changeFavoriteState = () =>{
        setFavorite(!favorite)
    }
    return (
        <div>
            <div className='mt-3 mb-7'><Typography color="dark.light" sx={{textAlign:'center', fontWeight: 'medium', fontSize: 22}}>인기 웹툰 TOP 60</Typography></div>
            <Container fixed>
                <div className='flex flex-row justify-between w-full'>
                    <FormControlLabel
                        sx= {{ mb:1 , mt:-1}}
                        label={<Typography variant="button" color="dark">완결</Typography>}
                        control={<Checkbox checked={fin} onChange={checkFinished} size="small" color='secondary' />}
                    />
                    <select className="block w-40 p-2 mb-2 text-sm
                        text-gray-800 border border-gray-200 rounded-lg bg-gray-10 outline-0" 
                            onChange={handleSelectGenre} value={genre}>
                            {selectList.map((item) => {
                                return <option value={item.value} key={item.value}>{item.name}</option>;
                            })}
                    </select>  
                </div>
                <WebtoonListComponent serverData={serverData} rank="true" changeFavoriteState={changeFavoriteState}/>
            </Container>
            
            
        </div>
    );
}

export default RankComponent;