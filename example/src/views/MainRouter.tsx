import {Route, Routes, useLocation} from 'react-router-dom';
import {HashRoutes, HashRoute} from 'bear-react-router-hash';

import Dashboard from './Dashboard';
import EditLayout from './ViewModal/EditLayout/EditLayout';
import EditAccount from './ViewModal/EditLayout/EditAccount';
import EditPassword from './ViewModal/EditLayout/EditPassword';
import Login from './ViewModal/EditLayout/Login';
import NotFound from './NotFound';
import {unstable_HistoryRouter as Router} from 'react-router-dom';
// import {HistoryRouter as Router} from 'redux-first-history/rr6';
import {createBrowserHistory} from 'history';


const history = createBrowserHistory({window});

const MyTest = () => {
    const {pathname} = useLocation();
    console.log('test', pathname);

    return <div>test</div>;
};

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

export default MainRouter;
