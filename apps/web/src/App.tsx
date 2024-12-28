import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Dashboard from "./views/Dashboard/Dashboard"
import { SocketProvider } from "./context/SocketContext/SocketProvider"

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
      <SocketProvider>
        <Dashboard />
      </SocketProvider>
    </QueryClientProvider>
  )
}

export default App
