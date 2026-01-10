import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Lancamentos from './pages/Lancamentos'
import LancamentoDetalhe from './pages/LancamentoDetalhe'
import Contato from './pages/Contato'
import AgendarVisita from './pages/AgendarVisita'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import AdminEmpreendimentos from './admin/AdminEmpreendimentos'
import AdminLeads from './admin/AdminLeads'
import ProtectedRoute from './admin/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="lancamentos" element={<Lancamentos />} />
          <Route path="lancamentos/:id" element={<LancamentoDetalhe />} />
          <Route path="contato" element={<Contato />} />
          <Route path="agendar-visita/:id" element={<AgendarVisita />} />
        </Route>

        {/* Rotas Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/empreendimentos"
          element={
            <ProtectedRoute>
              <AdminEmpreendimentos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/leads"
          element={
            <ProtectedRoute>
              <AdminLeads />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
