
export const HelperFunctions = () => {


    function onDeleteItem(id, array, isAuth) {
        const deleteItem = array.filter((note) => note.id !== id);

		if(!isAuth) {
			localStorage.removeItem('notes');
			localStorage.setItem('notes', JSON.stringify(deleteItem));
		}

        return deleteItem;
    };

    function setEditValue (id, array) {
        const objValue = array.filter(note => note.id === id);
        document.body.style.overflow='hidden';
        return objValue;
    };

    function setFixed (id, array) {
        let arr = {};
        let notes = array.filter((item) => {

            if(item.id === id) {
                arr = {...item, fixed: !item.fixed};
                return false;
            }
            return true;
        })
        notes.unshift(arr);
        return notes;
    }

    return {
        onDeleteItem,
        setEditValue,
        setFixed
    }
}
