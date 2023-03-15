import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { addNotesToDb } from '../../../slice/userSlice';

import { Profile, Loading } from '../../index';

export const AppHeader = () => {
    const dispatch = useDispatch();

    const loading = useSelector(state => state.users.loading);
    const isAuth = useSelector(state => state.users.isAuth);

    const [active, setActrive] = useState(false);

    const spinner = useMemo(
        () => (loading ? <Loading /> : null),
        [isAuth, loading]
    );
    const profile = useMemo(() => isAuth && !loading ? <Profile /> : null, [isAuth, loading]);
    const registration = useMemo(() => !isAuth && !loading  ? <Registration /> : null ,[loading, isAuth])

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
