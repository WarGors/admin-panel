import { ADD_FILTER, ADD_USER, CHANGE_USER_PARAMS, CHECK_VALID, REMOVE_USER, SET_DEFAULT_USER, SHOW_FORM } from "../actions/actionTypes"

const fromStorage = [...JSON.parse(localStorage.getItem('users'))] || []

const initialState = {
  users: fromStorage,
  user: {
    userName: '',
    password: '',
    phone: '',
    email: '',
    status: 'client',
    dateCreation: null,
    lastChanges: null,
  },
  valid: {
    userName: true,
    password: true,
    phone: true,
    email: true,
  },
  filter: {
    tel: '',
    selectVal: '-', 
    email: ''
  },
  isVisible: false
}

const RootReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_FILTER:
      return {
        ...state,
        filter: action.payload
      }
    case CHANGE_USER_PARAMS: {
      return {
        ...state,
        user: action.payload
      }
    }
    case SHOW_FORM: {
      return {
        ...state,
        isVisible: !state.isVisible
      }
    }
    case CHECK_VALID: {
      return {
        ...state,
        valid: action.payload
      }
    }
    case ADD_USER: {
      const user = {...initialState.user}
      localStorage.setItem('users', JSON.stringify(action.payload))
      return {
        ...state,
        user,
        users: action.payload
      }
    }
    case REMOVE_USER:
      localStorage.setItem('users', JSON.stringify(action.payload))
      return {
        ...state,
        users: action.payload
      }
    case SET_DEFAULT_USER:
      const user = {...initialState.user}
      return {
        ...state,
        user
      }
    default:
      return state
  }
}

export default RootReducer