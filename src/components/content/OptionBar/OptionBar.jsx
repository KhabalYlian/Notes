import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { HelperFunctions } from '../../index';
import { Button } from '../../helpers/reusableComponents/ReusableComponents';

import { editSetValue, editCheckVie } from '../../../slice/editNotesSlice';
import { notesSetNotes } from '../../../slice/notesSlice';

import { ReactComponent as DeleteIcon } from './icons/trash.svg';
import { ReactComponent as EditIcon } from './icons/edit.svg';
import { ReactComponent as PaletteIcon } from './icons/palette.svg';

export const OptionBar = ({ id, setOpacity, children: ChooseColor }) => {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.notes);

    const [activeColor, setActiveColor] = useState(false);

    const { setEditValue, onDeleteItem } = HelperFunctions();

    useEffect(() => {
        document.body.addEventListener('click', e => {
            if (
                !e.target.classList.contains('choose-color-notice__inner') &&
                !e.target.classList.contains('option__choose-color')
            ) {
                setActiveColor(false);
            }
        });
    }, []);

    useEffect(() => {
        setOpacity(activeColor);
    }, [activeColor]);

    return (
        <div className='option'>
            <Button
                className='option__btn option__remove'
                onClick={() => dispatch(notesSetNotes(onDeleteItem(id, notes)))}
            >
                <DeleteIcon />
            </Button>
            <Button
                className='option__btn option__edit'
                onClick={() => {
                    dispatch(editSetValue(...setEditValue(id, notes)));
                    dispatch(editCheckVie(true));
                }}
            >
                <EditIcon />
            </Button>
            <Button
                className='option__btn option__choose-color'
                onClick={() => setActiveColor(!activeColor)}
            >
                <PaletteIcon />
            </Button>
            {activeColor && ChooseColor}
        </div>
    );
};
