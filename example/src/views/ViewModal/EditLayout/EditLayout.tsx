import React from 'react';
import {HashOutlet} from 'bear-react-router-hash';

const EditLayout = () => {


    return <div>
        <header>

            <h2>Modal Layout Header</h2>
        </header>
        <HashOutlet/>
        <footer>
            Modal Layout Footer
        </footer>
    </div>;
};

export default EditLayout;
