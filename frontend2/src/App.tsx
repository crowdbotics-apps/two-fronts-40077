import "./App.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router } from "react-router-dom"
import React from "react"
import AppRoutes from "./router"
import { QueryClient, QueryClientProvider } from "react-query"
import AlertDismissible from "./components/AlertDismissable"
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AlertDismissible />
      <React.StrictMode>
        <Router basename={"/frontend2"}>
          <AppRoutes />
        </Router>
      </React.StrictMode>
    </QueryClientProvider>
  )
}

export default App
