import * as actionsTypes from './actionsTypes';
import { combineReducers } from 'redux';

const initialUserState: UserState = {
    user: {
        id: -1,
        first_name: "",
        last_name: "",
        full_name: "",
        phone: "",
        url_avatar: "",
        credit: 0,
        mail: "",
        note: 0,
        number_notes: 0,
        address: null,
    }
}



const reducer = (
    state: UserState = initialUserState, 
    action: UserAction,
    ):  UserState => {
        switch(action.type){
            case actionsTypes.ADD_USER:
            case actionsTypes.EDIT_USER:
                console.log('in reducer');
                
                const newUser: IUser = action.user;
                return {...state,
                       user: newUser
                }
            case actionsTypes.REMOVE_USER:
                    const deleteUser: IUser = initialUserState.user;
                    return {...state,
                           user: deleteUser
                    }
            // default: return state;
           
                    // case actionsTypes.GET_USER:
                    //        const getuser: IUser | null = action.user;
                    //        return {... state,
                    //          user: getuser
                    //     }
                    default: return state;
        }
    }

    // const rootReducer = combineReducers({
    //     props: reducer
    // });

export default reducer;