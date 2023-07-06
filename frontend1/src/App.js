import React from "react"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ToastContainer } from "react-toastify"

import RouteElements from "./routes"
import { AppContextProvider } from "./contexts/app-context"

import "bootstrap/dist/css/bootstrap.min.css"
import "simplebar-react/dist/simplebar.min.css"
import "./assets/styles/main.scss"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <AppContextProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            theme="light"
          ></ToastContainer>
          <BrowserRouter>
            <RouteElements />
          </BrowserRouter>
        </AppContextProvider>
      </React.StrictMode>
    </QueryClientProvider>
  )
}

export default App
