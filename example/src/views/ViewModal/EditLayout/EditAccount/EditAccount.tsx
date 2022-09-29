import React from 'react';
import {useHashParams, useHashPathname} from 'bear-react-router-hash';
import {useNavigate} from 'react-router-dom';

const EditAccount = () => {
    const {id} = useHashParams<{id: string}>();
    const navigate = useNavigate();
    const pathname = useHashPathname();
    return <>
        <p>pathname: {pathname}</p>
        <p>Edit Account Modal id: {id}</p>
        <button type="button" onClick={() => navigate({hash: undefined})}>Close HashModal</button>
    </>;
};

export default EditAccount;
