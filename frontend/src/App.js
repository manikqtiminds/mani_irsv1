import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ReferenceSelect from './components/ReferenceSelect';
import ReviewEdit from './pages/ReviewEdit';
import ReviewEditUpdate from './pages/ReviewEditUpdate';
import Report from './pages/Report';
import TestingImage from './pages/TestingImage';
import ExternalRedirect from './pages/ExternalRedirect';

function App() {
  return (
    <Router>
      <Routes>
        {/* External route first to handle direct access */}
        <Route path="/external" element={<ExternalRedirect />} />
        
        {/* Main routes */}
        <Route path="/review" element={<ReviewEdit />} />
        <Route path="/review-update" element={<ReviewEditUpdate />} />
        <Route path="/report" element={<Report />} />
        <Route path="/testing" element={<TestingImage />} />
        
        {/* Home route */}
        <Route path="/" element={<ReferenceSelect />} />
        
        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;