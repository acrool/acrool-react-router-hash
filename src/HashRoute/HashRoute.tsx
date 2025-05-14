import React from 'react';
import {IndexRouteProps, LayoutRouteProps, PathRouteProps, RouteObject} from 'react-router-dom';

import {invariant} from '../utils';

/**
 * Create Routes From Children
 * @see https://github.com/remix-run/react-router/blob/v6.3.0//packages/react-router/lib/components.tsx#L270
 * @param children
 */
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
                createRoutesFromChildren((element.props as any).children)
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
            caseSensitive: (element.props as any).caseSensitive,
            element: (element.props as any).element,
            index: (element.props as any).index,
            path: (element.props as any).path,
        };

        if ((element.props as any).children) {
            route.children = createRoutesFromChildren((element.props as any).children);
        }

        routes.push(route);
    });

    return routes;
}


/**
 * Hash Route
 * @see https://github.com/remix-run/react-router/blob/v6.3.0//packages/react-router/lib/components.tsx#L144
 * @param _props
 * @constructor
 */
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
