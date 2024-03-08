import {programmingLanguages} from "../utils/constants.js";

export const ExplorePage = () => {
    return (
        <div className='px-4'>
            <div className='bg-glass max-w-2xl mx-auto rounded-md p-4'>
                <h1 className='text-xl font-bold text-center'>Explore Popular Repositories</h1>
                <div className='flex flex-wrap gap-2 my-2 justify-center'>
                    {Object.keys(programmingLanguages).map((language) => (
                        <span
                            key={language}
                            className='cursor-pointer bg-glass text-md font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1'
                        >
                            <img src={programmingLanguages[language]} alt={language} className='h-10 w-10'/>
                            {language}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};