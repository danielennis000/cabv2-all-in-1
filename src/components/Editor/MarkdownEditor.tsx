import { useState, useCallback } from 'react';
import { Maximize2, Minimize2, Search, FileText, Eye } from 'lucide-react';
import { Button } from '../ui/Button';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function MarkdownEditor({ value, onChange, className }: MarkdownEditorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 border-b border-grey-6 bg-white">
        <div className="flex items-center gap-4">
          <h2 className="font-arial font-bold text-lg">Custom Instructions</h2>
          <div className="flex items-center gap-2">
            <Button
              variant={showPreview ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Edit</span>
            </Button>
            <Button
              variant={showPreview ? "ghost" : "secondary"}
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Preview</span>
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-grey-3" />
            <input
              type="text"
              placeholder="Search sections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 w-48 h-8 text-sm"
            />
          </div>
          
          {/* Fullscreen toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className={`flex flex-1 ${showPreview ? 'flex-col lg:flex-row' : 'flex-col'}`}>
        {/* Editor Pane */}
        <div className={`flex flex-col ${showPreview ? 'lg:w-1/2' : 'w-full'}`}>
          <div className="p-4 border-b border-grey-6 bg-grey-7">
            <h3 className="font-arial font-bold text-sm text-grey-2">Markdown Editor</h3>
          </div>
          <div className="flex-1 p-4">
            <textarea
              value={value}
              onChange={handleChange}
              placeholder="# Your AI Assistant Instructions

Write your custom instructions here using Markdown...

## Role & Purpose
Define what your AI should do and how it should behave.

## Response Style
Specify tone, length, and formatting preferences.

## Knowledge & Context
Add any specific domain knowledge or constraints."
              className="w-full h-full min-h-[400px] border border-grey-4 rounded-lg p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-asu-maroon focus:border-transparent"
            />
          </div>
        </div>

        {/* Preview Pane */}
        {showPreview && (
          <div className="flex flex-col lg:w-1/2 border-l border-grey-6">
            <div className="p-4 border-b border-grey-6 bg-grey-7">
              <h3 className="font-arial font-bold text-sm text-grey-2">Live Preview</h3>
            </div>
            <div className="flex-1 p-4 bg-white overflow-y-auto">
              <MarkdownPreview content={value} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MarkdownPreview({ content }: { content: string }) {
  // Simple markdown parser for preview
  const parseMarkdown = (text: string) => {
    return text
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 text-grey-1">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-3 text-grey-1">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mb-2 text-grey-1">$1</h3>')
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
      .replace(/^\- (.*$)/gim, '<li class="ml-4 mb-1">• $1</li>')
      .replace(/\n\n/gim, '</p><p class="mb-4">')
      .replace(/\n/gim, '<br />');
  };

  if (!content.trim()) {
    return (
      <div className="text-grey-3 italic">
        Your markdown preview will appear here as you type...
      </div>
    );
  }

  return (
    <div 
      className="prose prose-sm max-w-none font-arial text-grey-2 leading-6"
      dangerouslySetInnerHTML={{ 
        __html: `<p class="mb-4">${parseMarkdown(content)}</p>` 
      }}
    />
  );
}
