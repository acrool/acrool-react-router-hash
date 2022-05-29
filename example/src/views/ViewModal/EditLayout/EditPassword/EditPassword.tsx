import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useHashParams} from 'bear-react-router-hash';

const EditPassword = () => {
    const {id} = useHashParams<{id: string}>();
    const navigate = useNavigate();
    return <>
        <p>Edit Password Modal id: {id}</p>
        <button type="button" onClick={() => navigate({hash: undefined})}>Close HashModal</button>
    </>;
};

export default EditPassword;
