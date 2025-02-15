import { Outlet } from 'react-router-dom';
import NavigationBar from './AppBar';

export default function Layout() {
  return (
    <div className="min-h-screen">
      <NavigationBar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}