import {useState} from "react";

export const SortRepos = ({onSort,sortType}) => {

    const buttons = [
        {type: 'recent', text: 'Most Recent'},
        {type: 'stars', text: 'Most Stars'},
        {type: 'forks', text: 'Most Forks'},
    ]

    return (
        <div className='mb-2 flex justify-center lg:justify-end'>
            {buttons.map((button) => (
                <button
                    key={button.type}
                    type='button'
                    className={`py-2.5 px-5 me-2 mb-2 text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass
                    ${sortType===button.type ? 'border-2 border-blue-500' : ''}`}
                    onClick={() => {onSort(button.type)}}
                >
                    {button.text}
                </button>
            ))}
            {/*<button*/}
            {/*    type='button'*/}
            {/*    className={`py-2.5 px-5 me-2 mb-2 text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass*/}
            {/*    ${sortType==='recent' ? 'border-2 border-blue-500' : ''}`*/}
            {/*}*/}
            {/*    onClick={() => {onSort('recent')}}*/}
            {/*>*/}
            {/*    Most Recent*/}
            {/*</button>*/}
            {/*<button*/}
            {/*    type='button'*/}
            {/*    className={`py-2.5 px-5 me-2 mb-2  text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass*/}
            {/*    ${sortType==='stars' ? 'border-2 border-blue-500' : ''}`*/}
            {/*}*/}
            {/*    onClick={() => {onSort('stars')}}*/}
            {/*>*/}
            {/*    Most Stars*/}
            {/*</button>*/}
            {/*<button*/}
            {/*    type='button'*/}
            {/*    className={`py-2.5 px-5 me-2 mb-2  text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass*/}
            {/*    ${sortType==='forks' ? 'border-2 border-blue-500' : ''}`*/}
            {/*}*/}
            {/*    onClick={() => {onSort('forks')}}*/}
            {/*>*/}
            {/*    Most Forks*/}
            {/*</button>*/}
        </div>
    );
};