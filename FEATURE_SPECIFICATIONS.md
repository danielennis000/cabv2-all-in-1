# CAB Frontend Prototype - Detailed Feature Specifications

This document provides detailed specifications for all implemented features and planned additions.

---

## ✅ **IMPLEMENTED FEATURES**

### **1. Instruction Workbench**

#### **Purpose**
Solves the "small editor" pain point identified in user research by providing a full-screen, professional editing environment.

#### **Components**
- **File:** `src/components/InstructionWorkbench.tsx`
- **Dependencies:** MarkdownEditor, TableOfContents, AISidecar

#### **Features**
```typescript
// Core functionality
- Split editor/preview layout (resizable)
- Fullscreen mode toggle
- Live Markdown preview with custom styling
- Auto-save functionality (localStorage ready)
- Search within content
- Section navigation via Table of Contents

// Mobile adaptations
- Stacked layout on mobile
- Collapsible panels with overlay
- Touch-optimized controls
```

#### **User Flow**
1. User opens Workbench from navigation
2. Sees sample content with professional structure
3. Can edit in left panel, preview in right panel
4. TOC auto-updates as they add headers
5. AI Sidecar provides editing assistance

#### **Technical Implementation**
```typescript
// State management
const [content, setContent] = useState(sampleContent);
const [selectedText, setSelectedText] = useState('');
const [showTOC, setShowTOC] = useState(true);
const [showAI, setShowAI] = useState(true);

// Responsive panel management
// Desktop: Three-panel layout
// Mobile: Overlay panels with close buttons
```

---

### **2. AI Sidecar**

#### **Purpose**
Provides section-scoped AI editing tools that users can trust through an approve/reject workflow.

#### **File:** `src/components/AI/AISidecar.tsx`

#### **5 AI Tools Implemented**
```typescript
1. "Rewrite for clarity"
   - Purpose: Make text clearer and easier to understand
   - Mock result: Adds specific guidance, removes jargon

2. "Make RAG-ready" 
   - Purpose: Add retrieval assumptions and structure hints
   - Mock result: Adds retrieval context section

3. "Constrain style/tone/format"
   - Purpose: Improve consistency in voice and formatting  
   - Mock result: Adds specific style constraints

4. "Red-team pass"
   - Purpose: Detect ambiguity and potential failure cases
   - Mock result: Lists potential issues and edge cases

5. "Change selected section only"
   - Purpose: Apply focused edits to current selection
   - Mock result: Applies targeted formatting improvements
```

#### **User Flow**
1. User selects text in the editor
2. Selection appears in sidecar status area
3. User clicks one of 5 AI tools
4. Loading state shows (1.5s realistic delay)
5. Proposed changes appear with rationale
6. User accepts or rejects the changes
7. If accepted, changes apply to the document

#### **Mock AI Response Structure**
```typescript
interface AIResult {
  original: string;    // Selected text
  edited: string;      // Proposed changes
  rationale: string;   // Explanation of changes
  tool: string;        // Which tool was used
}
```

---

### **3. Template Gallery**

#### **Purpose**
Addresses "people go to ChatGPT first" by providing proven starting points for instruction creation.

#### **File:** `src/components/Templates/TemplateGallery.tsx`

#### **5 Professional Templates**
```typescript
1. Customer Support Bot (Beginner)
   - 24/7 support assistant with escalation protocols
   - Variables: {{company_name}}, {{escalation_amount}}
   - Perfect for customer service teams

2. Educational Tutor (Intermediate)  
   - Adaptive learning assistant for students
   - Variables: {{subject_area}}, {{grade_level}}
   - Scaffolding approach with assessment

3. Code Review Assistant (Advanced)
   - Technical code quality reviewer
   - Variables: {{programming_language}}, {{style_guide}}
   - Security, performance, best practices focus

4. Content Writing Assistant (Intermediate)
   - Marketing content creator
   - Variables: {{content_type}}, {{brand_personality}}
   - SEO-aware with brand voice consistency

5. Research Assistant (Advanced)
   - Academic research and analysis helper
   - Variables: {{research_field}}, {{citation_style}}
   - Systematic methodology with source evaluation
```

#### **Features**
- **Search:** Filter by title, description, or tags
- **Category Filter:** Customer Service, Education, Development, Marketing, Research
- **Difficulty Levels:** Visual badges (Beginner/Intermediate/Advanced)
- **Preview Modal:** Full template content with syntax highlighting
- **One-Click Apply:** Instant loading into workbench

#### **Template Structure**
```typescript
interface Template {
  id: string;              // Unique identifier
  title: string;           // Display name
  description: string;     // Brief summary
  category: string;        // For filtering
  tags: string[];          // For search
  content: string;         // Full Markdown template
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  useCase: string;         // When to use this template
}
```

