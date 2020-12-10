import { connect } from 'react-redux'
import { addUser, changeUserParams, checkValid, setDefaultUser, showForm } from '../../redux/actions/actions'
import Form from '../addForm/addForm'
import './addUser.scss'

const AddUser = props => {
  
  const {isVisible, valid, user: {userName, password, phone, email, status}} = props.state

  const validationHandler = () => {

    const valid = {...props.state.valid}
    valid.phone = !!Number.isInteger(+phone) && !!phone
    if (!userName) valid.userName = false

    if (!password || password.length < 6 || password.includes(' ')) valid.password = false
    if (!email && !email.includes('@')) valid.email = false
    props.checkValid(valid)
    return !Object.values(valid).includes(false)
  }

  const onChangeHandler = event => {
    const name = event.target.name
    const value = event.target.value

    const valid = {...props.state.valid}
    valid[name] = true

    const newState = {...props.state.user}
    newState[name] = value

    props.checkValid(valid)
    props.changeUserParams(newState)
  }

  const onClickHandler = event => {
    event.preventDefault()

    const validOk = {...valid}

    for (let key in validOk) {
      validOk[key] = true
    }

    props.setDefaultUser()
    props.checkValid(validOk)
    props.showForm()
  }

  const dispatchHandler = e => {
    e.preventDefault()

    if (!validationHandler()) return

    const users = [...props.state.users]
    const user = {...props.state.user}

    user.lastChanges = new Date().getTime()
    
    if (!user.dateCreation && !user.id) {
      user.id = `user-${users.length}-ID`
      user.dateCreation = new Date().getTime()
      users.push(user)
    } else {
      const index = users.findIndex(item => item.id === user.id)
      users[index] = user
    }

    props.addUser(users)
    props.setDefaultUser()
    props.showForm()
  }

  return (
    <div className='add-user'>
      <button onClick={onClickHandler}>Добавить пользователя</button>
      {
        isVisible 
        ? <div className='overlay'>
            <Form 
              userName={userName}
              password={password}
              phone={phone}
              email={email}
              status={status}
              dispatchHandler={dispatchHandler}
              onChangeHandler={onChangeHandler}
              onClickHandler={onClickHandler}
              valid={valid}
            />
          </div>
        : null
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeUserParams: user => dispatch(changeUserParams(user)),
    showForm: () => dispatch(showForm()),
    checkValid: valid => dispatch(checkValid(valid)),
    addUser: users => dispatch(addUser(users)),
    setDefaultUser: () => dispatch(setDefaultUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);