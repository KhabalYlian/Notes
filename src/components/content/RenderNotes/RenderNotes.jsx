import { useEffect, useMemo } from 'react';
import { notesSetNotes } from '../../../slice/notesSlice';
import { useDispatch, useSelector } from 'react-redux';

import { addNotesToDb } from '../../../slice/userSlice';
import { EditNotice, CardNotes, Loading } from '../../index';
import { LayoutGroup } from 'framer-motion';

export const RenderNotes = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.users.loading);
    const notes = useSelector(state => state.notes.notes);
    const filteredNotes = useSelector(state => state.notes.filteredNotes);
    const checkVieEdit = useSelector(state => state.edit.checkVieEdit);

    useEffect(() => {
        if (
            localStorage.getItem('notes') !== null &&
            sessionStorage.length === 0
        ) {
            dispatch(notesSetNotes(JSON.parse(localStorage.getItem('notes'))));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (sessionStorage.length === 0) {
            if (notes.length > 0) {
                localStorage.removeItem('notes');
                localStorage.setItem('notes', JSON.stringify(notes));
            } else {
                localStorage.removeItem('notes');
            }
        } else {
            dispatch(addNotesToDb(notes));
        }
    }, [notes]);

    //Рендерим елементи на сторінку

    const renderItems = useMemo(() => {
        return filteredNotes
            .filter(({ fixed }) => !fixed)
            .map(({ id, color, text, title, list }) => {
                return (
                    // <CSSTransition                    React Transition Group
                    // 	key={item.id}
                    // 	timeout={500}
                    // 	classNames="render-notes">
                    // 	<CardNotes objItem={item}/>
                    // </CSSTransition>
                    <CardNotes
                        layout
                        key={id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        notesInfo={{ id, color, text, title, list }}
                    />
                );
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredNotes]);

    const renderFixedItems = useMemo(() => {
        return filteredNotes
            .filter(({ fixed }) => fixed)
            .map(({ id, color, text, title, fixed, list }) => {

                return (
                    // <CSSTransition                            React Transition Group
                    //     key={item.id}
                    //     timeout={500}
                    //     classNames="render-notes">
                    //     <CardNotes objItem={item}/>
                    // </CSSTransition>

                    <CardNotes
                        layout
                        key={id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        notesInfo={{ id, color, text, title, list, fixed }}
                    />
                );
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredNotes]);

    return (
        <div className='render-notes'>
            {/* <TransitionGroup className={"render-notes__inner"}>          React Transition Group
			</TransitionGroup> */}

            {renderFixedItems.length !== 0 ? (
                <h2 className='render-notes__title'>Закріплені нотатки:</h2>
            ) : null}

            <div className='render-notes__inner'>
                {loading ? (
                    <Loading />
                ) : (
                    <LayoutGroup>{renderFixedItems}</LayoutGroup>
                )}
            </div>

            <h2 className='render-notes__title'>Всі нотатки:</h2>

            {/* <TransitionGroup className="render-notes__inner">           React Transition Group
            </TransitionGroup> */}
            <div className='render-notes__inner'>
                {loading ? (
                    <Loading />
                ) : (
                    <LayoutGroup>{renderItems}</LayoutGroup>
                )}
            </div>

            {checkVieEdit && <EditNotice />}

            {/* <CSSTransition
                in={checkVieEdit}
				classNames='edit'
                timeout={300}
                mountOnEnter
                unmountOnExit>

            	<EditNotice/>

            </CSSTransition> */}
        </div>
    );
};
