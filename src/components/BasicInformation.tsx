import { useState } from 'react';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { ChevronDown, Expand, Plus, HelpCircle } from 'lucide-react';

export function BasicInformation() {
  const [projectName, setProjectName] = useState('');
  const [projectSubtitle, setProjectSubtitle] = useState('');
  const [selectedModel] = useState('Claude 4 Opus');
  const [customInstructions, setCustomInstructions] = useState('You are a helpful, concise tutor who explains complex ideas in simple terms using everyday examples.');
  
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-6 lg:max-w-[660px]">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 flex items-center justify-center">
              <img src="/assets/510d31f0bcd41adb6b71c10056d2e3e088eba45f.svg" alt="Basic" className="w-full h-full" />
            </div>
            <div>
              <h1 className="font-arial font-bold text-2xl lg:text-[32px] text-black leading-tight">
                Basic information
              </h1>
              <p className="font-arial text-sm lg:text-body-default text-grey-2 mt-1">
                AI configuration
              </p>
            </div>
          </div>
          <p className="font-arial text-body-default text-grey-2 leading-6">
            Define your AI's basic settings, choose a starting model, and set its personality and tone to match your needs.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-8 lg:space-y-10">
          {/* Project Name */}
          <Input
            label="Project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
          />

          {/* Project Subtitle */}
          <Input
            label="Project subtitle"
            description="Add a brief subtitle to summarize your project."
            value={projectSubtitle}
            onChange={(e) => setProjectSubtitle(e.target.value)}
            placeholder="Enter subtitle"
            rightElement={
              <span className="font-arial text-body-default text-grey-2">
                {projectSubtitle.length}/60
              </span>
            }
          />

          {/* Model Selection */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="font-arial font-bold text-body-default text-grey-2">
                Choose a model
              </label>
              <div className="font-arial text-body-default text-grey-2 leading-6">
                Need help choosing a Large Language <strong>Model</strong> (LLM)? Use the{' '}
                <a href="#" className="text-asu-maroon underline">CreateAI Compare Tool</a>{' '}
                or the{' '}
                <a href="#" className="text-asu-maroon underline">Model Selection Help Guide</a>.
              </div>
            </div>
            <div className="relative">
              <input
                className="input-field w-full h-[42px] pr-12"
                value={selectedModel}
                readOnly
              />
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-grey-3" />
            </div>
          </div>

          {/* Custom Instructions */}
          <Textarea
            label="Custom instructions"
            description={
              <div>
                Custom instructions (also called a system prompt) let you define your model's role, goals, and response style. Get help with the{' '}
                <a href="#" className="text-asu-maroon underline">
                  Custom Instructions AI Guide.
                </a>
              </div>
            }
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            className="min-h-[120px]"
            rightElement={<Expand className="w-4 h-4 text-grey-3" />}
          />

          {/* Project Icon */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="font-arial font-bold text-body-default text-grey-2">
                Project icon
              </label>
              <HelpCircle className="w-3.5 h-3.5 text-grey-3 opacity-0" />
            </div>
            <div className="bg-grey-7 rounded-lg p-4 flex items-center gap-6">
              <div className="relative w-20 h-20">
                <img src="/assets/d47d6bcc600ee65652107ee8d4334d68a9d877d3.png" alt="Default icon" className="w-full h-full rounded" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <Plus className="w-4 h-4 text-grey-2" />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <p className="font-arial text-body-default text-grey-2">
                  Upload an image to represent your project
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer for mobile */}
        <div className="h-16 lg:h-0" />
      </div>

      {/* Preview Panel */}
      <div className="lg:flex-1 bg-grey-6 lg:min-h-screen p-4 lg:p-6">
        <div className="text-center mb-6">
          <h2 className="font-arial font-bold text-lg lg:text-xl text-grey-1 mb-2">
            Preview: <span className="font-normal text-body-default">View real-time changes to your apps here</span>
          </h2>
        </div>
        
        {/* Chat Preview */}
        <div className="bg-white rounded-2xl p-6 max-w-4xl mx-auto">
          {/* Chat Interface Preview will go here */}
          <div className="space-y-6">
            {/* Sample messages */}
            <div className="space-y-4">
              <div className="bg-grey-7 border border-grey-6 rounded-2xl p-4">
                <p className="font-arial text-body-default text-grey-2 leading-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id mauris in odio eleifend luctus.
                </p>
              </div>
              
              <div className="space-y-4">
                <p className="font-arial text-body-default text-grey-2 leading-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut erat in mi gravida euismod sed sit amet tortor. Etiam efficitur eros vitae mi pharetra dapibus. Curabitur eget nunc nec velit pretium facilisis.
                </p>
                {/* Response info bar */}
                <div className="flex items-center gap-4 text-xs text-grey-2">
                  <div className="flex items-center gap-2">
                    <img src="/assets/4fe000a7222b0986c55c77cc4c944af69937b2bf.svg" alt="Copy" className="w-3 h-3" />
                    <img src="/assets/5b0867b23e8d2eee943469a64c28486d84eee07d.svg" alt="Thumbs up" className="w-3 h-3" />
                    <img src="/assets/6e3c01d32c16734ee03c92ff15923a539392d08f.svg" alt="Thumbs down" className="w-3 h-3" />
                    <img src="/assets/e1ba0c27479d038486420be17028bff2b6701f43.svg" alt="Flag" className="w-3 h-3" />
                  </div>
                  <span><strong>Tokens</strong>: 120</span>
                  <span><strong>Cost</strong>: ¢ 0.18</span>
                  <span className="flex items-center gap-1">
                    <strong>Sources</strong>
                    <ChevronDown className="w-2 h-2" />
                  </span>
                </div>
              </div>
            </div>

            {/* Input area */}
            <div className="border border-grey-4 rounded-lg p-4">
              <div className="mb-2">
                <p className="font-arial text-body-default text-black">Ask anything...</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-grey-3">
                  <img src="/assets/703763962c6195e997f9692d91517d450635d869.svg" alt="Attach" className="w-4 h-4" />
                  <span>Attach</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-grey-6" />
                  <div className="w-10 h-10 rounded-full bg-asu-maroon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
