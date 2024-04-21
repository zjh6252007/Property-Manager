import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";
import tenantReducer from "./modules/tenant";
import contractRecuer from "./modules/contract";
import propertiesReducer from "./modules/properties";
import repairReducer from "./modules/repair";
import costReducer from "./modules/cost";
const store = configureStore({
    reducer:{
        user:userReducer,
        tenant:tenantReducer,
        contract:contractRecuer,
        property:propertiesReducer,
        repair:repairReducer,
        cost:costReducer
    }
})

export default store