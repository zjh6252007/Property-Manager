import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";
import tenantReducer from "./modules/tenant";
import contractRecuer from "./modules/contract";
const store = configureStore({
    reducer:{
        user:userReducer,
        tenant:tenantReducer,
        contract:contractRecuer
    }
})

export default store