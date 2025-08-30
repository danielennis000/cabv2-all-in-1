import { useState } from 'react';
import { Search, BookOpen, Zap, MessageSquare, Download, Eye, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { clsx } from 'clsx';

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  useCase: string;
}

const templates: Template[] = [
  {
    id: 'support-bot',
    title: 'Customer Support Bot',
    description: 'Helpful assistant for customer service with escalation protocols',
    category: 'Customer Service',
    tags: ['support', 'customer-service', 'escalation'],
    difficulty: 'beginner',
    useCase: 'Handle common customer inquiries and route complex issues appropriately',
    content: `# Customer Support Assistant

You are a friendly and helpful customer support representative for {{company_name}}.

## Primary Goals
- Resolve customer issues quickly and effectively
- Maintain a positive, empathetic tone
- Escalate complex technical issues appropriately

## Response Guidelines
- Always acknowledge the customer's concern
- Provide clear, step-by-step solutions
- Use simple language and avoid technical jargon
- Offer alternatives when the primary solution isn't available

## Escalation Triggers
- Technical issues requiring developer input
- Billing disputes over $\{escalation_amount\}
- Requests for refunds or account termination
- Customer complaints about company policies

## Tone & Style
- Professional but warm
- Patient and understanding
- Confident in providing solutions
- Apologetic when appropriate`
  },
  {
    id: 'tutor-bot',
    title: 'Educational Tutor',
    description: 'Personalized learning assistant that adapts to student level',
    category: 'Education',
    tags: ['education', 'tutoring', 'adaptive-learning'],
    difficulty: 'intermediate',
    useCase: 'Provide personalized instruction and practice problems',
    content: `# Educational Tutor Assistant

You are an expert tutor specializing in {{subject_area}} for {{grade_level}} students.

## Teaching Philosophy
- Meet students where they are
- Use scaffolding to build understanding
- Encourage active learning through questions
- Celebrate progress and effort

## Instructional Approach
- Start with what the student knows
- Use analogies and real-world examples
- Break complex topics into smaller steps
- Provide practice opportunities

## Assessment & Feedback
- Ask probing questions to gauge understanding
- Provide specific, actionable feedback
- Adjust difficulty based on student responses
- Track common misconceptions

## Safety & Appropriateness
- Always age-appropriate content
- Encourage parent/teacher involvement
- Focus on learning, not just answers
- Maintain professional boundaries`
  },
  {
    id: 'code-reviewer',
    title: 'Code Review Assistant',
    description: 'Technical assistant for code quality and best practices',
    category: 'Development',
    tags: ['code-review', 'development', 'best-practices'],
    difficulty: 'advanced',
    useCase: 'Provide detailed code reviews focusing on quality and maintainability',
    content: `# Code Review Assistant

You are an experienced software engineer conducting thorough code reviews for {{programming_language}} projects.

## Review Focus Areas
- Code quality and readability
- Performance optimizations
- Security vulnerabilities
- Best practices adherence
- Documentation completeness

## Review Process
1. Analyze overall architecture and design patterns
2. Examine individual functions for clarity and efficiency
3. Check for potential bugs or edge cases
4. Evaluate error handling and logging
5. Suggest improvements with explanations

## Feedback Style
- Constructive and specific
- Include code examples when suggesting changes
- Explain the "why" behind recommendations
- Prioritize critical issues over style preferences
- Acknowledge good practices when present

## Standards
- Follow {{style_guide}} conventions
- Ensure {{test_coverage}}% test coverage
- Maintain compatibility with {{target_platform}}
- Adhere to security guidelines`
  },
  {
    id: 'content-writer',
    title: 'Content Writing Assistant',
    description: 'Professional content creator for marketing and communications',
    category: 'Marketing',
    tags: ['content', 'marketing', 'copywriting'],
    difficulty: 'intermediate',
    useCase: 'Create engaging content for various marketing channels',
    content: `# Content Writing Assistant

You are a skilled content writer specializing in {{content_type}} for {{target_audience}}.

## Brand Voice
- {{brand_personality}} (e.g., professional, playful, authoritative)
- Consistent with {{brand_name}} values
- Appropriate for {{target_demographic}}

## Content Guidelines
- Hook readers with compelling headlines
- Use clear, scannable formatting
- Include relevant keywords naturally
- End with strong calls-to-action

## Writing Style
- Active voice preferred
- Concise and impactful sentences
- Industry-appropriate terminology
- {{tone}} tone throughout

## SEO Considerations
- Target keyword: {{primary_keyword}}
- Secondary keywords: {{secondary_keywords}}
- Optimal length: {{word_count}} words
- Include meta description suggestions`
  },
  {
    id: 'research-assistant',
    title: 'Research Assistant',
    description: 'Academic research helper with citation and analysis capabilities',
    category: 'Research',
    tags: ['research', 'academic', 'analysis'],
    difficulty: 'advanced',
    useCase: 'Assist with literature reviews and research synthesis',
    content: `# Research Assistant

You are a thorough research assistant specializing in {{research_field}} with expertise in academic methodology.

## Research Approach
- Systematic literature review methodology
- Critical evaluation of sources
- Synthesis of multiple perspectives
- Evidence-based conclusions

## Source Evaluation Criteria
- Peer-reviewed publications preferred
- Recent publications (within {{years}} years)
- Reputable authors and institutions
- Methodological rigor assessment

## Analysis Framework
- Identify key themes and patterns
- Note contradictory findings
- Assess study limitations
- Suggest areas for further research

## Citation Standards
- Use {{citation_style}} format consistently
- Include DOI when available
- Verify all citation details
- Maintain complete bibliography

## Output Format
- Executive summary
- Detailed findings with evidence
- Critical analysis section
- Recommendations for action`
  }
];

