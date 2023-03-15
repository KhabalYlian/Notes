import { useState, useRef, memo } from 'react';
import { useSelector } from 'react-redux';

import { CardList, EditableInput } from '../../index';

import { v4 } from 'uuid';

export const AddList = memo(({ list, setList, showError, title }) => {
    const disabledButton = useSelector(state => state.notes.disabledButton);

    const inputList = useRef('');
    const focusInput = useRef(null);

    function addItemToList() {
        if (inputList.current === '') return;
		
        setList({
            ...list,
            list: [
                { id: v4(), text: inputList.current, complete: false },
                ...list.list
            ]
        });
    }

	function addList(e) {
		e.preventDefault();
        addItemToList();
        inputList.current = '';
	}

    return (
        <div className='add-list'>
            <p className='add-list__text'>Добавити список</p>
            <EditableInput
                className='add-single-notes__title add-single-notes_placeholder add-single-notes_border'
                classnameoption={{ 'add-single-notes__error': showError }}
                data-placeholder='Назва'
                html={title.current}
                disabled={disabledButton}
                onChange={e => (title.current = e.target.value)}
                onBlur={() => {
					if(title.current === '') return false;
					setList({ ...list, title: title.current })}
				}
            />
            <div className='add-list__wrapper'>
                <CardList notesList={list} setList={setList} />
                <EditableInput
                    className='add-list__input-list add-single-notes_placeholder'
                    data-placeholder='Добавити пункт'
                    html={inputList.current}
                    ref={focusInput}
                    onChange={e => {
                        inputList.current = e.target.value;
                    }}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            addList(e);
                        }
                    }}
                    onBlur={addList}
                />
            </div>
        </div>
    );
});
