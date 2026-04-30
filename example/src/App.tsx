import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';

import {HashRoutes, HashRoute, useHashRoutes} from '@acrool/react-router-hash';


import EditAccountModal from './views/ViewModal/EditLayout/EditAccountModal';
import EditLayout from './views/ViewModal/EditLayout/EditLayout';
import EditPasswordModal from './views/ViewModal/EditLayout/EditPasswordModal';
import NotFound from './views/NotFound';
import Dashboard from './views/Dashboard';

import './App.css';
import Banner from './components/Banner';
import {GridThemeProvider} from '@acrool/react-grid';


const MainRouter = () => {
    return <Router>

        <Routes>
            <Route path="/" element={<Dashboard/>} />

            {/* NotFound */}
            <Route path="*" element={<NotFound/>}/>
        </Routes>


        {/* JSX mode */}
        {/*
        <HashRoutes>
            <HashRoute path="control/*" element={<EditLayout/>}>
                <HashRoute path="editAccount/:id" element={<EditAccountModal/>}/>
                <HashRoute path="editPassword/:id" element={<EditPasswordModal/>}/>
            </HashRoute>
        </HashRoutes>
        */}

        {/* Object mode — equivalent to the JSX block above */}
        <HashRoutes routes={[
            {
                path: 'control/*',
                element: <EditLayout/>,
                children: [
                    {path: 'editAccount/:id', element: <EditAccountModal/>},
                    {path: 'editPassword/:id', element: <EditPasswordModal/>},
                ],
            },
        ]} />

    </Router>;
};


function App() {
    return (
        <GridThemeProvider>
            <div className="App">
                <Banner/>

                <MainRouter/>
            </div>
        </GridThemeProvider>
    );
}

export default App;
