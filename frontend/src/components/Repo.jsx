import {FaCodeBranch, FaCopy, FaRegStar} from "react-icons/fa";
import {FaCodeFork} from "react-icons/fa6";
import {formatMemberSince} from "../utils/functions.js";
import {programmingLanguages} from "../utils/constants.js";
import toast from "react-hot-toast";

export const Repo = ({repo}) => {
    const handleCloneClick = async (cloneUrl) => {
        try {
            await navigator.clipboard.writeText(cloneUrl); // Copy to clipboard
            toast.success('Repository URL copied to clipboard', {duration: 2000, position: 'top-right', icon: '🚀', style: {borderRadius: '10px', background: '#333', color: '#fff',},});
        } catch (e) {
            console.error('Error copying to clipboard', e);
            toast.error('Error copying to clipboard', {duration: 2000, position: 'top-right', icon: '🔥', style: {borderRadius: '10px', background: '#333', color: '#fff',},});
        }
    };
    return (
        <li className='mb-10 ms-7'>
			<span
                className='absolute flex items-center justify-center w-6 h-6 bg-blue-100
			rounded-full -start-3 ring-8 ring-white'
            >
				<FaCodeBranch className='w-5 h-5 text-blue-800'/>
			</span>
            <div className='flex gap-2 items-center flex-wrap'>
                <a
                    href={repo?.html_url || ""}
                    target='_blank'
                    rel='noreferrer'
                    className='flex items-center gap-2 text-lg font-semibold'
                >
                    {repo?.name}
                </a>
                <span
                    className='bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5
					py-0.5 rounded-full flex items-center gap-1'
                >
					<FaRegStar/> {repo?.stargazers_count}
				</span>
                <span
                    className='bg-purple-100 text-purple-800 text-xs font-medium
					 px-2.5 py-0.5 rounded-full flex items-center gap-1'
                >
					<FaCodeFork/> {repo?.forks_count}
				</span>
                <span
                    className='cursor-pointer bg-green-100 text-green-800 text-xs
					font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1'
                    onClick={() => handleCloneClick(repo?.clone_url)}
                >
					<FaCopy/> Clone
				</span>
            </div>

            <time
                className='block my-1 text-xs font-normal leading-none
			 text-gray-400'
            >
                Released on {formatMemberSince(repo?.created_at)}
            </time>
            <p className='mb-4 text-base font-normal text-gray-500'>{repo.description ? repo.description.slice(0, 500) : "No description provided"}</p>
            {programmingLanguages[repo.language] ? (
                <div className='flex gap-2 items-center'>
                    <img src={programmingLanguages[repo.language]} alt='Programming language icon' className='h-5'/>
                    <p className='text-xs font-normal text-gray-400'>{repo.language}</p>
                </div>
            ) : repo.language ? (<p className={'text-xs font-normal text-gray-400'}>{repo.language}</p>
            ) : (
                <p className='text-xs font-normal text-gray-400'>No programming language detected</p>
            )}
        </li>
    );
};