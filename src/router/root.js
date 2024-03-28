import * as React from 'react';
import { Suspense, lazy } from "react";
import webtoonRouter from "./webtoonRouter";
import memberRouter from './memberRouter';
import searchRouter from './searchRouter';

const { createBrowserRouter } = require("react-router-dom");

const Main = lazy(()=>import("../pages/webtoon/MainPage"))
const Mypage = lazy(() => import("../pages/member/MyPage"))
const SearchIndex = lazy(()=>import("../pages/search/IndexPage"))
const WebtoonIndex = lazy(()=>import("../pages/webtoon/IndexPage"))

const root = createBrowserRouter([
    {
        path: '',
        element: <Suspense><WebtoonIndex /></Suspense>,
        children: webtoonRouter()
    },
    {
        path: 'member',
        children: memberRouter()
    },
    {
        path: 'mypage',
        element: <Suspense><Mypage /></Suspense>
    },
    {
        path: 'search',
        element: <Suspense><SearchIndex /></Suspense>,
        children: searchRouter()
    },
])

export default root;