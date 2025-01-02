import { Spinner } from "@/components/ui/spinner"
import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"

const AdminRoutes = () => {
    const context = useContext(AuthContext)  

    if (!context) return null;
    const { isAuthenticated, user, loading } = context;

    if (loading) return <div className="flex items-center justify-center h-screen"><Spinner /></div>
    
    return isAuthenticated && user?.role === 'admin' ? <Outlet /> : <Navigate to="/" />
}

export default AdminRoutes
