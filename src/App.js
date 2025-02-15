import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScheduleList from './components/ScheduleList';
import Auth from './components/Auth';
import ScheduleForm from './components/ScheduleForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ScheduleList />} />
          <Route path="admin" element={<Auth />} />
          <Route path="dashboard" element={<ScheduleForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;