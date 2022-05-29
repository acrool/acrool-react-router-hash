import React from 'react';
import {IndexRouteProps, LayoutRouteProps, PathRouteProps} from 'react-router-dom';
import {invariant} from '../../utils';


function HashRoute(
    _props: PathRouteProps | LayoutRouteProps | IndexRouteProps
): React.ReactElement | null {
    invariant(
        false,
        'A <HashRoute> is only ever to be used as the child of <HashRoutes> element, ' +
        'never rendered directly. Please wrap your <HashRoute> in a <HashRoutes>.'
    );
}

export default HashRoute;
