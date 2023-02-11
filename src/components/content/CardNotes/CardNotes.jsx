import { forwardRef, memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { notesSetNotes } from '../../../slice/notesSlice';

import { ReactComponent as FixedIcon } from './icon/fixed.svg';

import {
    HelperFunctions,
    OptionBar,
    ChooseColors,
    CardList
} from '../../index';
import { motion } from 'framer-motion';

export const CardNotes = memo(
    motion(
        forwardRef(({ notesInfo }, ref) => {
            const dispatch = useDispatch();
            const notes = useSelector(state => state.notes.notes);
            const [opacity, setOpacity] = useState(false);

            const { title, text, id, color, list, fixed } = notesInfo;
            const { setFixed } = HelperFunctions();

            return (
                <div
                    style={{ backgroundColor: color }}
                    ref={ref}
                    className='card-notes__items'
                >
                    <div
                        onClick={() =>
                            dispatch(notesSetNotes(setFixed(id, notes)))
                        }
                        className='card-notes__fixed'
                    >
                        <FixedIcon />
                    </div>
                    {!list ? (
                        <>
                            <div className='card-notes__title'>{title}</div>
                            <div className='card-notes__paragraph'>{text}</div>
                            <div
                                className='card-notes__option'
                                style={{ opacity: opacity ? 1 : 0 }}
                            >
                                <OptionBar id={id} setOpacity={setOpacity}>
                                    <ChooseColors id={id} color={color} />
                                </OptionBar>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='card-notes__title'>{title}</div>
                            <div className='card-notes__paragraph'>
                                <CardList
                                    notesList={{
                                        id,
                                        title,
                                        list,
                                        fixed,
                                        color
                                    }}
                                    editeble={true}
                                />
                            </div>
                            <div
                                className='card-notes__option'
                                style={{ opacity: opacity ? 1 : 0 }}
                            >
                                <OptionBar id={id} setOpacity={setOpacity}>
                                    <ChooseColors id={id} color={color} />
                                </OptionBar>
                            </div>
                        </>
                    )}
                </div>
            );
        })
    )
);
