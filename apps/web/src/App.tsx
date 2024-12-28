import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Dashboard from "./views/Dashboard/Dashboard"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  )
}

export default App
