import React from 'react';
import {useHashParams, useHashPathname} from '@acrool/react-router-hash';
import {useNavigate} from 'react-router-dom';
import styled from "styled-components";

const EditAccountModal = () => {
    const {id} = useHashParams<{id: string}>();
    const navigate = useNavigate();
    const pathname = useHashPathname();
    return <>

        <p>hash pathname: {pathname}</p>
        <p>useHashParams id: {id}</p>
        <button type="button" onClick={() => navigate({hash: undefined})}>Close HashModal</button>
    </>;
};

export default EditAccountModal;

