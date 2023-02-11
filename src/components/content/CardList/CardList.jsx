import { memo, useMemo } from 'react';
import { ListItem } from '../../index';
import { useDispatch, useSelector } from 'react-redux';
import { notesSetNotes } from '../../../slice/notesSlice';

export const CardList = memo(({ notesList, setList, editeble }) => {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.notes);

    function updateList(newList) {
        if (setList) {
            setList({ ...notesList, list: newList });
        } else {
            const newNotes = notes.map(item => {
                if (item.id === notesList.id) {
                    return { ...notesList, list: newList };
                }

                return item;
            });
            dispatch(notesSetNotes(newNotes));
        }
    }

    function editListItem(value, id, list) {
        const newList = list.map(listItem => {
            if (listItem.id === id) {
                if (value === '') value = listItem.text;
                return { ...listItem, text: value };
            }

            return { ...listItem };
        });

        updateList(newList);
    }

    return (
        <div className='card-list'>
            <ul className='card-list__list'>
                {useMemo(() => {
                    const newList = notesList.list.filter(
                        listItem => !listItem.complete
                    );

                    return (
                        <ListItem
                            editeble={editeble}
                            filterList={newList}
                            notesList={notesList}
                            updateList={updateList}
                            editListItem={editListItem}
                        />
                    );
                }, [notesList])}
            </ul>
            <ul className='card-list__complete'>
                {useMemo(() => {
                    const newList = notesList.list.filter(
                        listItem => listItem.complete
                    );

                    return newList.length !== 0 ? (
                        <>
                            {newList.length !== 0 ? (
                                <p className='card-list__paragraph'>Виконано</p>
                            ) : null}
							<ListItem
								editeble={editeble}
								filterList={newList}
								notesList={notesList}
								updateList={updateList}
								editListItem={editListItem}
							/>
                        </>
                    ) : null;
                }, [notesList])}
            </ul>
        </div>
    );
});
