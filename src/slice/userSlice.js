import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence,
    signOut
} from 'firebase/auth';
import { notesSetNotes } from './notesSlice';
import {
    collection,
    doc,
    setDoc,
    getDoc,
    updateDoc
} from 'firebase/firestore/lite';
import { db, auth } from '../auth/firebase.config';

const initialState = {
    user: {},
    registrationInfo: {},
    isRegistration: false,
    isAuth: false,
    loading: false,
    checkRedirect: false,
    errorMessage: ''
};

export const addNotesToDb = createAsyncThunk(
    'users/add',
    async (notes, { getState }) => {
        const state = getState();

        const notesDb = doc(db, 'users', state.users.user.id);
        await updateDoc(notesDb, {
            notes: notes
        });
    }
);

export const userLogin = createAsyncThunk(
    'users/login',
    async (user, { rejectWithValue, dispatch }) => {
        try {
            await setPersistence(auth, browserSessionPersistence);
            const userCredential = await signInWithEmailAndPassword(
                auth,
                user.email,
                user.password
            );

            const docRef = doc(db, 'users', userCredential.user.uid);
            const data = (await getDoc(docRef)).data();
            dispatch(notesSetNotes(data.notes));
            dispatch(usersChangeRedirect(true));

            return data;
        } catch (error) {
            const parseError = error.message
                .match(/[^()]+(?=\))/g)
                .join('')
                .split('/')[1];
            return rejectWithValue(parseError);
        }
    }
);

export const userLogout = createAsyncThunk('users/logout', async () => {
    try {
        await signOut(auth);
        document.location.reload();
    } catch (error) {}
});

export const userRegistration = createAsyncThunk(
    'users/registration',
    async (user, { rejectWithValue, dispatch }) => {
        try {
            const data = await createUserWithEmailAndPassword(
                auth,
                user.email,
                user.password
            );
            await setPersistence(auth, browserSessionPersistence);

            const citiesRef = collection(db, 'users');
            // Signed in
            await setDoc(doc(citiesRef, data.user.uid), {
                id: data.user.uid,
                name: user.login,
                email: user.email,
                notes: []
            });

            const docRef = doc(db, 'users', data.user.uid);

            dispatch(usersChangeRedirect(true));

            return (await getDoc(docRef)).data();
        } catch (error) {
            const parseError = error.message
                .match(/[^()]+(?=\))/g)
                .join('')
                .split('/')[1];
            return rejectWithValue(parseError);
        }
    }
);

export const checkAuth = createAsyncThunk(
    'users/checkAuth',
    async (user, { dispatch }) => {
        const docRef = doc(db, 'users', user.uid);
        const docData = await getDoc(docRef);
        const data = docData.data();

        dispatch(notesSetNotes(data.notes));

        return data;
    }
);

const users = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersRegistrationInfo: (state, action) => {
            state.registrationInfo = {};
        },
        usersSetInfo: (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
        },
        usersChangeRedirect: (state, action) => {
            state.checkRedirect = action.payload;
        }, 
		usersErrorMessage: (state, action) => {
			state.errorMessage = action.payload;
		}
    },
    extraReducers: {
        [userLogin.pending]: state => {
            state.loading = true;
        },
        [userLogin.fulfilled]: (state, action) => {
            state.loading = false;
            state.isAuth = true;
            state.viewComeIn = false;
            state.user = action.payload;
            state.registrationInfo = {
                text: `Ласкаво Просимо ${action.payload.name}!`
            };
        },
        [userLogin.rejected]: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload;
        },
        [userRegistration.pending]: (state, action) => {
            state.loading = true;
        },
        [userRegistration.fulfilled]: (state, action) => {
            state.isAuth = true;
            state.viewSignIn = false;
            state.loading = false;
            state.user = action.payload;
            state.registrationInfo = {
                text: `Ви успішно зареєструвались!`
            };
        },
        [userRegistration.rejected]: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload;
        },
        [userLogout.pending]: (state, action) => {
            state.loading = true;
        },
        [userLogout.fulfilled]: (state, action) => {
            state.isAuth = false;
            state.loading = false;
            state.user = {};
            state.registrationInfo = {
                text: `Ви покинули аккаунт!`
            };
        },
        [checkAuth.pending]: (state, action) => {
            state.loading = true;
        },
        [checkAuth.fulfilled]: (state, action) => {
            state.loading = false;
            state.isAuth = true;
            state.user = action.payload;
        },
        [checkAuth.rejected]: (state, action) => {
            state.loading = false;
            state.isRegistration = true;
        }
    }
});

const { actions, reducer } = users;

export default reducer;

export const {
    usersRegistrationInfo,
    usersSetInfo,
    usersChangeRedirect,
    usersErrorMessage
} = actions;
