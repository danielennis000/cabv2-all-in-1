export interface PromptSnippet {
  id: string;
  title: string;
  description: string;
  category: 'Chain of Thought' | 'Custom Instructions' | 'Coding' | 'Analysis' | 'Creative' | 'Business';
  content: string;
  author: string;
  rating: number;
  downloads: number;
  tags: string[];
  createdAt: Date;
}

export const promptLibrary: PromptSnippet[] = [
  {
    id: 'cot-1',
    title: 'Step-by-Step Problem Solving',
    description: 'Chain of thought pattern for breaking down complex problems into manageable steps',
    category: 'Chain of Thought',
    content: `Think through this step by step:

1. **Understand the Problem**: What exactly is being asked?
2. **Identify Key Information**: What facts do we have?
3. **Break Down**: What are the smaller components?
4. **Apply Logic**: What reasoning should we use?
5. **Verify**: Does our answer make sense?

Let me work through this systematically...`,
    author: 'Dr. Sarah Chen',
    rating: 4.8,
    downloads: 1247,
    tags: ['problem-solving', 'methodology', 'structured-thinking'],
    createdAt: new Date('2025-01-10T10:00:00')
  },
  {
    id: 'custom-1',
    title: 'Professional Email Tone',
    description: 'Instructions for maintaining professional yet approachable email communication',
    category: 'Custom Instructions',
    content: `## Email Communication Style

### Tone Guidelines
- Professional but warm and approachable
- Concise without being abrupt
- Empathetic when addressing concerns
- Confident but not arrogant

### Structure
- Clear subject lines that summarize the purpose
- Proper greeting based on relationship level
- Main message in 2-3 paragraphs maximum
- Clear call-to-action when needed
- Professional closing

### Language Preferences
- Use "we" instead of "I" when representing the company
- Avoid jargon unless necessary
- Include context for new recipients
- Always proofread before sending`,
    author: 'Jennifer Kim',
    rating: 4.9,
    downloads: 892,
    tags: ['email', 'communication', 'professional', 'tone'],
    createdAt: new Date('2025-01-12T14:30:00')
  },
  {
    id: 'coding-1',
    title: 'Code Review Best Practices',
    description: 'Comprehensive framework for conducting thorough and constructive code reviews',
    category: 'Coding',
    content: `## Code Review Checklist

### Functionality
- [ ] Does the code do what it's supposed to do?
- [ ] Are edge cases handled appropriately?
- [ ] Is error handling comprehensive?

### Code Quality
- [ ] Is the code readable and well-documented?
- [ ] Are variables and functions named descriptively?
- [ ] Is the logic clear and efficient?

### Security & Performance
- [ ] Are there any security vulnerabilities?
- [ ] Is the code optimized for performance?
- [ ] Are database queries efficient?

### Testing
- [ ] Are there adequate unit tests?
- [ ] Do tests cover edge cases?
- [ ] Is test coverage above 80%?

### Style & Standards
- [ ] Does code follow team conventions?
- [ ] Is formatting consistent?
- [ ] Are imports organized properly?`,
    author: 'Alex Patel',
    rating: 4.7,
    downloads: 623,
    tags: ['code-review', 'quality', 'best-practices', 'development'],
    createdAt: new Date('2025-01-08T09:15:00')
  },
  {
    id: 'analysis-1',
    title: 'Data Analysis Framework',
    description: 'Structured approach to analyzing data and presenting insights',
    category: 'Analysis',
    content: `## Data Analysis Methodology

### 1. Data Understanding
- Source and collection method
- Data quality assessment
- Sample size and time period
- Potential biases or limitations

### 2. Exploratory Analysis
- Descriptive statistics
- Data distribution patterns
- Outlier identification
- Correlation analysis

### 3. Key Findings
- Most significant patterns
- Unexpected discoveries
- Statistical significance
- Confidence levels

### 4. Business Implications
- What do these findings mean?
- Recommended actions
- Potential risks or opportunities
- Next steps for investigation

### 5. Visualization
- Clear, labeled charts
- Appropriate chart types
- Highlighting key insights
- Executive summary format`,
    author: 'Lisa Chang',
    rating: 4.6,
    downloads: 445,
    tags: ['data-analysis', 'methodology', 'insights', 'visualization'],
    createdAt: new Date('2025-01-05T16:20:00')
  },
  {
    id: 'creative-1',
    title: 'Brainstorming Facilitator',
    description: 'Guide for leading productive brainstorming sessions with diverse teams',
    category: 'Creative',
    content: `## Brainstorming Session Guide

### Pre-Session Setup
- Define clear objectives
- Invite diverse perspectives
- Prepare stimulating questions
- Set ground rules for participation

### Session Structure (60 minutes)
**10 min**: Welcome & objective clarification
**15 min**: Individual idea generation
**20 min**: Group sharing (no judgment)
**10 min**: Idea clustering and themes
**5 min**: Next steps and follow-up

### Facilitation Techniques
- "Yes, and..." instead of "Yes, but..."
- Encourage wild ideas
- Build on others' suggestions
- Stay focused on quantity first
- Defer judgment until later

### Follow-up Actions
- Document all ideas
- Schedule evaluation session
- Assign action items
- Share summary with participants`,
    author: 'Maria Gonzalez',
    rating: 4.5,
    downloads: 356,
    tags: ['brainstorming', 'facilitation', 'creativity', 'teamwork'],
    createdAt: new Date('2025-01-03T11:45:00')
  },
  {
    id: 'business-1',
    title: 'Executive Summary Template',
    description: 'Structure for writing compelling executive summaries that get read',
    category: 'Business',
    content: `## Executive Summary Framework

### Opening Hook (1-2 sentences)
- The most compelling finding or recommendation
- Why this matters to the reader specifically

### Problem Statement (2-3 sentences)
- Current situation or challenge
- Impact on business/organization
- Urgency or timing considerations

### Solution Overview (2-3 sentences)
- Recommended approach
- Key benefits or outcomes
- Resource requirements (high-level)

### Supporting Evidence (3-4 bullet points)
- Most convincing data points
- Credible sources or research
- Risk mitigation factors

### Call to Action (1-2 sentences)
- Specific next steps requested
- Timeline for decision or implementation
- Contact for questions or discussion

**Total length: Keep under 250 words for maximum impact**`,
    author: 'Robert Wilson',
    rating: 4.8,
    downloads: 789,
    tags: ['executive-summary', 'business-writing', 'communication', 'leadership'],
    createdAt: new Date('2024-12-28T13:30:00')
  }
];

export const getPromptsByCategory = (category: PromptSnippet['category']) =>
  promptLibrary.filter(prompt => prompt.category === category);

export const getTopRatedPrompts = (limit: number = 5) =>
  promptLibrary
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);

export const getMostDownloadedPrompts = (limit: number = 5) =>
  promptLibrary
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, limit);

export const searchPrompts = (query: string) =>
  promptLibrary.filter(prompt =>
    prompt.title.toLowerCase().includes(query.toLowerCase()) ||
    prompt.description.toLowerCase().includes(query.toLowerCase()) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
