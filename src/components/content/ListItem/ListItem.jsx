import { HelperFunctions } from '../../index';
import { useRef } from 'react';
import ContentEditable from '../../helpers/ContentEditable/ContentEditable';
import cn from 'classnames';

export const ListItem = ({
    filterList,
    notesList,
    updateList,
    editListItem,
    editeble
}) => {
    const text = useRef('');
    const { onDeleteItem } = HelperFunctions();

    function toggleComplete(id) {
        const newList = notesList.list.map(item => {
            if (item.id === id) {
                return { ...item, complete: !item.complete };
            }

            return item;
        });

        updateList(newList);
    }

    function renderList() {
        return filterList.map(listItem => (
            <li key={listItem.id} className='list-item__box'>
                <input
                    disabled={editeble}
                    className='list-item__cheackbox'
                    type='checkbox'
                    checked={listItem.complete}
                    onChange={() => toggleComplete(listItem.id)}
                />
                <ContentEditable
                    disabled={editeble}
                    className={cn('list-item__edit', {
						'list-item__textDecoration': listItem.complete === true
					})}
                    html={listItem.text}
                    onChange={e => (text.current = e.target.value)}
                    onBlur={e => {
                        editListItem(text.current, listItem.id, notesList.list);
                        text.current = '';
                    }}
                />
                <button
                    disabled={editeble}
                    className='list-item__delete'
                    onClick={() =>
                        updateList(onDeleteItem(listItem.id, notesList.list))
                    }
                >
                    x
                </button>
            </li>
        ));
    }
    return <div className='list-item'>{renderList()}</div>;
};
