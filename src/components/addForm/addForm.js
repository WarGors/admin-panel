import './addForm.scss'

const Form = props => {
  const {userName, password, phone, email, valid, dispatchHandler, onChangeHandler, onClickHandler} = props
  
  return (
    <form className='form' onSubmit={e => e.preventDefault()}>
      <h1>Данные пользователя</h1>
      <div className="group">
        <label htmlFor="userName">фио</label>
        <input placeholder='Введите имя...' name='userName' type='text' value={userName} onChange={onChangeHandler} />
        {!valid.userName ? <div className='invalid'>ФИО не можен быть пустым</div> : null}
      </div>

      <div className="group">
        <label htmlFor="password">пароль</label>
        <input placeholder='Введите пароль...' name='password' type='text' value={password} onChange={onChangeHandler} />
        {!valid.password ? <div className='invalid'>Пароль должен быть не менее 6 символов и не содержать пробелы</div> : null}
      </div>

      <div className="group">
        <label htmlFor="phone">телефон</label>
        <input placeholder='Введите телефон...' name='phone' type='text' value={phone} onChange={onChangeHandler} />
        {!valid.phone ? <div className='invalid'>Введите корректный телефонный номер</div> : null}
      </div>

      <div className="group">
        <label htmlFor="email">email</label>
        <input placeholder='Введите email...' name='email' type='text' value={email} onChange={onChangeHandler} />
        {!valid.email ? <div className='invalid'>Введите корректный Email</div> : null}
      </div>

      <div className="group">
        <label htmlFor="status">статус</label>
        <select name='status' onChange={onChangeHandler}>
          <option>client</option>
          <option>partner</option>
          <option>admin</option>
        </select>
      </div>
      
      <div className="group">
        <button className='apply' onClick={dispatchHandler}>Сохранить</button>
        <button onClick={onClickHandler}>Отменить</button>
      </div>
      
    </form>
  )
}

export default Form