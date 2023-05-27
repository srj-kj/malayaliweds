import { createSlice } from "@reduxjs/toolkit";

const adminState={
    isLogged: false,
    admin: {},
}

const adminSlice = createSlice({
    name: 'admin',
    initialState:adminState,
    reducers: {
        login : (state,action)=>{
            return {isLogged: true, admin:action.payload};
        },
        logout : ()=>{
            return adminState;
        }
    }
});

export const { login, logout } = adminSlice.actions;
export default adminSlice.reducer;
