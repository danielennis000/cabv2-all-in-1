
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { BasicInformation } from './components/BasicInformation';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header mode="publish" />
      
      {/* Main layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar className="hidden lg:block" />
        
        {/* Mobile sidebar for smaller screens */}
        <Sidebar className="lg:hidden" />
        
        {/* Main content */}
        <main className="flex-1 lg:ml-[100px]">
          <BasicInformation />
        </main>
      </div>
    </div>
  );
}

export default App;