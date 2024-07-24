# Acrool React Router Hash

<a href="https://acrool-react-router-hash.pages.dev/" title="Acrool React Router Hash - Hash Route + History Route Additional based for React Route v6">
    <img src="https://raw.githubusercontent.com/acrool/acrool-react-router-hash/main/example/public/og.webp" alt="Acrool React Router Hash Logo"/>
</a>

<p align="center">
    Hash Route + History Route Additional based for React Route v6
</p>

<div align="center">

[![NPM](https://img.shields.io/npm/v/@acrool/react-router-hash.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-router-hash)
[![npm](https://img.shields.io/bundlejs/size/@acrool/react-router-hash?style=for-the-badge)](https://github.com/acrool/@acrool/react-router-hash/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/l/@acrool/react-router-hash?style=for-the-badge)](https://github.com/acrool/react-router-hash/blob/main/LICENSE)

[![npm downloads](https://img.shields.io/npm/dm/@acrool/react-router-hash.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-router-hash)
[![npm](https://img.shields.io/npm/dt/@acrool/react-router-hash.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-router-hash)


</div>

> with react-router-dom version 6.x 


## Features

- With react-router-dom version 6.x
- In CSR, it is easy to implement the light box routing function
- Modified and enhanced HashRouter function by react-router-dom, supports path params
- Extract the shared optical box to the router to separate dependencies
- With [@acrool/react-modal](https://github.com/acrool/acrool-react-modal) to support persistent lightbox

## Install

```bash
yarn add @acrool/react-router-hash
```

## Usage


```tsx
import {Route, Routes, useLocation} from 'react-router-dom';
import {HashRoutes, HashRoute} from '@acrool/react-router-hash';
import {unstable_HistoryRouter as Router} from "react-router-dom";

const history = createBrowserHistory({window});


const MainRouter = () => {
    return <Router history={history}>

        {/* Base pathname */}
        <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="*" element={<NotFound/>}/>
        </Routes>


        {/* Hash pathname*/}
        <HashRoutes>
            <HashRoute path="login" element={<Login/>}/>

            <HashRoute path="control/*" element={<EditLayout/>}>
                <HashRoute path="editAccount/:id" element={<EditAccount/>}/>
                <HashRoute path="editPassword" element={<EditPassword/>}/>
            </HashRoute>
        </HashRoutes>

    </Router>
};


import {useHashParams} from '@acrool/react-router-hash';


const Dashboard = () => {
    const navigate = useNavigate();

    return  <div>
        <h2>Dashboard</h2>
        <p>This page dashboard.</p>
        <button type="button" onClick={() => navigate({hash: '/control/editAccount/1'})}>EditAccount HashModal</button>
        <button type="button" onClick={() => navigate({hash: '/control/editPassword'})}>EditPassword HashModal</button>
    </div>;
};

const EditAccount = () => {
    const {id} = useHashParams<{id: string}>();
    const navigate = useNavigate();
    const pathname = useHashPathname();
    
    return <>
        <p>hash pathname: {pathname}</p>
        <p>useHashParams id: {id}</p>
        <button type="button" onClick={() => navigate({hash: undefined})}>Close HashModal</button>
    </>;
};
```


There is also a example that you can play with it:

[![Play react-editext-example](https://raw.githubusercontent.com/acrool/acrool-react-router-hash/main/play-in-example-button.svg)](https://acrool-react-router-hash.pages.dev)



## License

MIT © [Acrool](https://github.com/acrool) & [Imagine](https://github.com/imagine10255)
