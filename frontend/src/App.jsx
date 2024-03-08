import {Route, Routes} from "react-router-dom";
import {SettingsPage} from "./pages/SettingsPage.jsx";
import {AboutPage} from "./pages/AboutPage.jsx";
import {LikesPage} from "./pages/LikesPage.jsx";
import {ExplorePage} from "./pages/ExplorePage.jsx";
import {ProfilePage} from "./pages/ProfilePage.jsx";
import {RegisterPage} from "./pages/RegisterPage.jsx";
import {LoginPage} from "./pages/LoginPage.jsx";
import {HomePage} from "./pages/HomePage.jsx";
import {Sidebar} from "./components/Sidebar.jsx";
import {Toaster} from "react-hot-toast";

function App() {

    return (
        <div className={'flex'}>
            <Sidebar/>
            <div className={'max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1'}>
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/login'} element={<LoginPage/>}/>
                    <Route path={'/register'} element={<RegisterPage/>}/>
                    <Route path={'/profile'} element={<ProfilePage/>}/>
                    <Route path={'/explore'} element={<ExplorePage/>}/>
                    <Route path={'/likes'} element={<LikesPage/>}/>
                    <Route path={'/about'} element={<AboutPage/>}/>
                    <Route path={'/settings'} element={<SettingsPage/>}/>
                </Routes>
                <Toaster/>
            </div>
        </div>
    )
}

export default App
