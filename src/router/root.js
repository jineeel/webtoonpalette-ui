import * as React from 'react';
import { Suspense, lazy } from "react";
import webtoonRouter from "./webtoonRouter";
import memberRouter from './memberRouter';
import searchRouter from './searchRouter';

const { createBrowserRouter } = require("react-router-dom");

const SearchIndex = lazy(()=>import("../pages/search/IndexPage"))
const WebtoonIndex = lazy(()=>import("../pages/webtoon/IndexPage"))
const MemberIndex = lazy(()=>import("../pages/member/IndexPage"))

const root = createBrowserRouter([
    {
        path: '',
        element: <Suspense><WebtoonIndex /></Suspense>,
        children: webtoonRouter()
    },
    {
        path: 'member',
        element: <Suspense><MemberIndex /></Suspense>,
        children: memberRouter()
    },
    {
        path: 'search',
        element: <Suspense><SearchIndex /></Suspense>,
        children: searchRouter()
    },
])

export default root;