import {configureStore} from '@reduxjs/toolkit';
import notes from '../slice/notesSlice';
import edit from '../slice/editNotesSlice'
import users from '../slice/userSlice';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
};

const store = configureStore({
    reducer: {notes, edit, users},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;