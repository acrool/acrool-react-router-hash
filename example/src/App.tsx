import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import {Route, Routes, useLocation, unstable_HistoryRouter as Router} from 'react-router-dom';
import {HashRoutes, HashRoute} from 'bear-react-router-hash';
import {createBrowserHistory} from 'history';


import EditAccount from './views/ViewModal/EditLayout/EditAccount';
import EditLayout from './views/ViewModal/EditLayout/EditLayout';
import EditPassword from './views/ViewModal/EditLayout/EditPassword';
import Login from './views/ViewModal/EditLayout/Login';
import NotFound from './views/NotFound';
import Dashboard from './views/Dashboard';

import './App.css';


const history = createBrowserHistory({window});


const MainRouter = () => {
    return <Router history={history}>

        <Routes>
            <Route path="/" element={<Dashboard/>} />

            {/* NotFound */}
            <Route path="*" element={<NotFound/>}/>
        </Routes>


        {/*<MyTest/>*/}
        <HashRoutes>
            <HashRoute path="login" element={<Login/>}/>

            {/*個人各式資訊頁面*/}
            <HashRoute path="control/*" element={<EditLayout/>}>
                <HashRoute path="editAccount/:id" element={<EditAccount/>}/>
                <HashRoute path="editPassword/:id" element={<EditPassword/>}/>
            </HashRoute>
        </HashRoutes>

    </Router>;
};


function App() {

    return (
        <div className="App">
            <div>
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">

                <MainRouter/>


                <p>
          Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
        Click on the Vite and React logos to learn more
            </p>
        </div>
    );
}

export default App;
