import React from 'react';
import {Params, useLocation} from 'react-router-dom';

import {HashOutletContext, HashRouteContext} from './context';




/**
 * Returns the context (if provided) for the child route at this level of the route
 * hierarchy.
 * @see https://reactrouter.com/docs/en/v6/api#useoutletcontext
 * @see https://github.com/remix-run/react-router/blob/v6.3.0/packages/react-router/lib/hooks.tsx#L203
 */
export function useHashOutletContext<Context = unknown>(): Context {
    return React.useContext(HashOutletContext) as Context;
}


/**
 * use Hash Outlet
 * @see https://github.com/remix-run/react-router/blob/v6.3.0/packages/react-router/lib/hooks.tsx#L213
 * @param context
 */
export function useHashOutlet(context?: unknown): React.ReactElement | null {
    let outlet = React.useContext(HashRouteContext).outlet;
    if (outlet) {
        return (
            <HashOutletContext.Provider value={context}>{outlet}</HashOutletContext.Provider>
        );
    }
    return outlet;
}


/**
 * use Hash Params
 * @see https://github.com/remix-run/react-router/blob/v6.3.0/packages/react-router/lib/hooks.tsx#L229
 */
export function useHashParams<Params extends { [K in keyof Params]?: string } = {}>(): Params {
    let {matches} = React.useContext(HashRouteContext);
    let routeMatch = matches[matches.length - 1];
    return routeMatch ? (routeMatch.params as any) : {} as any;
}


/**
 * use Hash Pathname
 * @see https://github.com/remix-run/react-router/blob/v6.3.0/packages/react-router/lib/hooks.tsx#L74
 */
export function useHashPathname(): string {
    const hash = useLocation()?.hash;
    if(hash){
        return hash.replace('#', '');
    }

    return '';
}
