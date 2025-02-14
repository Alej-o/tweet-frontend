import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: {
		username: null,
		firstname: null,
		token: null,
	},
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addUser: (state, action) => {
			state.value = action.payload;
		},
		logout: (state, action) => {
			state.value = initialState;
		}
	},
});

export const { addUser, logout } = userSlice.actions;
export default userSlice.reducer;