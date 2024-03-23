import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { todayOfWeek } from "../common/convertValue";
import { useState } from "react";

const getNum = (param, defaultValue) => {
    if(!param){
        return defaultValue
    }
    return parseInt(param)
}
const getValue = (param, defaultValue) => {
    if(!param){
        return defaultValue
    }
    return param
}
const useCustomMove = () => {
    const navigate = useNavigate()

    const [refresh, setRefresh] = useState(false);
    const [queryParams] = useSearchParams();

    const page = getNum(queryParams.get('page'),1);
    const size = getNum(queryParams.get('size'),60)
    const updateDay = getValue(queryParams.get('updateDay'),todayOfWeek())
    const genre = getNum(queryParams.get('genre'),'ROMANTIC')
    const fin = getValue(queryParams.get('fin'), false)
    const platform = getValue(queryParams.get('platform'), 'naver')

    const queryDefault = createSearchParams({page,size,updateDay}).toString()

    let queryStr = ""

    const moveTodayList = (pageParam) => {
        if(pageParam){
            const pageNum = getNum(pageParam.page, 1)
            const sizeNum = getNum(pageParam.size, 60)
            const updateDayValue = getValue(pageParam.updateDay,todayOfWeek())
        
            queryStr = createSearchParams({page:pageNum, size:sizeNum, updateDay:updateDayValue}).toString()
        }else{
            queryStr = queryDefault
        }
        setRefresh(!refresh);
        navigate({pathname:`../today`, search: queryStr})
    }

    const moveGenreList = (pageParam) => {
        if(pageParam){
            const pageNum = getNum(pageParam.page, 1)
            const sizeNum = getNum(pageParam.size, 60)
            const genreSt = getValue(pageParam.genre,'ROMANTIC')
            const finSt = getValue(pageParam.fin, false)
            if(finSt){
                queryStr = createSearchParams({page:pageNum, size:sizeNum, genre:genreSt, fin:finSt}).toString()
            }else {
                queryStr = createSearchParams({page:pageNum, size:sizeNum, genre:genreSt}).toString()
            }
           
        }
        setRefresh(!refresh);
        navigate({pathname:`../genre`, search: queryStr})
    }
    const movePlatformList = (pageParam) => {
        if(pageParam){
            const pageNum = getNum(pageParam.page, 1)
            const sizeNum = getNum(pageParam.size, 60)
            const genreSt = getValue(pageParam.genre,'ALL')
            const finSt = getValue(pageParam.fin, false)
            const platformSt = getValue(pageParam.platform, 'naver')

            if(finSt){
                queryStr = createSearchParams({page:pageNum, size:sizeNum, genre:genreSt, platform: platformSt, fin:finSt}).toString()
            }else {
                queryStr = createSearchParams({page:pageNum, size:sizeNum, genre:genreSt, platform: platformSt}).toString()
            }
        }
        setRefresh(!refresh);
        navigate({pathname:`../platform`, search: queryStr})
    }

    const moveToDetail = (num, genre) => {
        queryStr = createSearchParams({genre:genre}).toString()
        navigate({
            pathname: `../webtoon/${num}`,
            search: queryStr
        })
    }



    return {moveTodayList, moveGenreList, movePlatformList, moveToDetail, page, size, updateDay, genre, refresh, platform};
}

export default useCustomMove;