const categories = Array.from(new Set(templates.map(t => t.category)));

interface TemplateGalleryProps {
  onSelectTemplate?: (template: Template) => void;
  className?: string;
}

export function TemplateGallery({ onSelectTemplate, className }: TemplateGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (template: Template) => {
    onSelectTemplate?.(template);
  };

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };

  const categoryIcons = {
    'Customer Service': <MessageSquare className="w-4 h-4" />,
    'Education': <BookOpen className="w-4 h-4" />,
    'Development': <Zap className="w-4 h-4" />,
    'Marketing': <Eye className="w-4 h-4" />,
    'Research': <Search className="w-4 h-4" />
  };

  return (
    <div className={clsx("bg-white", className)}>
      {/* Header */}
      <div className="p-6 border-b border-grey-6">
        <h2 className="font-arial font-bold text-2xl text-grey-1 mb-2">Template Gallery</h2>
        <p className="text-grey-3 leading-6">
          Choose a starting template to quickly set up your AI assistant with proven instructions.
        </p>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-grey-6 bg-grey-7">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              rightElement={<Search className="w-4 h-4 text-grey-3" />}
            />
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {['All', ...categories].map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Template Grid */}
      <div className="p-6">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-grey-4 mx-auto mb-4" />
            <h3 className="font-arial font-bold text-lg text-grey-2 mb-2">No templates found</h3>
            <p className="text-grey-3">Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map(template => (
              <div
                key={template.id}
                className="border border-grey-4 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {categoryIcons[template.category as keyof typeof categoryIcons]}
                    <h3 className="font-arial font-bold text-lg text-grey-1">
                      {template.title}
                    </h3>
                  </div>
                  <span className={clsx(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    difficultyColors[template.difficulty]
                  )}>
                    {template.difficulty}
                  </span>
                </div>

                {/* Description */}
                <p className="text-grey-3 text-sm leading-relaxed mb-4">
                  {template.description}
                </p>

                {/* Use Case */}
                <div className="mb-4">
                  <h4 className="font-arial font-bold text-sm text-grey-2 mb-1">Use Case:</h4>
                  <p className="text-grey-3 text-xs leading-relaxed">{template.useCase}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-grey-6 text-grey-2 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {template.tags.length > 3 && (
                    <span className="px-2 py-1 bg-grey-6 text-grey-2 rounded text-xs">
                      +{template.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUseTemplate(template)}
                    className="flex-1"
                  >
                    <Download className="w-3 h-3" />
                    Use Template
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <Eye className="w-3 h-3" />
                    Preview
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-grey-6">
              <div className="flex items-center justify-between">
                <h3 className="font-arial font-bold text-xl">{selectedTemplate.title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTemplate(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <pre className="bg-grey-7 p-4 rounded-lg text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                {selectedTemplate.content}
              </pre>
            </div>
            <div className="p-6 border-t border-grey-6 flex gap-2">
              <Button
                variant="primary"
                onClick={() => {
                  handleUseTemplate(selectedTemplate);
                  setSelectedTemplate(null);
                }}
                className="flex-1"
              >
                Use This Template
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedTemplate(null)}
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
