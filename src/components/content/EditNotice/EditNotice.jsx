import { useState, forwardRef, useMemo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { notesSetNotes } from '../../../slice/notesSlice';
import {
    editCheckVie,
    editToggleForEmpty
} from '../../../slice/editNotesSlice';

import { motion } from 'framer-motion';
import { CardList, EditableInput } from '../../index';

import { v4 } from 'uuid';

export const EditNotice = () => {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.notes);
    const edit = useSelector(state => state.edit.editValue);
    const checkForEmpty = useSelector(state => state.edit.checkForEmpty);

    const [editValue, setEditValue] = useState(edit);
    const [oldValue, setOldValue] = useState(edit);

    const editTitle = useRef(editValue.title);
    const editText = useRef(editValue.text || '');
	
    function compliteEditNotes(editValue) {
        if (editValue.title === '') {
            dispatch(editToggleForEmpty(!checkForEmpty));
            return;
        }

        const newNotes = notes.map(item => {
            if (item.id === editValue.id) {
                return editValue;
            }
            return item;
        });

        dispatch(editCheckVie(false));
        dispatch(notesSetNotes(newNotes));
        dispatch(editToggleForEmpty(!checkForEmpty));
        document.body.style.overflow = '';
    }

    return (
        <div className='edit'>
            <div className='edit__cover'></div>
            <motion.div
                initial={{
                    transform: 'scale(0.4) translate(-50%, -50%)'
                }}
                animate={{
                    transform: 'scale(1) translate(-50%, -50%)'
                }}
                transition={{ delay: 0.1, type: 'spring' }}
                className='edit__wrapper'
            >
                <h2 className='edit__warning'>
                    {!checkForEmpty
                        ? 'Змініть Заголовок або Текст нотатки!'
                        : "Введіть 'Назву' нотатки"}
                </h2>
                <div className='edit__form'>
					<div className="edit__box">
						<div className='edit__btns'>
							<button
								className='edit__form-btn'
								onClick={() => {
									compliteEditNotes(editValue);
								}}
							>
								Зберегти
							</button>
							<button
								className='edit__form-btn'
								onClick={() => {
									dispatch(editCheckVie(false));
									compliteEditNotes(oldValue);
									document.body.style.overflow = '';
								}}
							>
								Відміна
							</button>
						</div>
						<EditableInput
							className='edit__input'
							html={editValue.title}
							onChange={e =>
								(editTitle.current = e.target.value)
							}
							onBlur={() =>
								setEditValue({
									...editValue,
									title: editTitle.current
								})
							}
						/>

					</div>
                    {!editValue.list ? (
                        <>

                            <EditableInput
                                className='edit__text-area'
                                html={editValue.text}
                                onChange={e =>
                                    (editText.current = e.target.value)
                                }
                                onBlur={() =>
                                    setEditValue({
                                        ...editValue,
                                        text: editText.current
                                    })
                                }
                            />
                        </>
                    ) : (
                        <>
                            <div className='edit__list'>
                                <CardList
                                    notesList={editValue}
                                    setList={setEditValue}
                                />
                                <EditableInput
                                    className='edit__add-list'
                                    html={editText.current}
                                    onChange={e =>
                                        (editText.current = e.target.value)
                                    }
									onKeyPress={e => {
										if (editText.current === '') return;
										if(e.key === 'Enter'){
                                            setEditValue({
                                                ...editValue,
                                                list: [
                                                    {
                                                        id: v4(),
                                                        text: editText.current,
                                                        complete: false
                                                    },
                                                    ...editValue.list
                                                ]
                                            });
                                            editText.current = '';
										}
									}}
                                    onBlur={e => {
                                        if (editText.current === '') return;
                                        setEditValue({
                                            ...editValue,
                                            list: [
                                                {
                                                    id: v4(),
                                                    text: editText.current,
                                                    complete: false
                                                },
                                                ...editValue.list
                                            ]
                                        });
                                        editText.current = '';
                                    }}
                                />
                            </div>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
