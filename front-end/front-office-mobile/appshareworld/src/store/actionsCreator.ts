import * as actionsTypes from './actionsTypes';


// ? Recover user exists

export function addUser(user: IUser) {
    // user.address = address;
     console.log(user.address);
    console.log('adduser');
    console.log(user);
    
    
    const  action: UserAction = {
        type: actionsTypes.ADD_USER,
        user: user
    }
    return simulateHttpRequest(action);
}

// ? Remove user
export function removeUser(user: IUser) {
    const  action: UserAction = {
        type: actionsTypes.REMOVE_USER,
        user: user
    }
    return simulateHttpRequest(action);
}

// ? Edit User
export function editUser(user: IUser) {
    console.log('edit user');
    
    const  action: UserAction = {
        type: actionsTypes.EDIT_USER,
        user: user
    }
    return simulateHttpRequest(action);
}

// ? display User
// export function displayUser(){
//     console.log('value user');

//     const action: UserAction = {
//         type: actionsTypes.GET_USER,
//         // user: user
//     }
//     return simulateHttpRequest(action);
// }

export function simulateHttpRequest(action: UserAction){
    console.log('simulateHttp');
    
    return (dispatch: DispatchType) => {
        setTimeout(()=>{
            dispatch(action)
        },500)
    }
}