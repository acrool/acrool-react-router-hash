import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';

import {HashRoutes, HashRoute} from '@acrool/react-router-hash';
import {createBrowserHistory} from 'history';
import Github from './assets/github.svg?react';


import EditAccountModal from './views/ViewModal/EditLayout/EditAccountModal';
import EditLayout from './views/ViewModal/EditLayout/EditLayout';
import EditPasswordModal from './views/ViewModal/EditLayout/EditPasswordModal';
import NotFound from './views/NotFound';
import Dashboard from './views/Dashboard';

import './App.css';


const history = createBrowserHistory({window});
const originalHistory = createBrowserHistory();


const MainRouter = () => {
    return <Router>

        <Routes>
            <Route path="/" element={<Dashboard/>} />

            {/* NotFound */}
            <Route path="*" element={<NotFound/>}/>
        </Routes>


        {/*<MyTest/>*/}
        <HashRoutes>
            {/*個人各式資訊頁面*/}
            <HashRoute path="control/*" element={<EditLayout/>}>
                <HashRoute path="editAccount/:id" element={<EditAccountModal/>}/>
                <HashRoute path="editPassword/:id" element={<EditPasswordModal/>}/>
            </HashRoute>
        </HashRoutes>

    </Router>;
};


function App() {

    const renderHeader = () => {

        const repositoryUrl = 'https://github.com/acrool/acrool-react-router-hash';
        const name = 'Acrool React Router Hash';

        return <>
            <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
                <Github width={40} height={40}/>
            </a>

            <div className="banner-wrapper">
                <img src="/logo.svg" alt={name}/>
                <h1>{name}</h1>
            </div>
        </>;
    };


    return (
        <div className="App">
            {renderHeader()}

            <MainRouter/>
        </div>
    );
}

export default App;
