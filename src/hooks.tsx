import React from 'react';
import {HashOutletContext, HashRouteContext} from './context';
import {Params} from 'react-router-dom';




/**
 * Returns the context (if provided) for the child route at this level of the route
 * hierarchy.
 * @see https://reactrouter.com/docs/en/v6/api#useoutletcontext
 */
export function useHashOutletContext<Context = unknown>(): Context {
    return React.useContext(HashOutletContext) as Context;
}


export function useHashOutlet(context?: unknown): React.ReactElement | null {
    let outlet = React.useContext(HashRouteContext).outlet;
    if (outlet) {
        return (
            <HashOutletContext.Provider value={context}>{outlet}</HashOutletContext.Provider>
        );
    }
    return outlet;
}


export function useHashParams<
    ParamsOrKey extends string | Record<string, string | undefined> = string
    >(): Readonly<
    [ParamsOrKey] extends [string] ? Params<ParamsOrKey> : Partial<ParamsOrKey>
    > {
    let {matches} = React.useContext(HashRouteContext);
    let routeMatch = matches[matches.length - 1];
    return routeMatch ? (routeMatch.params as any) : {};
}


