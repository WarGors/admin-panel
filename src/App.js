import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';
import AdminList from './components/adminList/adminList';
import RootReducer from './redux/reducers/rootReducer';

const store = createStore(RootReducer)

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AdminList />
      </div>
    </Provider>
  );
}

export default App;
