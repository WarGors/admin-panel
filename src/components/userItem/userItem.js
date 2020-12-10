import './userItem.scss'

const UserItem = props => {
  const {userName, password, phone, email, status, dateCreation, lastChanges, removeUser, editHandler} = props
  return (
    <div className='user-container'>
      <div>ФИО: {userName}</div>
      <div>Пароль: {password}</div>
      <div>Телефон: {phone}</div>
      <div>Email: {email}</div>
      <div>Статус: {status}</div>
      <div>Дата создания: {dateCreation}</div>
      <div>Данные обновлены: {lastChanges}</div>
      <button onClick={editHandler}>Edit</button>
      <button className='remove' onClick={removeUser}>Remove</button>
    </div>
  )
}

export default UserItem