import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { Router } from '@/router'
import { store } from '@/services/store'

import 'react-toastify/dist/ReactToastify.css'

export function App() {
  return (
    <Provider store={store}>
      <Router />
      <ToastContainer
        autoClose={5000}
        closeOnClick={false}
        draggable={false}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss
        pauseOnHover
        position={'top-center'}
        rtl={false}
        theme={'dark'}
      />
    </Provider>
  )
}
