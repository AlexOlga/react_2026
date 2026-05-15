import { Route, Routes } from 'react-router';
import About from '../pages/About';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import CardDetails from '../components/CardDetails';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="card/:cardId" element={<CardDetails />} />
      </Route>
      <Route path="about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;
