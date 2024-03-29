import {Repo} from "./Repo";

export const Repos = ({repos}) => {
    return (
        <div className={`lg:w-2/3 w-full bg-glass rounded-lg px-8 py-6`}>
            <ol className='relative border-s border-gray-200'>
                {repos.map((repo, index) => {
                    return <Repo key={index} repo={repo} />;
                })};
                { repos.length === 0 && <p className='flex items-center justify-center h-32'>No repositories found</p>}
            </ol>
        </div>
    );
};