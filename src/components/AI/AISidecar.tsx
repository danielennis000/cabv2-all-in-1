import { useState } from 'react';
import { Wand2, Shield, Zap, Search, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { clsx } from 'clsx';

interface AISidecarProps {
  selectedText?: string;
  onApplyEdit?: (editedText: string, rationale: string) => void;
  className?: string;
}

interface AITool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'rewrite' | 'enhance' | 'analyze';
}

const aiTools: AITool[] = [
  {
    id: 'rewrite-clarity',
    title: 'Rewrite for clarity',
    description: 'Make the text clearer and easier to understand',
    icon: <Wand2 className="w-4 h-4" />,
    category: 'rewrite'
  },
  {
    id: 'make-rag-ready',
    title: 'Make RAG-ready',
    description: 'Add retrieval assumptions and document structure hints',
    icon: <Search className="w-4 h-4" />,
    category: 'enhance'
  },
  {
    id: 'constrain-style',
    title: 'Constrain style/tone/format',
    description: 'Improve consistency in voice and formatting',
    icon: <Sparkles className="w-4 h-4" />,
    category: 'enhance'
  },
  {
    id: 'red-team',
    title: 'Red-team pass',
    description: 'Detect ambiguity and potential failure cases',
    icon: <Shield className="w-4 h-4" />,
    category: 'analyze'
  },
  {
    id: 'section-only',
    title: 'Change selected section only',
    description: 'Apply focused edits to the current selection',
    icon: <Zap className="w-4 h-4" />,
    category: 'rewrite'
  }
];

export function AISidecar({ selectedText, onApplyEdit, className }: AISidecarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResult, setLastResult] = useState<{
    original: string;
    edited: string;
    rationale: string;
    tool: string;
  } | null>(null);

  const categories = [
    { id: 'all', label: 'All Tools' },
    { id: 'rewrite', label: 'Rewrite' },
    { id: 'enhance', label: 'Enhance' },
    { id: 'analyze', label: 'Analyze' }
  ];

  const filteredTools = activeCategory === 'all' 
    ? aiTools 
    : aiTools.filter(tool => tool.category === activeCategory);

  const handleToolClick = async (tool: AITool) => {
    if (!selectedText && tool.id !== 'section-only') {
      alert('Please select some text first');
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockResults = {
        'rewrite-clarity': {
          edited: selectedText ? 
            `You are a clear, helpful assistant who explains complex concepts in simple terms. Use everyday examples and avoid jargon. ${selectedText.slice(20)}` :
            'No text selected',
          rationale: 'Improved clarity by adding specific guidance about explanation style and example usage. Removed redundant phrases and made the instruction more actionable.'
        },
        'make-rag-ready': {
          edited: selectedText ?
            `${selectedText}\n\n## Retrieval Context\nWhen retrieving information, prioritize recent and authoritative sources. Structure responses with clear sections for easy parsing.` :
            'No text selected',
          rationale: 'Added retrieval context section to help the AI understand how to work with external knowledge sources effectively.'
        },
        'constrain-style': {
          edited: selectedText ?
            `${selectedText}\n\nAlways maintain a professional, concise tone. Use bullet points for lists and bold text for emphasis. Keep responses under 200 words unless specifically requested otherwise.` :
            'No text selected',
          rationale: 'Added specific style constraints to ensure consistent formatting and tone across all responses.'
        },
        'red-team': {
          edited: selectedText || '',
          rationale: 'Potential issues found: The instruction lacks specificity about edge cases. Consider adding guidance for handling ambiguous questions and fallback responses when the AI lacks sufficient information.'
        },
        'section-only': {
          edited: selectedText ?
            selectedText.replace(/\b\w+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1)) :
            'No text selected',
          rationale: 'Applied targeted formatting improvements to the selected section only, preserving the overall document structure.'
        }
      };

      const result = mockResults[tool.id as keyof typeof mockResults];
      
      setLastResult({
        original: selectedText || '',
        edited: result.edited,
        rationale: result.rationale,
        tool: tool.title
      });
      
      setIsProcessing(false);
    }, 1500);
  };

  const handleApplyEdit = () => {
    if (lastResult && onApplyEdit) {
      onApplyEdit(lastResult.edited, lastResult.rationale);
      setLastResult(null);
    }
  };

  return (
    <div className={clsx("bg-white border-l border-grey-6 flex flex-col", className)}>
      {/* Header */}
      <div className="p-4 border-b border-grey-6 bg-grey-7">
        <div className="flex items-center justify-between">
          <h3 className="font-arial font-bold text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-asu-maroon" />
            AI Sidecar
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="lg:hidden"
          >
            {isCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
        <p className="text-sm text-grey-3 mt-1">
          Propose changes only to selected section. You approve every change.
        </p>
      </div>

      {/* Content */}
      <div className={clsx("flex-1 flex flex-col", isCollapsed && "hidden lg:flex")}>
        {/* Selection Status */}
        <div className="p-4 border-b border-grey-6">
          <div className="text-sm">
            <span className="text-grey-3">Selected: </span>
            <span className="font-medium text-grey-2">
              {selectedText ? 
                `${selectedText.slice(0, 50)}${selectedText.length > 50 ? '...' : ''}` : 
                'No text selected'
              }
            </span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="p-4 border-b border-grey-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "primary" : "ghost"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="text-xs"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* AI Tools */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredTools.map(tool => (
            <Button
              key={tool.id}
              variant="outline"
              onClick={() => handleToolClick(tool)}
              disabled={isProcessing}
              className="w-full p-4 h-auto flex flex-col items-start gap-2 text-left"
            >
              <div className="flex items-center gap-2 w-full">
                {tool.icon}
                <span className="font-medium text-sm">{tool.title}</span>
              </div>
              <p className="text-xs text-grey-3 leading-relaxed">
                {tool.description}
              </p>
            </Button>
          ))}
        </div>

        {/* Processing State */}
        {isProcessing && (
          <div className="p-4 border-t border-grey-6 bg-grey-7">
            <div className="flex items-center gap-2 text-sm text-asu-maroon">
              <div className="animate-spin w-4 h-4 border-2 border-asu-maroon border-t-transparent rounded-full" />
              Processing with AI...
            </div>
          </div>
        )}

        {/* Results */}
        {lastResult && !isProcessing && (
          <div className="border-t border-grey-6 bg-grey-7">
            <div className="p-4">
              <div className="mb-3">
                <h4 className="font-arial font-bold text-sm text-grey-2 mb-2">
                  Proposed Changes ({lastResult.tool})
                </h4>
                <p className="text-xs text-grey-3 leading-relaxed mb-3">
                  {lastResult.rationale}
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white border border-grey-4 rounded p-3 max-h-32 overflow-y-auto">
                  <p className="text-sm font-mono text-grey-2">
                    {lastResult.edited}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleApplyEdit}
                    className="flex-1"
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setLastResult(null)}
                    className="flex-1"
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
