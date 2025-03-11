import React from 'react';
import ReactDOM from 'react-dom/client'; // Update the import statement
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import reportWebVitals from './reportWebVitals';
import { ResponseProvider } from './sdlc/ResponseContext';
import { UserProvider } from './sdlc/UserContext';
import './index.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // Use createRoot from react-dom/client

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <ResponseProvider> 
          <UserProvider>
            <App />
          </UserProvider>
        </ResponseProvider>
      </DndProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();