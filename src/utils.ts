import React from 'react';
import {RouteObject} from 'react-router-dom';
import HashRoute from './components/HashRoute';

export function invariant(cond: any, message: string): asserts cond {
    if (!cond) throw new Error(message);
}

export function warning(cond: any, message: string): void {
    if (!cond) {
        // eslint-disable-next-line no-console
        if (typeof console !== 'undefined') console.warn(message);

        try {
            // Welcome to debugging React Router!
            //
            // This error is thrown as a convenience so you can more easily
            // find the source for a warning that appears in the console by
            // enabling "pause on exceptions" in your JavaScript debugger.
            throw new Error(message);
            // eslint-disable-next-line no-empty
        } catch (e) {}
    }
}

const alreadyWarned: Record<string, boolean> = {};
export function warningOnce(key: string, cond: boolean, message: string) {
    if (!cond && !alreadyWarned[key]) {
        alreadyWarned[key] = true;
        warning(false, message);
    }
}



export function createRoutesFromChildren(
    children: React.ReactNode
): RouteObject[] {
    let routes: RouteObject[] = [];

    React.Children.forEach(children, (element) => {
        if (!React.isValidElement(element)) {
            // Ignore non-elements. This allows people to more easily inline
            // conditionals in their route config.
            return;
        }

        if (element.type === React.Fragment) {
            // Transparently support React.Fragment and its children.
            routes.push.apply(
                routes,
                createRoutesFromChildren(element.props.children)
            );
            return;
        }

        invariant(
            element.type === HashRoute,
            `[${
                typeof element.type === 'string' ? element.type : element.type.name
            }] is not a <HashRoute> component. All component children of <HashRoutes> must be a <HashRoute> or <React.Fragment>`
        );

        let route: RouteObject = {
            caseSensitive: element.props.caseSensitive,
            element: element.props.element,
            index: element.props.index,
            path: element.props.path,
        };

        if (element.props.children) {
            route.children = createRoutesFromChildren(element.props.children);
        }

        routes.push(route);
    });

    return routes;
}


export const joinPaths = (paths: string[]): string =>
    paths.join('/').replace(/\/\/+/g, '/');
