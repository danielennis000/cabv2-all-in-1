# CAB Frontend Prototype

A frontend-only prototype exploring a redesigned experience for Custom Instructions in CreateAI Builder (CAB). This responsive web application is built with React, TypeScript, Vite, and Tailwind CSS, designed to address key user research findings and improve the instruction editing workflow.

![CAB Prototype Screenshot](./public/assets/cab-prototype-preview.png)

## 🎯 Purpose

This prototype directly addresses research findings about user pain points:

- **Starting points**: Template gallery + AI starter for quick setup
- **Small editor limitations**: Full-screen, split-view Markdown editor with sticky TOC
- **Collaboration challenges**: Local version timeline with labels, diffs, and A/B branches
- **Markdown formatting issues**: Native Markdown editor with paste-as-Markdown
- **Workflow prominence**: Instructions as first-class citizens with quick access
- **SME feedback loops**: Reviewer Mode with comment pins and shareable exports
- **Learning from examples**: Examples library with snippet picker

## 🚀 Live Demo

Visit the live prototype: [https://your-username.github.io/cab-proto/](https://your-username.github.io/cab-proto/)

## 📱 Mobile-First Design

The prototype features a fully responsive design that works seamlessly across devices:

- **Mobile (< 768px)**: Collapsible sidebar, stacked layout, touch-optimized controls
- **Tablet (768px - 1024px)**: Adaptive sidebar, flexible content areas
- **Desktop (> 1024px)**: Full sidebar, split-view editor, enhanced preview panel

## 🛠 Tech Stack

- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for responsive styling with custom design tokens
- **Lucide React** for consistent iconography
- **Zustand** for state management (planned)
- **idb-keyval** for local storage persistence (planned)
- **MSW** for API mocking (planned)

## 🎨 Design System

The application uses a comprehensive design system with:

### Color Palette
- **ASU Brand**: Maroon (#8C1D40), Gold (#FFC627), Black, White
- **User Brand**: Brown (#B1591E), Purple (#8A5764), Teal (#006269), etc.
- **Functional Greys**: 7-step grey scale from #191919 to #FAFAFA

### Typography
- **Font**: Arial (system fallback)
- **Scales**: Small (14px/18px), Default (16px/24px), Large (20px/28px)

### Components
- Consistent button variants (primary, secondary, outline, ghost)
- Form controls with focus states and validation
- Responsive layout components

## 🏗 Project Structure

```
cab-proto/
├── src/
│   ├── components/
│   │   ├── Layout/          # Header, Sidebar, main layout
│   │   ├── ui/              # Reusable UI components
│   │   ├── Editor/          # Markdown editor components (planned)
│   │   ├── AI/              # AI sidecar tools (planned)
│   │   ├── Versioning/      # Timeline and branching (planned)
│   │   ├── Templates/       # Template gallery (planned)
│   │   └── Reviewer/        # Comment and review tools (planned)
│   ├── store/               # Zustand stores (planned)
│   ├── services/            # API clients and utilities (planned)
│   ├── mcp/                 # Figma MCP integration (planned)
│   ├── seeds/               # Mock data (planned)
│   └── mocks/               # MSW handlers (planned)
├── public/
│   └── assets/              # Images and icons from Figma
└── .github/workflows/       # GitHub Pages deployment
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd cab-proto
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment.

## 📋 Development Roadmap

### ✅ Completed
- [x] Project setup with Vite + React + TypeScript
- [x] Tailwind CSS integration with custom design tokens
- [x] Mobile-responsive layout with sidebar navigation
- [x] Basic information form with Figma design adaptation
- [x] GitHub Pages deployment configuration

### 🚧 In Progress
- [ ] Core Instruction Workbench with split editor/preview
- [ ] AI Sidecar with section-scoped editing tools

### 📅 Planned
- [ ] Templates & Examples gallery
- [ ] Version timeline and A/B branching
- [ ] Reviewer Mode with comment pins
- [ ] Mock API integration with MSW
- [ ] Figma MCP integration for design tokens
- [ ] Local storage persistence

## 🤝 Contributing

This is a prototype for user testing and feedback. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes with mobile-first design principles
4. Test on multiple screen sizes
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🔗 Related Links

- [Original Figma Design](link-to-figma)
- [User Research Findings](link-to-research)
- [CreateAI Builder Platform](link-to-platform)