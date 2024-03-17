import { Navigate, Route, Routes as ReactRoutes } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';

export default function Routes(): JSX.Element {
  return (
    <ReactRoutes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </ReactRoutes>
  );
}