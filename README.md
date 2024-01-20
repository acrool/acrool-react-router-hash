# bear-react-router-hash

<p align="center">
    Hash Route + History Route Additional based for React Route v6
</p>

<div align="center">

[![NPM](https://img.shields.io/npm/v/bear-react-router-hash.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-react-router-hash)
[![npm downloads](https://img.shields.io/npm/dm/bear-react-router-hash.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-react-router-hash)
[![npm](https://img.shields.io/npm/dt/bear-react-router-hash.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-react-router-hash)
[![npm](https://img.shields.io/npm/l/bear-react-router-hash?style=for-the-badge)](https://github.com/imagine10255/bear-react-router-hash/blob/main/LICENSE)

</div>


> with react-router-dom version 6.x 


## Install

```bash
yarn add bear-react-router-hash
```

## Usage


```tsx
import {Route, Routes, useLocation} from 'react-router-dom';
import {HashRoutes, HashRoute} from 'bear-react-router-hash';
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


import {useHashParams} from 'bear-react-router-hash';


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
    return <>
        <p>EditAccount Modal id: {id}</p>
        <button type="button" onClick={() => navigate({hash: undefined})}>Close HashModal</button>
    </>;
};
```


## License

MIT © [imagine10255](https://github.com/imagine10255)
