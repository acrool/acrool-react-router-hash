import React from 'react';
import {OutletProps} from 'react-router-dom';

import {useHashOutlet} from '../hooks';


/**
 * Hash Outlet
 * @see https://github.com/remix-run/react-router/blob/715dd233bb57a65c563edd52c4ccd63f37745ddb/packages/react-router/lib/components.tsx#L109
 * @param props
 * @constructor
 */
function HashOutlet(props: OutletProps): React.ReactElement | null {
    return useHashOutlet(props.context);
}

export default HashOutlet;
