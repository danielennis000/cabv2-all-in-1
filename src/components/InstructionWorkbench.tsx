import { useState, useCallback } from 'react';
import { MarkdownEditor } from './Editor/MarkdownEditor';
import { TableOfContents } from './Editor/TableOfContents';
import { AISidecar } from './AI/AISidecar';
import { PanelLeftOpen, PanelRightOpen } from 'lucide-react';
import { Button } from './ui/Button';

const sampleContent = `# AI Assistant Instructions

You are a helpful, concise tutor who explains complex ideas in simple terms using everyday examples.

## Role & Purpose

Your primary role is to act as an educational tutor who can break down complex concepts into digestible, understandable pieces. You should:

- Use analogies and real-world examples
- Ask clarifying questions when needed
- Provide step-by-step explanations
- Encourage learning through discovery

## Response Style

### Tone & Voice
- Friendly and approachable
- Patient and encouraging
- Professional but not overly formal

### Formatting
- Use bullet points for lists
- Include examples in code blocks when relevant
- Bold key concepts for emphasis

## Knowledge Constraints

- Focus on accuracy over speed
- Admit when you don't know something
- Provide sources when making specific claims
- Avoid speculation on sensitive topics

## Safety Guidelines

- Never provide harmful or dangerous information
- Respect privacy and confidentiality
- Maintain appropriate boundaries in conversations
- Encourage critical thinking rather than blind acceptance`;

export function InstructionWorkbench() {
  const [content, setContent] = useState(sampleContent);
  const [selectedText, setSelectedText] = useState('');
  const [showTOC, setShowTOC] = useState(true);
  const [showAI, setShowAI] = useState(true);

  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  // Future: Add text selection handling
  // const handleTextSelection = useCallback((text: string) => {
  //   setSelectedText(text);
  // }, []);

  const handleApplyEdit = useCallback((editedText: string, rationale: string) => {
    // In a real app, this would apply the edit to the selected portion
    console.log('Applying edit:', { editedText, rationale });
    
    // For demo, we'll replace the selected text
    if (selectedText) {
      const newContent = content.replace(selectedText, editedText);
      setContent(newContent);
      setSelectedText('');
    }
  }, [content, selectedText]);

  const handleSectionClick = useCallback((line: number) => {
    // In a real app, this would scroll to the line in the editor
    console.log('Navigate to line:', line);
  }, []);

  return (
    <div className="flex h-screen bg-white">
      {/* Table of Contents */}
      {showTOC && (
        <div className="w-80 border-r border-grey-6 hidden lg:block">
          <TableOfContents
            content={content}
            onSectionClick={handleSectionClick}
          />
        </div>
      )}

      {/* Toggle TOC Button */}
      <div className="flex flex-col">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowTOC(!showTOC)}
          className="self-start m-2 lg:hidden"
        >
          <PanelLeftOpen className="w-4 h-4" />
        </Button>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex flex-col min-w-0">
        <MarkdownEditor
          value={content}
          onChange={handleContentChange}
          className="flex-1"
        />
      </div>

      {/* AI Sidecar */}
      {showAI && (
        <div className="w-80 hidden lg:block">
          <AISidecar
            selectedText={selectedText}
            onApplyEdit={handleApplyEdit}
          />
        </div>
      )}

      {/* Toggle AI Sidecar Button */}
      <div className="flex flex-col">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAI(!showAI)}
          className="self-start m-2 lg:hidden"
        >
          <PanelRightOpen className="w-4 h-4" />
        </Button>
      </div>

      {/* Mobile Panels */}
      {(showTOC || showAI) && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white w-80 h-full overflow-y-auto">
            {showTOC && (
              <TableOfContents
                content={content}
                onSectionClick={handleSectionClick}
              />
            )}
            {showAI && (
              <AISidecar
                selectedText={selectedText}
                onApplyEdit={handleApplyEdit}
              />
            )}
            <div className="p-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowTOC(false);
                  setShowAI(false);
                }}
                className="w-full"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
