import { useState, useMemo } from 'react';
import { ChevronRight, ChevronDown, Hash, Search } from 'lucide-react';
import { clsx } from 'clsx';

interface TOCItem {
  id: string;
  text: string;
  level: number;
  line: number;
}

interface TableOfContentsProps {
  content: string;
  onSectionClick?: (line: number) => void;
  className?: string;
}

export function TableOfContents({ content, onSectionClick, className }: TableOfContentsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  const tocItems = useMemo(() => {
    const lines = content.split('\n');
    const items: TOCItem[] = [];
    
    lines.forEach((line, index) => {
      const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
      if (headerMatch) {
        const level = headerMatch[1].length;
        const text = headerMatch[2].trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        items.push({
          id,
          text,
          level,
          line: index + 1
        });
      }
    });
    
    return items;
  }, [content]);

  const filteredItems = useMemo(() => {
    if (!searchQuery) return tocItems;
    
    return tocItems.filter(item => 
      item.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tocItems, searchQuery]);

  const toggleSection = (id: string) => {
    const newCollapsed = new Set(collapsedSections);
    if (newCollapsed.has(id)) {
      newCollapsed.delete(id);
    } else {
      newCollapsed.add(id);
    }
    setCollapsedSections(newCollapsed);
  };

  const handleSectionClick = (item: TOCItem) => {
    onSectionClick?.(item.line);
  };

  if (tocItems.length === 0) {
    return (
      <div className={clsx("p-4 text-center", className)}>
        <Hash className="w-8 h-8 mx-auto text-grey-4 mb-2" />
        <p className="text-sm text-grey-3">
          Add headings to see table of contents
        </p>
        <p className="text-xs text-grey-4 mt-1">
          Use # ## ### for different levels
        </p>
      </div>
    );
  }

  return (
    <div className={clsx("flex flex-col h-full bg-white", className)}>
      {/* TOC Header */}
      <div className="p-4 border-b border-grey-6">
        <h3 className="font-arial font-bold text-sm text-grey-2 mb-3">Table of Contents</h3>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-grey-3" />
          <input
            type="text"
            placeholder="Search sections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10 w-full h-8 text-sm"
          />
        </div>
      </div>

      {/* TOC Items */}
      <div className="flex-1 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-sm text-grey-3">No sections found</p>
          </div>
        ) : (
          <div className="p-2">
            {filteredItems.map((item, index) => {
              const hasChildren = filteredItems[index + 1]?.level > item.level;
              const isCollapsed = collapsedSections.has(item.id);
              
              return (
                <div key={item.id} className="mb-1">
                  <button
                    onClick={() => handleSectionClick(item)}
                    className={clsx(
                      "w-full flex items-center gap-2 p-2 rounded-lg text-left text-sm transition-colors hover:bg-grey-7",
                      "focus:outline-none focus:ring-2 focus:ring-asu-maroon focus:ring-offset-1"
                    )}
                    style={{ paddingLeft: `${(item.level - 1) * 12 + 8}px` }}
                  >
                    {hasChildren && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSection(item.id);
                        }}
                        className="flex-shrink-0 p-0.5 hover:bg-grey-6 rounded"
                      >
                        {isCollapsed ? (
                          <ChevronRight className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </button>
                    )}
                    
                    <Hash className="w-3 h-3 text-grey-4 flex-shrink-0" />
                    
                    <span className={clsx(
                      "truncate",
                      item.level === 1 && "font-bold text-grey-1",
                      item.level === 2 && "font-medium text-grey-2",
                      item.level >= 3 && "text-grey-2"
                    )}>
                      {item.text}
                    </span>
                    
                    <span className="text-xs text-grey-4 ml-auto flex-shrink-0">
                      {item.line}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* TOC Stats */}
      <div className="p-4 border-t border-grey-6 bg-grey-7">
        <p className="text-xs text-grey-3">
          {tocItems.length} section{tocItems.length !== 1 ? 's' : ''} • {content.split('\n').length} lines
        </p>
      </div>
    </div>
  );
}
