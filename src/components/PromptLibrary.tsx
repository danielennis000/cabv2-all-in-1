import { useState } from 'react';
import { 
  Search, 
  Star, 
  Download, 
  Eye, 
  Plus, 
  TrendingUp,
  Clock,
  User,
  Copy,
  Check,
  X
} from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { promptLibrary, type PromptSnippet } from '../seeds/promptLibrary';
import { clsx } from 'clsx';

interface PromptLibraryProps {
  onUsePrompt?: (prompt: PromptSnippet) => void;
  className?: string;
}

export function PromptLibrary({ onUsePrompt, className }: PromptLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'downloads' | 'recent'>('rating');
  const [selectedPrompt, setSelectedPrompt] = useState<PromptSnippet | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(promptLibrary.map(p => p.category)))];

  const filteredPrompts = promptLibrary
    .filter(prompt => {
      const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || prompt.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'downloads':
          return b.downloads - a.downloads;
        case 'recent':
          return b.createdAt.getTime() - a.createdAt.getTime();
        default:
          return b.rating - a.rating;
      }
    });

  const handleCopyPrompt = async (prompt: PromptSnippet) => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopiedPromptId(prompt.id);
      setTimeout(() => setCopiedPromptId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 30) {
      return `${diffInDays} days ago`;
    } else {
      const months = Math.floor(diffInDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Chain of Thought': 'bg-blue-100 text-blue-800',
      'Custom Instructions': 'bg-green-100 text-green-800',
      'Coding': 'bg-purple-100 text-purple-800',
      'Analysis': 'bg-orange-100 text-orange-800',
      'Creative': 'bg-pink-100 text-pink-800',
      'Business': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category as keyof typeof colors] || 'bg-grey-6 text-grey-3';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={clsx(
          "w-3 h-3",
          i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-grey-4"
        )}
      />
    ));
  };

  return (
    <div className={clsx("bg-white", className)}>
      {/* Header */}
      <div className="p-6 border-b border-grey-6">
        <h2 className="font-arial font-bold text-2xl text-grey-1 mb-2">
          Prompt Library from the Community
        </h2>
        <p className="text-grey-3 leading-6 mb-4">
          Custom instructions designed to solve common problems. Chain of thought snippets, coding recommendations, and more.
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-grey-7 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-brand-teal" />
              <span className="text-sm font-arial font-medium text-grey-2">Most Popular</span>
            </div>
            <span className="text-lg font-arial font-bold text-grey-1">
              {promptLibrary.reduce((max, p) => p.downloads > max.downloads ? p : max).title}
            </span>
          </div>
          
          <div className="bg-grey-7 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-arial font-medium text-grey-2">Highest Rated</span>
            </div>
            <span className="text-lg font-arial font-bold text-grey-1">
              {promptLibrary.reduce((max, p) => p.rating > max.rating ? p : max).title}
            </span>
          </div>
          
          <div className="bg-grey-7 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-brand-purple" />
              <span className="text-sm font-arial font-medium text-grey-2">Latest</span>
            </div>
            <span className="text-lg font-arial font-bold text-grey-1">
              {promptLibrary.reduce((latest, p) => p.createdAt > latest.createdAt ? p : latest).title}
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-grey-6 bg-grey-7">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <Input
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              rightElement={<Search className="w-4 h-4 text-grey-3" />}
            />
          </div>
          
          {/* Controls */}
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-grey-5 rounded-lg text-sm font-arial focus:outline-none focus:ring-2 focus:ring-asu-maroon focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-grey-5 rounded-lg text-sm font-arial focus:outline-none focus:ring-2 focus:ring-asu-maroon focus:border-transparent"
            >
              <option value="rating">Highest Rated</option>
              <option value="downloads">Most Downloaded</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Prompt Grid */}
      <div className="p-6">
        {filteredPrompts.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-grey-4 mx-auto mb-4" />
            <h3 className="font-arial font-bold text-lg text-grey-2 mb-2">No prompts found</h3>
            <p className="text-grey-3">Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPrompts.map(prompt => (
              <div
                key={prompt.id}
                className="border border-grey-4 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-arial font-bold text-lg text-grey-1">
                        {prompt.title}
                      </h3>
                      <span className={clsx(
                        "text-xs px-2 py-1 rounded-full",
                        getCategoryColor(prompt.category)
                      )}>
                        {prompt.category}
                      </span>
                    </div>
                    
                    <p className="text-grey-3 text-sm leading-relaxed mb-3">
                      {prompt.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs text-grey-3 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {prompt.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimeAgo(prompt.createdAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(prompt.rating)}
                        <span className="ml-1">{prompt.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {prompt.downloads.toLocaleString()}
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {prompt.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-grey-6 text-grey-2 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onUsePrompt?.(prompt)}
                    className="flex-1"
                  >
                    <Plus className="w-3 h-3" />
                    Use This Prompt
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedPrompt(prompt)}
                  >
                    <Eye className="w-3 h-3" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyPrompt(prompt)}
                  >
                    {copiedPromptId === prompt.id ? (
                      <Check className="w-3 h-3 text-green-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {selectedPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-grey-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-arial font-bold text-xl mb-1">{selectedPrompt.title}</h3>
                  <p className="text-grey-3 text-sm">{selectedPrompt.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedPrompt(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <pre className="bg-grey-7 p-4 rounded-lg text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                {selectedPrompt.content}
              </pre>
            </div>
            <div className="p-6 border-t border-grey-6 flex gap-2">
              <Button
                variant="primary"
                onClick={() => {
                  onUsePrompt?.(selectedPrompt);
                  setSelectedPrompt(null);
                }}
                className="flex-1"
              >
                Use This Prompt
              </Button>
              <Button
                variant="outline"
                onClick={() => handleCopyPrompt(selectedPrompt)}
              >
                {copiedPromptId === selectedPrompt.id ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedPrompt(null)}
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
