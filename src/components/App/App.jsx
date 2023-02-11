import React from 'react';

import { Routes, Route} from 'react-router-dom'

import { Main } from '../../pages/Main';
import { Registration } from '../../pages/Registration';


const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/login' element={<Registration />} />
        </Routes>
    );
};

export default App;
