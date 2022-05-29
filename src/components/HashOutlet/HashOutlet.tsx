import React from 'react';
import {OutletProps} from 'react-router-dom';
import {useHashOutlet} from '../../hooks';



function HashOutlet(props: OutletProps): React.ReactElement | null {
    return useHashOutlet(props.context);
}

export default HashOutlet;
