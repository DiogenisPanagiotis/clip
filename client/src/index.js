import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  	<Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={App} />
          </Switch>
        </BrowserRouter>
  	</Provider>,
  	document.querySelector('#root')
)

registerServiceWorker()