import { Outlet } from "react-router";

function App() {
  return (
    <div className="flex flex-col items-center justify-start min-h-svh bg-gray-50">
      <Outlet />
    </div>
  );
}

export default App;