---

### **4. Table of Contents**

#### **Purpose**
Enables navigation through long instruction documents, solving the "hard to edit long content" problem.

#### **File:** `src/components/Editor/TableOfContents.tsx`

#### **Features**
```typescript
// Auto-generation from Markdown headers
- Parses # ## ### headers automatically
- Creates hierarchical structure
- Shows line numbers for each section

// Interactive navigation
- Click to jump to section (planned)
- Search within sections
- Collapsible subsections
- Document statistics (sections, lines)

// Responsive design
- Fixed sidebar on desktop
- Overlay panel on mobile
- Search functionality on all screen sizes
```

#### **Technical Implementation**
```typescript
// Header parsing algorithm
const tocItems = useMemo(() => {
  const lines = content.split('\n');
  const items: TOCItem[] = [];
  
  lines.forEach((line, index) => {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const text = headerMatch[2].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      items.push({ id, text, level, line: index + 1 });
    }
  });
  
  return items;
}, [content]);
```

---

### **5. Responsive Layout System**

#### **Purpose**
Ensures the application works excellently on all device sizes, addressing mobile usability concerns.

#### **Implementation Files**
- `src/components/Layout/Header.tsx` - Responsive header
- `src/components/Layout/Sidebar.tsx` - Collapsible navigation
- All components use mobile-first responsive patterns

#### **Breakpoint Strategy**
```css
/* Mobile First Approach */
.component {
  /* Mobile styles (default) */
}

@media (min-width: 768px) {
  /* Tablet styles */
}

@media (min-width: 1024px) {
  /* Desktop styles */
}
```

#### **Mobile Adaptations**
- **Sidebar:** Hamburger menu → overlay panel
- **Editor:** Stacked layout → split view  
- **AI Sidecar:** Collapsible → fixed panel
- **Templates:** Single column → grid layout
- **Buttons:** Touch targets 44px minimum

---

## 🚧 **PLANNED FEATURES (Next Implementation)**

### **1. Versioning System**

#### **Purpose**
Enable A/B testing and collaborative workflows with change tracking.

#### **Components to Build**
```typescript
// src/components/Versioning/Timeline.tsx
- Checkpoint timeline view
- Labels and notes for each version
- Branch visualization
- Diff summaries

// src/components/Versioning/BranchSwitcher.tsx  
- A/B branch management
- Quick switch between versions
- Side-by-side comparison mode

// src/components/Versioning/DiffPanel.tsx
- Visual diff rendering
- Accept/reject individual changes
- Merge conflict resolution

// src/store/useVersionStore.ts
- Zustand store for version state
- Checkpoint creation/management
- Branch operations
```

#### **Data Model**
```typescript
interface Version {
  id: string;
  docId: string;
  label: string;           // User-friendly name
  notes?: string;          // Optional description
  branch: string;          // "main" or custom branch name
  markdown: string;        // Document content at this version
  diffs?: Diff[];          // Changes from previous version
  createdAt: number;       // Timestamp
  author?: string;         // Who created this version
}

interface Branch {
  name: string;
  baseVersion: string;     // Version this branched from
  currentVersion: string;  // Latest version in this branch
  description?: string;    // Purpose of this branch
}
```

#### **User Stories**
- As a user, I want to save checkpoints with meaningful labels
- As a user, I want to create A/B branches to test different approaches
- As a user, I want to compare versions side-by-side
- As a user, I want to merge successful experiments back to main

---

### **2. Reviewer Mode**

#### **Purpose**
Enable stakeholder feedback without editing permissions, supporting SME review workflows.

#### **Components to Build**
```typescript
// src/components/Reviewer/CommentPin.tsx
- Anchored comments on specific sections
- Reply threading
- Resolution status tracking

// src/components/Reviewer/ReviewModeBar.tsx
- Toggle between edit and review modes
- Export review package (.cabpkg)
- Share review links

// src/components/Reviewer/ReviewPanel.tsx
- Comments sidebar
- Filter by status (open/resolved)
- User assignment and notifications
```

#### **Data Model**
```typescript
interface Comment {
  id: string;
  docId: string;
  versionId: string;
  target: {
    headingId?: string;    // Anchored to specific heading
    start?: number;        // Character position start
    end?: number;          // Character position end
  };
  author: string;
  text: string;
  replies?: Comment[];    // Thread support
  resolved: boolean;
  createdAt: number;
  updatedAt: number;
}

interface ReviewPackage {
  document: {
    title: string;
    content: string;
    version: string;
  };
  comments: Comment[];
  metadata: {
    reviewerCount: number;
    createdAt: number;
    deadline?: number;
  };
}
```

