import React from 'react';

export const convertGenre = (genre) => {
    switch (genre){
        case 'ROMANCE' : return '로맨스' ;
        case 'FANTASY' : return '판타지' ;
        case 'ROMANCE_FANTASY' : return '로맨스판타지' ;
        case 'ACTION' : return '액션' ;
        case 'DAILY' : return '일상' ;
        case 'THRILLER' : return '스릴러' ;
        case 'COMIC' : return '개그' ;
        case 'MARTIAL' : return '사극/무협' ;
        case 'DRAMA' : return '드라마' ;
        case 'SPORTS' : return '스포츠' ;
        default: return genre;
    }
}

export const todayOfWeek = () => {
    const now = new Date();
    const week = ['sun','mon','tue','wed','thu','fri','sat'];
    let dayOfWeek = week[now.getDay()]
    return dayOfWeek;
}

export const convertFanCount = (fanCount) => {
    if(fanCount != 0){
        return (fanCount/10000)+'만';
    }
}

export const convertDay = (day) => {
    switch (day){
        case 'mon' : return '월요일';
        case 'tue' : return '화요일';
        case 'wed' : return '수요일';
        case 'thu' : return '목요일';
        case 'fri' : return '금요일';
        case 'sat' : return '토요일';
        case 'sun' : return '일요일';
        case 'finished' : return '완결';
        case 'naverDaily' : return '매일+';
        default: return '';
    }
}

export const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n-1) + "  …" : str;
}
