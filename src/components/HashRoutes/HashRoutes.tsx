import React from 'react';
import {matchRoutes, RouteMatch, RouteObject, useInRouterContext, useLocation} from 'react-router-dom';
import {parsePath} from 'history';
import {HashRouteContext} from '../../context';
import {invariant, warning, warningOnce, createRoutesFromChildren, joinPaths} from '../../utils';



interface IProps{
    children?: React.ReactNode;
    location?: Partial<Location> | string;
}

const __DEV__ = process.env.NODE_ENV !== 'production';

export function _renderMatches(
    matches: RouteMatch[] | null,
    parentMatches: RouteMatch[] = []
): React.ReactElement | null {
    if (matches == null) return null;

    return matches.reduceRight((outlet, match, index) => {
        return (
            <HashRouteContext.Provider
                children={
                    match.route.element !== undefined ? match.route.element : outlet
                }
                value={{
                    outlet,
                    matches: parentMatches.concat(matches.slice(0, index + 1)),
                }}
            />
        );
    }, null as React.ReactElement | null);
}


export function useHashRoutes(
    routes: RouteObject[],
    locationArg?: Partial<Location> | string
): React.ReactElement | null {
    invariant(
        useInRouterContext(),
        // TODO: This error is probably because they somehow have 2 versions of the
        // router loaded. We can help them understand how to avoid that.
        'useHashRoutes() may be used only in the context of a <HashRouter> component.'
    );

    let {matches: parentMatches} = React.useContext(HashRouteContext);
    let routeMatch = parentMatches[parentMatches.length - 1];
    let parentParams = routeMatch ? routeMatch.params : {};
    let parentPathname = routeMatch ? routeMatch.pathname : '/';
    let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : '/';
    let parentRoute = routeMatch && routeMatch.route;

    if (__DEV__) {
        // You won't get a warning about 2 different <Routes> under a <Route>
        // without a trailing *, but this is a best-effort warning anyway since we
        // cannot even give the warning unless they land at the parent route.
        //
        // Example:
        //
        // <HashRoutes>
        //   {/* This route path MUST end with /* because otherwise
        //       it will never match #/blog/post/123 */}
        //   <HashRoute path="blog" element={<Blog />} />
        //   <HashRoute path="blog/feed" element={<BlogFeed />} />
        // </HashRoutes>
        //
        // function Blog() {
        //   return (
        //     <HashRoutes>
        //       <HashRoute path="post/:id" element={<Post />} />
        //     </HashRoutes>
        //   );
        // }
        let parentPath = (parentRoute && parentRoute.path) || '';
        warningOnce(
            parentPathname,
            !parentRoute || parentPath.endsWith('*'),
            'You rendered descendant <HashRoutes> (or called `useRoutes()`) at ' +
            `"${parentPathname}" (under <HashRoute path="${parentPath}">) but the ` +
            'parent route path has no trailing "*". This means if you navigate ' +
            'deeper, the parent won\'t match anymore and therefore the child ' +
            'routes will never render.\n\n' +
            `Please change the parent <HashRoute path="${parentPath}"> to <HashRoute ` +
            `path="${parentPath === '/' ? '*' : `${parentPath}/*`}">.`
        );
    }

    let locationFromContext = useLocation();

    let location;
    if (locationArg) {
        let parsedLocationArg =
            typeof locationArg === 'string' ? parsePath(locationArg) : locationArg;

        invariant(
            parentPathnameBase === '/' ||
            parsedLocationArg.pathname?.startsWith(parentPathnameBase),
            'When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, ' +
            'the location pathname must begin with the portion of the URL pathname that was ' +
            `matched by all parent routes. The current pathname base is "${parentPathnameBase}" ` +
            `but pathname "${parsedLocationArg.pathname}" was given in the \`location\` prop.`
        );

        location = parsedLocationArg;
    } else {
        location = locationFromContext;
    }

    let pathname = location.hash || '/';
    let remainingPathname =
        parentPathnameBase === '#'
            ? pathname
            : pathname.slice(parentPathnameBase.length) || '/';
    let matches = matchRoutes(routes, {pathname: remainingPathname});

    if (__DEV__) {
        warning(
            parentRoute || matches != null,
            `No routes matched location "${location.pathname}${location.search}${location.hash}" `
        );

        warning(
            matches == null ||
            matches[matches.length - 1].route.element !== undefined,
            `Matched leaf route at location "${location.pathname}${location.search}${location.hash}" does not have an element. ` +
            'This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.'
        );
    }

    return _renderMatches(
        matches &&
        matches.map((match) =>
            Object.assign({}, match, {
                params: Object.assign({}, parentParams, match.params),
                pathname: joinPaths([parentPathnameBase, match.pathname]),
                pathnameBase:
                    match.pathnameBase === '/'
                        ? parentPathnameBase
                        : joinPaths([parentPathnameBase, match.pathnameBase]),
            })
        ),
        parentMatches
    );
}


/**
 * Hash 用路由器s
 * @param path 路由路徑
 */
function HashRoutes({
    children,
    location,
}: IProps) {
    const data = createRoutesFromChildren(children);
    return useHashRoutes(data, location);
}

export default HashRoutes;
