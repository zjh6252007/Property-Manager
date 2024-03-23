import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";
import tenantReducer from "./modules/tenant";
const store = configureStore({
    reducer:{
        user:userReducer,
        tenant:tenantReducer
    }
})

export default store