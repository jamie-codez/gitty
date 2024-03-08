import {Search} from "../components/Search.jsx";
import {ProfileInfo} from "../components/ProfileInfo.jsx";
import {Repos} from "../components/Repos.jsx";
import {SortRepos} from "../components/SortRepos.jsx";
import {Spinner} from "../components/Spinner.jsx";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

export const HomePage = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortType, setSortType] = useState('forks');

    const fetchUserProfile = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://api.github.com/users/burakorkmez');
            const data = await response.json();
            setUserProfile(data);
            setLoading(false);
            toast.success('User profile fetched successfully',{duration: 4000, position: 'top-right',icon: '🚀',style: {borderRadius: '10px', background: '#333', color: '#fff',},});
        } catch (error) {
            console.error('Error fetching user profile', error);
            setLoading(false);
            toast.error('Error fetching user profile',{duration: 4000, position: 'top-right',icon: '🔥',style: {borderRadius: '10px', background: '#333', color: '#fff',},});
        }
    }

    useEffect(() => {
        fetchUserProfile();
    }, []);
    return (
        <div className='m-4'>
            <Search />
            <SortRepos />
            <div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
                <ProfileInfo />
                <Repos />
                <Spinner />
            </div>
        </div>
    );
};