import React from 'react';
import {useNavigate} from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    return  <div>
        <h2>Dashboard</h2>
        <p>
            This page dashboard.
        </p>
        <button type="button" onClick={() => navigate({hash: '/control/editAccount/1'})}>EditAccount HashModal</button>
        <button type="button" onClick={() => navigate({hash: '/control/editPassword/2'})}>EditPassword HashModal</button>
    </div>;
};

export default Dashboard;
