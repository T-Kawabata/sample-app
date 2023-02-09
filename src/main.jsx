import React		from 'react'
import ReactDOM		from 'react-dom/client'

import App			from './App'

import moment		from 'moment';
import 'moment/locale/ja';

moment.locale('ja');


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
