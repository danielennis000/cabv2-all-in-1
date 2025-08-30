import { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { BasicInformation } from './components/BasicInformation';
import { InstructionWorkbench } from './components/InstructionWorkbench';
import { TemplateGallery } from './components/Templates/TemplateGallery';
import { ChatbotEmbed } from './components/ChatbotEmbed';
import { Dashboard } from './components/Dashboard';
import { PromptLibrary } from './components/PromptLibrary';

type AppView = 'dashboard' | 'basic' | 'workbench' | 'templates' | 'prompts';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');

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
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-4 py-2 rounded-lg font-arial font-bold text-sm transition-colors whitespace-nowrap flex-shrink-0 ${
                  currentView === 'dashboard'
                    ? 'bg-asu-maroon text-white'
                    : 'bg-grey-6 text-grey-2 hover:bg-grey-5'
                }`}
                aria-current={currentView === 'dashboard' ? 'page' : undefined}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('basic')}
                className={`px-4 py-2 rounded-lg font-arial font-bold text-sm transition-colors whitespace-nowrap flex-shrink-0 ${
                  currentView === 'basic'
                    ? 'bg-asu-maroon text-white'
                    : 'bg-grey-6 text-grey-2 hover:bg-grey-5'
                }`}
                aria-current={currentView === 'basic' ? 'page' : undefined}
              >
                Basic Setup
              </button>
              <button
                onClick={() => setCurrentView('workbench')}
                className={`px-4 py-2 rounded-lg font-arial font-bold text-sm transition-colors whitespace-nowrap flex-shrink-0 ${
                  currentView === 'workbench'
                    ? 'bg-asu-maroon text-white'
                    : 'bg-grey-6 text-grey-2 hover:bg-grey-5'
                }`}
                aria-current={currentView === 'workbench' ? 'page' : undefined}
              >
                Instruction Workbench
              </button>
              <button
                onClick={() => setCurrentView('templates')}
                className={`px-4 py-2 rounded-lg font-arial font-bold text-sm transition-colors whitespace-nowrap flex-shrink-0 ${
                  currentView === 'templates'
                    ? 'bg-asu-maroon text-white'
                    : 'bg-grey-6 text-grey-2 hover:bg-grey-5'
                }`}
                aria-current={currentView === 'templates' ? 'page' : undefined}
              >
                Templates & Examples
              </button>
              <button
                onClick={() => setCurrentView('prompts')}
                className={`px-4 py-2 rounded-lg font-arial font-bold text-sm transition-colors whitespace-nowrap flex-shrink-0 ${
                  currentView === 'prompts'
                    ? 'bg-asu-maroon text-white'
                    : 'bg-grey-6 text-grey-2 hover:bg-grey-5'
                }`}
                aria-current={currentView === 'prompts' ? 'page' : undefined}
              >
                Prompt Library
              </button>
            </div>
          </div>

          {/* Content */}
          {currentView === 'dashboard' && (
            <Dashboard 
              onCreateNew={() => setCurrentView('basic')}
              onOpenProject={(projectId) => {
                console.log('Opening project:', projectId);
                setCurrentView('workbench');
              }}
            />
          )}
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
          {currentView === 'prompts' && (
            <PromptLibrary 
              onUsePrompt={(prompt) => {
                console.log('Using prompt:', prompt);
                // In a real app, this would apply the prompt to the workbench
                setCurrentView('workbench');
              }}
            />
          )}
        </main>
      </div>
      
      {/* Chatbot Embed */}
      <ChatbotEmbed />
    </div>
  );
}

export default App;