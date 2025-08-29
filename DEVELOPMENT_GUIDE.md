# CAB Frontend Prototype - Development Continuation Guide

This document provides everything needed to continue development seamlessly from where we left off.

---

## 🚀 **QUICK START (For New Chat Sessions)**

### **Project Location**
```bash
cd /Users/danielennis/ai-apps/mab2.0-082925-all-in-one/cab-proto
```

### **Development Commands**
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy (automatic on push to main)
git push origin main
```

### **Live URLs**
- **Development:** http://localhost:5173
- **Production:** https://danielennis000.github.io/cabv2-all-in-1/

---

## 📁 **COMPONENT ARCHITECTURE**

### **Current Component Tree**
```
App.tsx (Route Manager)
├── Layout/
│   ├── Header.tsx (Responsive header with breadcrumbs)
│   └── Sidebar.tsx (Collapsible navigation)
├── BasicInformation.tsx (Figma-adapted form)
├── InstructionWorkbench.tsx (Main editing interface)
│   ├── Editor/
│   │   ├── MarkdownEditor.tsx (Split editor/preview)
│   │   └── TableOfContents.tsx (Auto-generated TOC)
│   └── AI/
│       └── AISidecar.tsx (5 AI editing tools)
└── Templates/
    └── TemplateGallery.tsx (Searchable template library)
```

### **UI Components (Ready for Reuse)**
- `ui/Button.tsx` - 4 variants with proper accessibility
- `ui/Input.tsx` - Form input with label/description/error states
- `ui/Textarea.tsx` - Multi-line input with expansion

---

## 🎨 **STYLING SYSTEM**

### **Tailwind Configuration**
```javascript
// tailwind.config.js - Custom colors already implemented
colors: {
  // User brand palette (from memory)
  'brand-brown': '#B1591E',
  'brand-purple': '#8A5764', 
  'brand-tan': '#DDB176',
  'brand-teal': '#006269',
  'brand-mint': '#A5C9CA',
  'brand-dark-purple': '#634B7B',
  'brand-light-grey': '#F0EDE9',
  
  // ASU brand colors
  'asu-maroon': '#8C1D40',
  'asu-gold': '#FFC627',
  
  // Functional greys (7-step scale)
  'grey-1': '#191919', // darkest
  'grey-7': '#FAFAFA', // lightest
}
```

### **CSS Classes (Ready to Use)**
```css
/* src/index.css - Utility classes */
.btn-primary     /* ASU maroon buttons */
.btn-secondary   /* Grey buttons */
.input-field     /* Consistent form inputs */
.text-area-field /* Multi-line inputs */
```

### **Responsive Breakpoints**
- **Mobile:** < 768px (stacked layouts, overlay sidebars)
- **Tablet:** 768px-1024px (adaptive panels)
- **Desktop:** > 1024px (full three-panel layout)

---

## 🤖 **AI FEATURES IMPLEMENTATION**

### **AISidecar Tools (Currently Mocked)**
```typescript
// 5 implemented tools with realistic responses:
1. "Rewrite for clarity" - Improves readability
2. "Make RAG-ready" - Adds retrieval context
3. "Constrain style/tone/format" - Enforces consistency  
4. "Red-team pass" - Identifies potential issues
5. "Change selected section only" - Targeted edits

// Mock responses in AISidecar.tsx lines 82-120
// Replace with real API calls when ready
```

### **AI Workflow Pattern**
```typescript
// Current pattern in AISidecar.tsx
1. User selects text → setSelectedText()
2. Clicks AI tool → handleToolClick()
3. Shows processing state (1.5s delay)
4. Displays result with rationale
5. User accepts/rejects → onApplyEdit()
```

---

## 📚 **TEMPLATE SYSTEM**

### **Current Templates (5 Professional Examples)**
```typescript
// TemplateGallery.tsx - Ready-to-use templates:
- Customer Support Bot (beginner)
- Educational Tutor (intermediate) 
- Code Review Assistant (advanced)
- Content Writing Assistant (intermediate)
- Research Assistant (advanced)

// Each template includes:
- Title, description, category
- Difficulty level and use case
- Full Markdown content with placeholders
- Tags for filtering
```

### **Template Structure**
```typescript
interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  content: string;           // Full Markdown content
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  useCase: string;
}
```

---

## 📱 **MOBILE RESPONSIVENESS**

### **Implementation Pattern**
```jsx
// Responsive design pattern used throughout:
<div className="flex flex-col lg:flex-row">
  <aside className="hidden lg:block w-80">Desktop Sidebar</aside>
  <main className="flex-1">Content</main>
</div>

