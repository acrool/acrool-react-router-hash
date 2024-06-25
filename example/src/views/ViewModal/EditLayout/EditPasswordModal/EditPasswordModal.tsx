import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useHashParams, useHashPathname} from '@acrool/react-router-hash';

const EditPasswordModal = () => {
    const {id} = useHashParams<{id: string}>();
    const navigate = useNavigate();
    const pathname = useHashPathname();

    return <>
        <p>hash pathname: {pathname}</p>
        <p>useHashParams id: {id}</p>
        <button type="button" onClick={() => navigate({hash: undefined})}>Close HashModal</button>
    </>;
};

export default EditPasswordModal;
