import { useEffect, useMemo } from 'react';
import { notesSetNotes } from '../../../slice/notesSlice';
import { useDispatch, useSelector } from 'react-redux';

import { addNotesToDb } from '../../../slice/userSlice';
import { EditNotice, CardNotes, Loading } from '../../index';
import { LayoutGroup } from 'framer-motion';

import { auth } from '../../../auth/firebase.config';
import { checkAuth } from '../../../slice/userSlice';

export const RenderNotes = () => {
    const dispatch = useDispatch();

    const loading = useSelector(state => state.users.loading);
    const notes = useSelector(state => state.notes.notes);
    const filteredNotes = useSelector(state => state.notes.filteredNotes);
    const checkVieEdit = useSelector(state => state.edit.checkVieEdit);
    const isAuth = useSelector(state => state.users.isAuth);

    useEffect(() => {
        const unsubsrube = auth.onAuthStateChanged(user => {
			dispatch(checkAuth(user));
			if (!user) {
				dispatch(checkAuth(user));
                if (localStorage.getItem('notes') !== null) {
                    dispatch(
                        notesSetNotes(JSON.parse(localStorage.getItem('notes')))
                    );
                }
            } 
        });

        return unsubsrube;
    }, []);

    useEffect(() => {
        if (isAuth && !loading) {
            dispatch(addNotesToDb(notes));
        }

		if (notes.length > 0 && !isAuth && !loading) {
            localStorage.removeItem('notes');
            localStorage.setItem('notes', JSON.stringify(notes));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notes, loading, isAuth]);


    const renderItems = useMemo(() => {
        return filteredNotes
            .filter(({ fixed }) => !fixed)
            .map((notes) => {
                return (
                    <CardNotes
                        layout
                        key={notes.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        notesInfo={notes}
                    />
                );
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredNotes]);

    const renderFixedItems = useMemo(() => {
        return filteredNotes
            .filter(({ fixed }) => fixed)
            .map(notes => {
                return (
                    <CardNotes
                        layout
                        key={notes.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        notesInfo={notes}
                    />
                );
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredNotes]);

    function renderItem(cards) {
        const renderFixed =
            loading && !isAuth ? (
                <Loading />
            ) : (
                <LayoutGroup>{cards}</LayoutGroup>
            );

        return renderFixed;
    }

    return (
        <div className='render-notes'>

            {renderFixedItems.length !== 0 ? (
                <h2 className='render-notes__title'>Закріплені нотатки:</h2>
            ) : null}

            <div className='render-notes__inner'>
                {renderItem(renderFixedItems)}
            </div>

            <h2 className='render-notes__title'>Всі нотатки:</h2>

            <div className='render-notes__inner'>{renderItem(renderItems)}</div>

            {checkVieEdit && <EditNotice />}
        </div>
    );
};
