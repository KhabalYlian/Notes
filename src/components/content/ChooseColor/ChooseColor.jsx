import { memo, useMemo } from 'react';
import { notesSetNotes } from '../../../slice/notesSlice';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { Color } from '../../index';

export const ChooseColors = memo(({ color, id }) => {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.notes);

    const colors = [
        { color: '#e3e3e3' },
        { color: '#47b0e4' },
        { color: '#e74949' },
        { color: '#bfa8eb' },
        { color: '#add' }
    ];

    function changeColor(color, id) {
        const newNotes = notes.map(item => {
            if (item.id === id) {
                item = { ...item, color: color };
            }

            return item;
        });

        dispatch(notesSetNotes(newNotes));
    }

    return (
        <div className='choose-color-notice'>
            <div className='choose-color-notice__inner'>
                {useMemo(
                    () =>
                        colors.map(colors => {
                            return (
                                <Color
                                    key={colors.color}
                                    className={cn(
                                        'choose-color-notice__color',
                                        {
                                            'choose-color-notice__active-color':
                                                colors.color === color
                                        }
                                    )}
                                    color={colors.color}
                                    onClick={() =>
                                        changeColor(colors.color, id)
                                    }
                                />
                            );
                        }),
                    []
                )}
            </div>
        </div>
    );
});
