import { Navigate, Route, Routes as ReactRoutes } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';

export default function Routes(): JSX.Element {
  return (
    <ReactRoutes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </ReactRoutes>
  );
}