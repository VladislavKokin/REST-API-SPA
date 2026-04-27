import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import Placeholder from './ToDoList/Placeholder.jsx';
import Server from './ToDoList/Server.jsx';
import Fairbase from './ToDoList/Fairbase.jsx'
import Router from './ToDoList/Task2-Router/Router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Placeholder /> */}
    {/* <Server /> */}
    {/* <Fairbase /> */}
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StrictMode>,
)
