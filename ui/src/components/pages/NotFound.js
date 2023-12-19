import React from "react";
import {Link} from "react-router-dom";

export function NotFound() {
    return (
        <main className={'flex flex-col justify-center items-center h-screen'} style={{ padding: "1rem" }}>
            <h1 className={'text-7xl font-bold'}>404</h1>
            <p className={'md:text-lg text-center mt-6'}>Страницата, която търсите не съществува.</p>
            <Link className={'mt-6'} style={{fontFeatureSettings: '"calt" 1'}} to={'/'}><i className={'la la-arrow-left'} /> <span className={'hover:underline'}>Начало</span></Link>
        </main>
    )
}