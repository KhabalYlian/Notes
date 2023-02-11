import { useEffect, useState } from 'react';
import { notesFiltered, notesToggleDisabled } from '../../../slice/notesSlice';
import { useDispatch, useSelector } from 'react-redux';

export const SearchNotes = () => {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.notes);
    const [text, setText] = useState('');

    function filterNotes(notes, target) {
        let filtered = notes.filter(item => item.title.includes(target));
        dispatch(notesFiltered(filtered));

        if (target.length > 0) dispatch(notesToggleDisabled(true));
        else dispatch(notesToggleDisabled(false));
    }

    const debounce = (fn, ms) => {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);

            timeout = setTimeout(() => {
                fn.apply(this, args);
            }, ms);
        };
    };

    useEffect(() => {
        filterNotes(notes, text);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notes]);

    const debounceNotes = debounce(filterNotes, 300);
    return (
        <div className='search-notes'>
            <input
                className='search-notes__input'
                placeholder='Шукати нотатку'
                onChange={e => {
                    debounceNotes(notes, e.target.value);
                    setText(e.target.value);
                }}
            ></input>
        </div>
    );
};
