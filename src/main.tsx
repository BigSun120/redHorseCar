import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { store } from './store/index'
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store} >
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Provider>

  // </React.StrictMode>
)
