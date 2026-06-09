import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import Placeholder from './ToDoList/Placeholder.jsx';
import Server from './ToDoList/Server.jsx';
import Fairbase from './ToDoList/Fairbase.jsx'
import Router from './ToDoList/Task2-Router/Router.jsx'
import ContextAPI from './ToDoList/ContextAPI/ContextAPI.jsx';
import { Provider } from 'react-redux';
import { store } from './ToDoList/Redux/store/store';
import { Todos } from './ToDoList/Redux/component/Redux_comp';


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   {/* <Placeholder /> */}
  //   {/* <Server /> */}
  //   {/* <Fairbase /> */}
  //   {/* <BrowserRouter>
  //     <Router />
  //   </BrowserRouter> */}
  //   {/* <ContextAPI /> */}
  // </StrictMode>,
  <Provider store={store}>
    <Todos />
  </Provider>
)