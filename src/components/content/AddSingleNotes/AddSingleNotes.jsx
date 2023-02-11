import { memo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { EditableInput } from '../../index';

export const AddSingleNotes = memo(
    ({ showError, notesValue, setNotesValue, addNotes, title, text }) => {
        const disabledButton = useSelector(state => state.notes.disabledButton);

        const focusInStartPage = useRef(null);
        const focusNextInput = useRef(null);

        useEffect(() => {
            focusInStartPage.current.focus();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return (
            <div className='add-single-notes'>
                <p className='add-single-notes__text'>Добавити нотаток</p>
                <EditableInput
                    className='add-single-notes__title add-single-notes_placeholder add-single-notes_border'
                    classnameoption={{ 'add-single-notes__error': showError }}
                    data-placeholder='Назва'
                    html={notesValue.title}
                    ref={focusInStartPage}
                    disabled={disabledButton}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            focusNextInput.current.focus();
                        }
                    }}
                    onChange={e => {
						title.current = e.target.value
					}}
                    onBlur={() =>{
                        setNotesValue({ ...notesValue, title: title.current })
                    }}
                />
                <EditableInput
                    className='add-single-notes__text-area add-single-notes_placeholder add-single-notes_border'
                    classnameoption={{ 'add-single-notes__error': showError }}
                    data-placeholder='Текст'
                    html={notesValue.text}
                    ref={focusNextInput}
                    disabled={disabledButton}
                    onKeyDown={ e => {
                        if (e.key === 'Enter') {
                            focusNextInput.current.blur();
                            addNotes(notesValue);
                        }
                    }}
                    onChange={e => {
                        text.current = e.target.value;
                        setNotesValue({ ...notesValue, text: text.current });
                    }}
                    onBlur={() => {
						if(text.current === '') return false;
                        setNotesValue({ ...notesValue, text: text.current })
                    }}
                />
            </div>
        );
    }
);
