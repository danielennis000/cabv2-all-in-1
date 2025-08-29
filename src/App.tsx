import { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { BasicInformation } from './components/BasicInformation';
import { InstructionWorkbench } from './components/InstructionWorkbench';
import { TemplateGallery } from './components/Templates/TemplateGallery';

type AppView = 'basic' | 'workbench' | 'templates';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('basic');

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
          {/* Navigation between views */}
          <div className="bg-white border-b border-grey-6 p-4">
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentView('basic')}
                className={`px-4 py-2 rounded-lg font-arial font-bold text-sm transition-colors ${
                  currentView === 'basic'
                    ? 'bg-asu-maroon text-white'
                    : 'bg-grey-6 text-grey-2 hover:bg-grey-5'
                }`}
              >
                📝 Basic Setup
              </button>
              <button
                onClick={() => setCurrentView('workbench')}
                className={`px-4 py-2 rounded-lg font-arial font-bold text-sm transition-colors ${
                  currentView === 'workbench'
                    ? 'bg-asu-maroon text-white'
                    : 'bg-grey-6 text-grey-2 hover:bg-grey-5'
                }`}
              >
                ⚡ Instruction Workbench
              </button>
              <button
                onClick={() => setCurrentView('templates')}
                className={`px-4 py-2 rounded-lg font-arial font-bold text-sm transition-colors ${
                  currentView === 'templates'
                    ? 'bg-asu-maroon text-white'
                    : 'bg-grey-6 text-grey-2 hover:bg-grey-5'
                }`}
              >
                📚 Templates & Examples
              </button>
            </div>
          </div>

          {/* Content */}
          {currentView === 'basic' && <BasicInformation />}
          {currentView === 'workbench' && <InstructionWorkbench />}
          {currentView === 'templates' && (
            <TemplateGallery 
              onSelectTemplate={(template) => {
                console.log('Selected template:', template);
                // In a real app, this would apply the template to the workbench
                setCurrentView('workbench');
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;