// Mobile overlay pattern:
{showSidebar && (
  <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
    <div className="bg-white w-80 h-full">Mobile Sidebar</div>
  </div>
)}
```

### **Key Mobile Features**
- Hamburger menu for sidebar access
- Stacked layouts replace side-by-side
- Touch-optimized button sizes (min 44px)
- Proper viewport meta tag
- Overlay panels with close buttons

---

## 🚧 **NEXT FEATURES TO IMPLEMENT**

### **1. Versioning System (High Priority)**
```bash
# Components to create:
src/components/Versioning/
├── Timeline.tsx          # Checkpoint timeline
├── BranchSwitcher.tsx   # A/B branch management  
├── DiffPanel.tsx        # Visual diff comparison
└── ExportDialog.tsx     # Export functionality

# Store to create:
src/store/useVersionStore.ts  # Zustand store for versions
```

### **2. Reviewer Mode (High Priority)**
```bash
# Components to create:
src/components/Reviewer/
├── CommentPin.tsx       # Anchored comments
├── ReviewModeBar.tsx    # Mode toggle
├── ReviewPanel.tsx      # Comments sidebar
└── ExportReview.tsx     # .cabpkg export

# Features needed:
- Read-only mode toggle
- Comment anchoring system
- Export/import .cabpkg files
```

### **3. Real API Integration**
```bash
# Services to implement:
src/services/
├── claudeClient.ts      # Real Claude API calls
├── storage.ts          # Local persistence
└── diff.ts             # Diff utilities

# Environment variables:
VITE_CLAUDE_MODE=live    # 'mock' or 'live'
VITE_CLAUDE_API_KEY=xxx  # Never commit this!
```

---

## 🔧 **TECHNICAL IMPLEMENTATION NOTES**

### **State Management**
```typescript
// Current: React hooks (simple state)
// Planned: Zustand for complex state

// Document state pattern:
const [content, setContent] = useState(sampleContent);
const [selectedText, setSelectedText] = useState('');

// Future store structure:
interface DocumentStore {
  documents: Document[];
  currentDoc: string;
  versions: Version[];
  currentVersion: string;
}
```

### **Asset Management**
```bash
# All Figma assets in public/assets/
public/assets/
├── *.svg  # 40+ icons and graphics
└── *.png  # Profile images and illustrations

# Usage pattern:
<img src="/assets/filename.svg" alt="Description" />
```

### **Build Configuration**
```typescript
// vite.config.ts - GitHub Pages setup
export default defineConfig({
  base: '/cabv2-all-in-1/',  // Must match repo name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
```

---

## 🧪 **TESTING CHECKLIST**

### **Manual Testing Steps**
```bash
# 1. Build and preview locally
npm run build && npm run preview

# 2. Test responsive design
# - Resize browser window
# - Test mobile overlay panels
# - Verify touch targets

# 3. Test core features
# - Template selection and preview
# - AI Sidecar tool workflow
# - Markdown editor with live preview
# - Table of Contents navigation

# 4. Test deployment
git push origin main
# Wait 2-3 minutes, check live site
```

### **Browser Compatibility**
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (desktop and mobile)
- ✅ Mobile browsers (iOS Safari, Android Chrome)

---

## 📊 **PERFORMANCE METRICS**

### **Current Build Output**
```
dist/index.html                   0.51 kB
dist/assets/index-C2rED7Lu.css   20.27 kB  # Tailwind styles
dist/assets/index-aDYr_Aay.js   239.50 kB  # React bundle
```

### **Optimization Opportunities**
- Code splitting for template gallery (future)
- Image optimization for PNG assets (future)
- Lazy loading for AI Sidecar (future)

---

## 🐛 **COMMON ISSUES & SOLUTIONS**

### **Styling Not Loading**
```bash
# Issue: CSS file is 0 bytes
# Solution: Ensure Tailwind v3.4.0 (not v4)
npm remove tailwindcss @tailwindcss/postcss
npm add -D tailwindcss@^3.4.0

# Verify postcss.config.js:
plugins: { tailwindcss: {}, autoprefixer: {} }
```

### **GitHub Pages 404**
```bash
# Issue: Routes not working on GitHub Pages
# Solution: Check vite.config.ts base path
base: '/cabv2-all-in-1/'  # Must match repo name exactly
```

### **Mobile Sidebar Not Closing**
```javascript
// Issue: Overlay persists on desktop resize
// Solution: Add resize listener to close mobile panels
useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setShowMobileSidebar(false);
    }
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

---

## 🎯 **SUCCESS CRITERIA**

### **Current Status: ✅ ACHIEVED**
- Mobile-responsive design across all features
- Core editing workflow with AI assistance
- Professional template library
- Deployment pipeline working
- All styling and branding implemented

### **Next Milestones:**
1. **Versioning System** - Enable A/B testing workflows
2. **Reviewer Mode** - Enable stakeholder feedback
3. **User Testing** - Validate assumptions with real users
4. **Performance Optimization** - Improve load times

---

**🚀 Ready to continue development!** This codebase is well-organized, fully documented, and ready for the next developer to jump in seamlessly.