#### **Export Format (.cabpkg)**
```json
{
  "format": "CAB Review Package",
  "version": "1.0",
  "document": {
    "title": "AI Assistant Instructions",
    "content": "# Full markdown content...",
    "checksum": "abc123..."
  },
  "comments": [...],
  "metadata": {
    "exported": "2025-08-29T23:00:00Z",
    "reviewers": ["alice@company.com", "bob@company.com"]
  }
}
```

---

### **3. Live API Integration**

#### **Purpose**
Replace mock AI responses with real Claude API calls for production use.

#### **Implementation Strategy**
```typescript
// src/services/claudeClient.ts
class ClaudeClient {
  private mode: 'mock' | 'live';
  
  async rewriteForClarity(text: string): Promise<AIResult> {
    if (this.mode === 'mock') {
      return mockRewriteResponse(text);
    }
    
    return this.callClaudeAPI({
      prompt: `Rewrite this text for clarity: ${text}`,
      maxTokens: 500,
      temperature: 0.3
    });
  }
  
  // Similar methods for other AI tools...
}

// Environment-based configuration
const claudeClient = new ClaudeClient({
  mode: import.meta.env.VITE_CLAUDE_MODE,
  apiKey: import.meta.env.VITE_CLAUDE_API_KEY,
  baseURL: import.meta.env.VITE_CLAUDE_BASE_URL
});
```

#### **Security Considerations**
- Never commit API keys to repository
- Use environment variables for configuration
- Implement rate limiting and error handling
- Add usage tracking and cost monitoring

---

## 🎨 **DESIGN SYSTEM SPECIFICATIONS**

### **Color Palette (Fully Implemented)**
```css
/* User brand colors (from memory) */
--brand-brown: #B1591E;
--brand-purple: #8A5764;
--brand-tan: #DDB176;
--brand-teal: #006269;
--brand-mint: #A5C9CA;
--brand-dark-purple: #634B7B;
--brand-light-grey: #F0EDE9;

/* ASU brand colors */
--asu-maroon: #8C1D40;
--asu-gold: #FFC627;
--asu-black: #000000;
--asu-white: #FFFFFF;

/* Functional greys (7-step scale) */
--grey-1: #191919;  /* Primary text */
--grey-2: #484848;  /* Secondary text */
--grey-3: #747474;  /* Tertiary text */
--grey-4: #BFBFBF;  /* Border color */
--grey-5: #D0D0D0;  /* Light border */
--grey-6: #E8E8E8;  /* Background */
--grey-7: #FAFAFA;  /* Light background */
```

### **Component Variants**
```typescript
// Button variants (implemented)
- primary: ASU maroon background, white text
- secondary: Grey background, black text  
- outline: White background, grey border
- ghost: Transparent background, grey text

// Size variants
- sm: height 28px, padding 12px
- default: height 30px, padding 16px
- lg: height 40px, padding 24px

// State variants
- default: Normal appearance
- hover: Slightly darker/lighter
- focus: Ring outline in brand color
- disabled: 50% opacity, no interactions
```

### **Typography Scale**
```css
/* Implemented font sizes */
.text-body-small   { font-size: 14px; line-height: 18px; }
.text-body-default { font-size: 16px; line-height: 24px; }
.text-body-large   { font-size: 20px; line-height: 28px; }

/* Font weights */
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-bold   { font-weight: 700; }

/* Font family */
.font-arial { font-family: Arial, system-ui, sans-serif; }
```

---

## 📊 **ANALYTICS & METRICS (Future Implementation)**

### **User Behavior Tracking**
```typescript
// Events to track
interface AnalyticsEvent {
  action: 'template_selected' | 'ai_tool_used' | 'version_created' | 'comment_added';
  properties: {
    templateId?: string;
    toolType?: string;
    duration?: number;
    accepted?: boolean;
  };
  userId: string;
  timestamp: number;
}

// Metrics to measure
- Time to first meaningful draft
- AI suggestion acceptance rate  
- Template usage patterns
- Mobile vs desktop usage
- Feature adoption rates
- User satisfaction scores
```

### **Performance Monitoring**
```typescript
// Core Web Vitals tracking
- Largest Contentful Paint (LCP)
- First Input Delay (FID)  
- Cumulative Layout Shift (CLS)
- First Contentful Paint (FCP)

// Custom metrics
- Editor load time
- Template preview speed
- AI response latency
- Build bundle size tracking
```

---

**🎯 This specification provides complete implementation details for continuing development or onboarding new team members.**
