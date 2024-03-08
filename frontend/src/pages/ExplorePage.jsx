import {programmingLanguages} from "../utils/constants.js";
import {useState} from "react";
import toast from "react-hot-toast";
import {Spinner} from "../components/Spinner.jsx";
import {AiOutlineFork, AiOutlineStar} from "react-icons/ai";

export const ExplorePage = () => {
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [repos, setRepos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const exploreRepos = async (language) => {
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
    };

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
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {repos.map((repo) => (
                            <div key={repo.id} className='bg-glass rounded-md p-4'>
                                <a href={repo.html_url} target='_blank' rel='noreferrer'>
                                    <h1 className='text-lg font-bold'>{repo.name}</h1>
                                </a>
                                <p className='text-sm'>{repo.description}</p>
                                <div className='flex justify-between items-center mt-2'>
                                    <div className='flex gap-2 items-center'>
                                        <img src={repo.owner.avatar_url} alt={repo.owner.login} className='h-8 w-8 rounded-full'/>
                                        <p className='text-sm'>{repo.owner.login}</p>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <span className='flex gap-1 items-center'>
                                            <AiOutlineStar size={20}/>
                                            <p>{repo.stargazers_count}</p>
                                        </span>
                                        <span className='flex gap-1 items-center'>
                                            <AiOutlineFork size={20}/>
                                            <p>{repo.forks_count}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
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