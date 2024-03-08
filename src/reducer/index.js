import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import tagReducer from "../slices/Tag"
import SavedPostsReducers from "../slices/savedSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    tags:tagReducer,
    saved:SavedPostsReducers,
})

export default rootReducer