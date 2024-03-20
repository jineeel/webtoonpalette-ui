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

const initState = {
    dtoList:[], pageNumList:[], pageRequestDTO: null, prev: false, next: false,
    totoalCount: 0, prevPage: 0, nextPage: 0, totalPage: 0, current: 0 
}
const value = 'genre'

function GenreComponent(props) {

    const {page, size, moveGenreList, refresh} = useCustomMove()
    const [serverData, setServerData] = useState(initState);
    const [genre, setGenre] = useState('ROMANCE'); //추후 사용자의 취향으로 초기화
    // const [tabValue, setTabValue] = useState(false);

    const { fin, checkFinished }= useCustomValue()

    const handleChange = (event, newValue) => {
        setGenre(newValue);
    //   setTabValue(true);
        moveGenreList({ genre: newValue });
    };

    useEffect(() => {
        localStorage.setItem('isChecked', JSON.stringify(fin));
      }, [fin]);

    useEffect(()=>{
        moveGenreList({ genre: genre});
    },[])
     
    useEffect(()=>{
        getList({page,size,genre,fin,value}).then(data =>{
            setServerData(data)
            // setTabValue(false);
        })
    }, [page,size,genre,refresh,fin]);

    return (
        <div>
              <TabContext value={genre}>
                <TabList onChange={handleChange} centered className='mb-0 mt-0' indicatorColor='secondary' textColor='secondary'>
                    <Tab label="로맨스" value="ROMANCE" />
                    <Tab label="판타지" value="FANTASY" />
                    <Tab label="로맨스판타지" value="ROMANCE_FANTASY" />
                    <Tab label="액션" value="ACTION" />
                    <Tab label="일상" value="DAILY" />
                    <Tab label="스릴러" value="THRILLER" />
                    <Tab label="개그" value="COMIC" />
                    <Tab label="드라마" value="DRAMA" />
                    <Tab label="사극/무협" value="MARTIAL" />
                    <Tab label="스포츠" value="SPORTS" />
                </TabList>
                <TabPanel value={genre}>
                    <FormControlLabel
                        sx= {{ mb:1 , mt:-1}}
                        label={<Typography variant="button" color="dark">완결</Typography>}
                        control={<Checkbox checked={fin} onChange={checkFinished} size="small" color='secondary' />}
                    />
                    <WebtoonListComponent serverData={serverData}/>
                </TabPanel>
            </TabContext>
            <PageComponent serverData={serverData} movePage={moveGenreList} value={genre} />
        </div>
    );
}

export default GenreComponent;