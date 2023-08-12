import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home.tsx";
import NotFoundPage from "./pages/404.tsx";
import VideoDetail from "./pages/VideoDetail.tsx";
import Header from "./components/Header.tsx";

export default function App() {
    return (
        <Router>
            <Header/>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/videos/:id" element={<VideoDetail/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </Router>
    );
}