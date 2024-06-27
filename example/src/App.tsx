import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';

import {HashRoutes, HashRoute} from '@acrool/react-router-hash';


import EditAccountModal from './views/ViewModal/EditLayout/EditAccountModal';
import EditLayout from './views/ViewModal/EditLayout/EditLayout';
import EditPasswordModal from './views/ViewModal/EditLayout/EditPasswordModal';
import NotFound from './views/NotFound';
import Dashboard from './views/Dashboard';

import './App.css';
import Banner from './components/Banner';
import {createBrowserHistory} from 'history';


const history = createBrowserHistory({window});


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
    return (
        <div className="App">
            <Banner/>

            <MainRouter/>
        </div>
    );
}

export default App;
