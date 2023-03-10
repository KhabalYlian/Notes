import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, addNotesToDb } from '../../../slice/userSlice';
import cn from 'classnames';
import { auth } from '../../../auth/firebase.config';

import { onIdTokenChanged } from 'firebase/auth';
import { Profile, Loading } from '../../index';

export const AppHeader = () => {
    const dispatch = useDispatch();

    const loading = useSelector(state => state.users.loading);
    const isAuth = useSelector(state => state.users.isAuth);
    const isRegistration = useSelector(state => state.users.isRegistration);

    const [active, setActrive] = useState(false);

    useEffect(() => {
        onIdTokenChanged(auth, userCredential => {
            dispatch(checkAuth(userCredential));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const spinner = loading ? <Loading /> : null;
    const profile = isAuth && !loading ? <Profile /> : null;
    const registration =
        isRegistration && !isAuth && !loading ? <Registration /> : null;

    return (
        <header className='app-header'>
            <div
                className={cn('app-header__wrapper', {
                    'app-header_open-menu': active
                })}
            >
                <p
                    onClick={() => {
						if(isAuth){
							dispatch(addNotesToDb([]));
						}else {
							localStorage.removeItem('notes');
						}
						window.location.reload();
                    }}
                    className='app-header__clear'
                >
                    Видалити всі нотатки
                </p>
                <div className='app-header__profile'>
                    {spinner}
                    {registration}
                    {profile}
                </div>
            </div>
            <div
                className={cn('app-header__burger-button', {
                    'app-header_open': active
                })}
                onClick={() => setActrive(!active)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </header>
    );
};

const Registration = () => {
    return (
        <div className='registration'>
            <a href='/login' className='registration__sing'>
                Ввійти
            </a>
        </div>
    );
};
