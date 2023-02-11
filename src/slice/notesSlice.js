import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notes: [],
	notesItem: {},
	notesList: [],
    filteredNotes: [],
	disabledButton: false,
}

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        notesSetNotes: (state, action) => {
            state.notes = action.payload;
        },
        notesFiltered: (state, action) => {
            state.filteredNotes = action.payload;
        },
		notesToggleDisabled: (state, action) => {
			state.disabledButton = action.payload;
		},
		notesGetNotesItem: (state, action) => {
			state.notesItem = action.payload;
		},
		notesSetNotesList: (state, action) => {
			state.notesList = action.payload;
		},
    }
})

const {actions, reducer} = notesSlice;

export default reducer;

export const {
    notesSetNotes,
    notesFiltered,
	notesToggleDisabled,
	notesGetNotesItem,
	notesSetNotesList,
} = actions;