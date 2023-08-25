import { createPortal } from "react-dom";
import { combineReducers, createStore } from "redux";
const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
};
const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: "",
};
function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case "account/deposit":
            return { ...state, balance: state.balance + action.payload };
        case "account/withdraw":
            return { ...state, balance: state.balance - action.payload };
        case "account/requestLoan":
            if (state.loan > 0) return state;
            //LATER
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount,
            };
        case "account/payLoan":
            return {
                ...state,
                loan: 0,
                loanPurpose: "",
                balance: state.balance - state.loan,
            };
        default:
            return state;
    }
}
function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case "customer/createCustomer":
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt,
            };
        case "customer/updateName":
            return { ...state, fullName: action.payload };
        default:
            return state;
    }
}
const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});
const store = createStore(rootReducer);

function deposit(amount) {
    return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
    return { type: "account/withdraw", payload: amount };
}
function payLoan() {
    return { type: "account/payLoan" };
}
function requestLoan(amount, purpose) {
    return { type: "account/requestLoan", payload: { amount, purpose } };
}
store.dispatch(deposit(300));
store.dispatch(withdraw(20));
store.dispatch(requestLoan(10000, "setting up working space"));
store.dispatch(payLoan());
console.log(store.getState());
function createCustomer(fullName, nationalID) {
    return {
        type: "customer/createCustomer",
        payload: { fullName, nationalID, createdAt: new Date().toISOString() },
    };
}
function updateName(fullName) {
    return { type: "customer/updateName", payload: fullName };
}
store.dispatch(createCustomer("Ayoub Nasraoui", "12345"));
console.log(store.getState( ))