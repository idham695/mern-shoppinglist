import React from 'react';

// Component
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import EditItemModal from './components/EditItemModal';
import {Container} from 'reactstrap';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from "./actions/authActions";

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component{
  componentDidMount(){
    store.dispatch(loadUser());
  }
  render(){
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
          <ItemModal />
          <EditItemModal />
          <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
