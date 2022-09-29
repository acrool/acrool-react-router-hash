import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useHashParams, useHashPathname} from 'bear-react-router-hash';

const EditPassword = () => {
    const {id} = useHashParams<{id: string}>();
    const navigate = useNavigate();
    const pathname = useHashPathname();

    return <>
        <p>pathname: {pathname}</p>
        <p>Edit Password Modal id: {id}</p>
        <button type="button" onClick={() => navigate({hash: undefined})}>Close HashModal</button>
    </>;
};

export default EditPassword;
