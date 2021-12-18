import { StrictMode } from 'react'
import { render } from 'react-dom'
import 'tailwindcss/tailwind.css'
import App from 'components/App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Callback from 'components/Callback'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Users from 'components/Users'

const queryClient = new QueryClient()

import 'tui-calendar/dist/tui-calendar.css'

// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'

render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
      />
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="callback" element={<Callback />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
  document.getElementById('root')
)
