
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Todos } from './component/Redux_comp';


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Todos />
  </Provider>
)