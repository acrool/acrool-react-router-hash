import React from 'react';
import {useHashParams} from 'bear-react-router-hash';
import {useNavigate} from 'react-router-dom';

const EditAccount = () => {
    const {id} = useHashParams<{id: string}>();
    const navigate = useNavigate();
    return <>
        <p>Edit Account Modal id: {id}</p>
        <button type="button" onClick={() => navigate({hash: undefined})}>Close HashModal</button>
    </>;
};

export default EditAccount;
