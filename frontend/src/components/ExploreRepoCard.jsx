import {AiOutlineFork, AiOutlineStar} from "react-icons/ai";
import {programmingLanguages} from "../utils/constants.js";

export const ExploreRepoCard = ({key,repo}) => {
    return (
        <div key={key} className='bg-glass mx-40 rounded-md p-4'>
            <a href={repo.html_url} target='_blank' rel='noreferrer'>
                <h1 className='text-lg font-bold'>{repo.name}</h1>
            </a>
            <p className='text-sm'>{repo.description}</p>
            <div className='flex justify-between items-center mt-2'>
                <div className='flex gap-2 items-center'>
                    <img src={repo.owner.avatar_url} alt={repo.owner.login} className='h-8 w-8 rounded-full'/>
                    <p className='text-sm'>{repo.owner.login}</p>
                </div>
                <div className={`flex gap-2 items-center ${repo.language ? '': 'hidden'}`}>
                {repo.language && <img src={programmingLanguages[repo.language]} alt={repo.language} className='h-8 w-8'/>}<p>{repo.language}</p>
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
    )
}
