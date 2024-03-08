import {Search} from "../components/Search.jsx";
import {ProfileInfo} from "../components/ProfileInfo.jsx";
import {Repos} from "../components/Repos.jsx";
import {SortRepos} from "../components/SortRepos.jsx";
import {Spinner} from "../components/Spinner.jsx";
import {useCallback, useEffect, useState} from "react";
import toast from "react-hot-toast";

export const HomePage = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortType, setSortType] = useState('forks');

    const fetchUserProfileAndRepos = useCallback(async (searchTerm="jamie-codez") => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.github.com/users/${searchTerm}`);
            const data = await response.json();
            setUserProfile(data);
            const reposResponse = await fetch(data.repos_url);
            const reposData = await reposResponse.json();
            setRepos(reposData);
            setLoading(false);
            toast.success('User profile fetched successfully', {
                duration: 2000,
                position: 'top-right',
                icon: '🚀',
                style: {borderRadius: '10px', direction: 'ltr', background: '#333', color: '#fff',},
            });
        } catch (error) {
            setLoading(false);
            toast.error('Error fetching user profile', {duration: 2000, position: 'top-right', icon: '🔥', style: {borderRadius: '10px', background: '#333', color: '#fff',},});
        } finally {
            setLoading(false);
        }
    }, []);

    const onSearch = async (e,searchTerm) => {
        e.preventDefault();
        setLoading(true)
        setUserProfile(null)
        setRepos([])
        await fetchUserProfileAndRepos(searchTerm);
    };

    const onSort = (sortType) => {
        if (sortType==='recent'){
            setRepos(repos.sort((a,b)=>new Date(b.created_at)-new Date(a.created_at)))
        }else if (sortType==='stars'){
            setRepos(repos.sort((a,b)=>b.stargazers_count-a.stargazers_count)) // descending order
        }else if (sortType==='forks'){
            setRepos(repos.sort((a,b)=>b.forks_count-a.forks_count)) // descending order
        }
        setSortType(sortType)
        setRepos([...repos])
    }

    useEffect( () => {
        fetchUserProfileAndRepos().then(()=>console.log('data fetched successfully'));
    }, [fetchUserProfileAndRepos]);
    return (
        <div className='m-4'>
            <Search onSearch={onSearch}/>
            {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType}/>}
            <div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
                {userProfile && !loading && <ProfileInfo userProfile={userProfile}/>}
                {!loading && <Repos repos={repos}/>}
                {loading && <Spinner/>}
            </div>
        </div>
    );
}