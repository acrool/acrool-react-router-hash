import React from 'react';
import {IndexRouteProps, LayoutRouteProps, PathRouteProps, RouteObject} from 'react-router-dom';
import {invariant} from '../../utils';


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
