import Navbar from "./components/layouts/navbar"
import AppRoutes from "./routes/appRoutes"


const App = () => {
  return (
    <main className="min-h-screen bg-muted/30">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen   mx-auto px-4 sm:px-1 lg:px-3">
        <AppRoutes />
      </div>
    </main> 
  )
}

export default App