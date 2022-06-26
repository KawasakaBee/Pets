import React from 'react';
import ReactDOM from 'react-dom';
import { PetName } from './PetName';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PetHome } from './PetHome';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './store/store';
import { Container } from './Container';
import { EndPage } from './EndPage';
import thunk from 'redux-thunk';
import './main.scss';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter >
        <Container>
          <Routes>
            <Route path='/main.html/' element={<PetName />} />
            <Route path='/main.html/app' element={<PetHome />} />
            <Route path='/main.html/app/end' element={<EndPage />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
