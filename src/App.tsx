import { Navigate, Route, Routes } from 'react-router-dom'
import ArrivalGuide from '@/pages/ArrivalGuide'
import NotFound from '@/pages/NotFound'
import Login from '@/pages/Login'
import UnitsList from '@/pages/UnitsList'
import UnitNew from '@/pages/UnitNew'
import UnitEdit from '@/pages/UnitEdit'
import { ProtectedRoute } from '@/components/admin/ProtectedRoute'
import { AdminLayout } from '@/components/admin/AdminLayout'

export default function App() {
  return (
    <Routes>
      {/* Guest (public) */}
      <Route path="/arrive/:slug" element={<ArrivalGuide />} />

      {/* Admin */}
      <Route path="/admin/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<UnitsList />} />
          <Route path="/admin/units/new" element={<UnitNew />} />
          <Route path="/admin/units/:id" element={<UnitEdit />} />
        </Route>
      </Route>

      {/* Root → admin (or login if unauth) */}
      <Route path="/" element={<Navigate to="/admin" replace />} />

      {/* Unknown path */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
