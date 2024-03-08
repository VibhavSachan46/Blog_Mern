import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: localStorage.getItem("savedPosts")
        ? JSON.parse(localStorage.getItem("savedPosts"))
        : [],
    total: localStorage.getItem("totalPosts")
        ? JSON.parse(localStorage.getItem("totalPosts"))
        : 0,
}

const savedSlice = createSlice({
    name: "saved",
    initialState: initialState,
    reducers: {
        addPost: (state, action) => {
            const postToAdd = action.payload;
            const existingPost = state.cart.find(post => post.id === postToAdd.id);
            if (!existingPost) {
                state.cart.push(postToAdd);
                state.total += 1;
                localStorage.setItem("savedPosts", JSON.stringify(state.cart));
                localStorage.setItem("totalPosts", JSON.stringify(state.total));
            }
        },
        removePost: (state, action) => {
            const postIdToRemove = action.payload;
            state.cart = state.cart.filter(post => post.id !== postIdToRemove);
            state.total -= 1;
            localStorage.setItem("savedPosts", JSON.stringify(state.cart));
            localStorage.setItem("totalPosts", JSON.stringify(state.total));
        }
    }
});

export const { addPost, removePost } = savedSlice.actions
export default savedSlice.reducer