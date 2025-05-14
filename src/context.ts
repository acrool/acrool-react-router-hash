import React from 'react';
import {RouteMatch} from 'react-router-dom';

interface HashRouteContextObject {
    outlet: React.ReactElement | null
    matches: RouteMatch[]
}


export const HashRouteContext = React.createContext<HashRouteContextObject>({
    outlet: null,
    matches: [],
});

export const HashOutletContext = React.createContext<unknown>(null);



if (process.env.NODE_ENV !== 'production') {
    HashRouteContext.displayName = 'HashRoute';
    HashOutletContext.displayName = 'HashOutlet';
}


