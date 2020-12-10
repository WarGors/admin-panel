import { connect } from 'react-redux'
import { addFilter, changeUserParams, removeUser, showForm } from '../../redux/actions/actions'
import AddUser from '../addUser/addUser'
import UserItem from '../userItem/userItem'
import './adminList.scss'

const AdminList = props => {
  
  const { users, filter: {selectVal, tel, email} } = props.state

  const filterHandler = e => {
    const name = e.target.name
    const value = e.target.value

    const filter = {...props.state.filter}
    filter[name] = value

    props.addFilter(filter)
  }

  const getDate = (date) => {
    const day = new Date(date).getDate()
    const month = new Date(date).getMonth() + 1
    const year = new Date(date).getFullYear()
    const minutes = new Date(date).getMinutes()
    const hours = new Date(date).getHours()

    const getNum = num => num < 10 ? '0' + num : num
    
    return `${getNum(day)}.${getNum(month)}.${year} ${getNum(hours)}:${getNum(minutes)}`
  }

  const filtredUsers = () => {
    let filtred = [...users]
    if (selectVal !== '-') {
      filtred = filtred.filter(user => user.status === selectVal)
    }
    if (tel) {
      filtred = filtred.filter(user => user.phone.startsWith(tel))
    }
    if (email) {
      filtred = filtred.filter(user => user.email.startsWith(email))
    }
    return filtred
  }

  const removeHander = id => {
    const newUsers = [...users]
      .filter(item => item.id !== id)

    props.removeUser(newUsers)
  }

  const editHandler = id => {
    const currentUser = {...users.find(user => user.id === id)}
    props.changeUserParams(currentUser)
    props.showForm()
  }

  return (
    <div className='admin-list-container'>
      <div className='admin-list-container-filtres'>
        Статус
        <select name='selectVal' onChange={filterHandler}>
          <option>-</option>
          <option>client</option>
          <option>partner</option>
          <option>admin</option>
        </select>
        Телефон
        <input type="text" name='tel' placeholder='Введите телефон...' value={tel} onChange={filterHandler} />
        Email
        <input type='text' name='email' placeholder='Введите Email...' value={email} onChange={filterHandler} />
      </div>
      <AddUser />
      <ul>
        {
          filtredUsers().map((user, index) => {
            return (
              <li key={index}>
                <UserItem
                  editHandler={() => editHandler(user.id)}
                  removeUser={() => removeHander(user.id)} 
                  userName={user.userName}
                  password={user.password}
                  phone={user.phone}
                  email={user.email}
                  status={user.status}
                  dateCreation={getDate(user.dateCreation)}
                  lastChanges={getDate(user.lastChanges)}
                />
              </li>
            )
          })
        }
      </ul>
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
    addFilter: filter => dispatch(addFilter(filter)),
    removeUser: users => dispatch(removeUser(users)),
    showForm: () => dispatch(showForm()),
    changeUserParams: user => dispatch(changeUserParams(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminList) 