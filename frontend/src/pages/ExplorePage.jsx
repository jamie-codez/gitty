import {programmingLanguages} from "../utils/constants.js";
import {useCallback, useEffect, useState} from "react";
import toast from "react-hot-toast";
import {Spinner} from "../components/Spinner.jsx";
import {AiOutlineFork, AiOutlineStar} from "react-icons/ai";
import {ExploreRepoCard} from "../components/ExploreRepoCard.jsx";

export const ExplorePage = () => {
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [repos, setRepos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const exploreRepos = useCallback(async (language) => {
        setIsLoading(true);
        setRepos([]);
        try {
            const response = await fetch(`https://api.github.com/search/repositories?q=stars:>1000+language:${language}&sort=stars&order=desc&per_page=10`);
            const data = await response.json();
            setRepos(data.items);
            setIsLoading(false);
            toast.success('Repositories fetched successfully', { duration: 2000, position: 'top-right', icon: '🚀', style: { borderRadius: '10px', direction: 'ltr', background: '#333', color: '#fff', }, });
        } catch (error) {
            setIsLoading(false);
            toast.error('Error fetching repositories', { duration: 2000, position: 'top-right', icon: '🔥', style: { borderRadius: '10px', background: '#333', color: '#fff', }, });
        }finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        exploreRepos(selectedLanguage).then(() => console.log('data fetched successfully'));
    }, [exploreRepos]);

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
            {repos.length > 0 ? (
                <div className='mt-4'>
                    <h1 className='text-xl font-bold text-center'>Top 10 Repositories</h1>
                    <div className='flex flex-col md:flex-cols lg:flex-col gap-2'>
                        {repos.map((repo) => (
                            <ExploreRepoCard key={repo.id} repo={repo}/>
                        ))}
                    </div>
                </div>
            ) : isLoading ? (
                <div className='flex justify-center items-center mt-4'>
                    <Spinner/>
                </div>
            ) : (
                <div className='mt-4 flex justify-center'>
                    <button
                        className='py-2.5 px-5 text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass'
                        onClick={() => exploreRepos(selectedLanguage)}
                    >
                        Explore
                    </button>
                </div>
            )
            }
        </div>
    );
};