import { useState, useRef, useMemo, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { notesSetNotes } from '../../../slice/notesSlice';
import { AddSingleNotes, AddList } from '../../index';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { v4 } from 'uuid';


import { ReactComponent as PlusIcon } from './plus.svg';
import { ReactComponent as List } from './list.svg';
import { ReactComponent as Single } from './single.svg';

export const AddNotes = memo(() => {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.notes);

    const [showError, setShowError] = useState(false);
    const [toggleAddNotes, setToggleAddNotes] = useState(0);
    let [notesValue, setNotesValue] = useState({
        title: '',
        text: '',
        color: '#e3e3e3'
    });
    const [list, setList] = useState({ title: '', list: [] });

    const title = useRef('');
    const text = useRef('');


    function addNotes(newNotes, resetForm) {
        const id = v4();
		const newItem = { id: id, ...newNotes }
        if (!checkOnValue(newNotes)) return false;

        dispatch(notesSetNotes([newItem, ...notes]));

        resetForm();
        title.current = '';
        text.current = '';
    }

    function checkOnValue(newNotes) {
        if (
            (newNotes.title === '' && newNotes.text === '') ||
            newNotes.title === ''
        ) {
            setShowError(true);
            setNotesValue({ title: '', text: '' });

            setTimeout(() => {
                setShowError(false);
            }, 1500);

            return false;
        }
        return true;
    }

    function resetFormNotes(e) {
        setToggleAddNotes(e);
        setNotesValue({ ...notesValue, title: '', text: '' });
        setList({ title: '', list: [] });
        title.current = '';
        text.current = '';
    }

    function removeAllAnimation() {
        let a = document.querySelector('.add-notes__wave');
        if (a !== null) a.remove();
    }

    function addAnimation() {
        removeAllAnimation();
        const container = document.querySelector('.add-notes__wave-wrap');
        const div = document.createElement('div');
        div.classList.add('add-notes__wave');
        container.appendChild(div);
        setTimeout(() => div.remove(), 1000);
    }

    return (
        <div className='add-notes'>
            <div className='add-notes__top'>
                <button
                    className='add-notes__btn'
                    onClick={() => {
                        if (toggleAddNotes) {
                            addNotes(
                                list,
                                setList.bind(this, { title: '', list: [] })
                            );
                        } else {
                            addNotes(
                                notesValue,
                                setNotesValue.bind(this, {
                                    ...notesValue,
                                    title: '',
                                    text: ''
                                })
                            );
                        }
                        addAnimation();
                    }}
                >
                    <PlusIcon />
                </button>
                <div className='add-notes__wave-wrap'></div>
            </div>
            <div className='add-notes__bottom'>
                <Carousel
                    renderArrowNext={(handler, arrow) => (
                        <button
                            className='add-notes__next'
                            style={{ opacity: arrow ? '0.4' : '0.8' }}
                            onClick={handler}
                        >
                            <List />
                        </button>
                    )}
                    renderArrowPrev={(handler, arrow) => (
                        <button
                            className='add-notes__prev'
                            style={{ opacity: arrow ? '0.4' : '0.8' }}
                            onClick={handler}
                        >
                            <Single />
                        </button>
                    )}
                    swipeScrollTolerance={100}
                    showIndicators={false}
                    showThumbs={false}
                    onChange={e => resetFormNotes(e)}
                    showStatus={false}
                >
                    {useMemo(
                        () => (
                            <AddSingleNotes
                                showError={showError}
                                notesValue={notesValue}
                                setNotesValue={setNotesValue}
                                addNotes={addNotes}
                                title={title}
                                text={text}
                            />
                        ),
                        [notesValue]
                    )}
                    {useMemo(
                        () => (
                            <AddList
                                list={list}
                                setList={setList}
                                title={title}
                            />
                        ),
                        [list]
                    )}
                </Carousel>
            </div>
        </div>
    );
});
