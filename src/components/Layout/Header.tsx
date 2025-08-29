
import { Button } from '../ui/Button';
import { ChevronDown, ExternalLink, HelpCircle, CheckCircle } from 'lucide-react';

interface HeaderProps {
  mode?: 'default' | 'publish' | 'save';
}

export function Header({ mode = 'default' }: HeaderProps) {
  return (
    <header className="bg-white border-b border-grey-6 h-[60px] flex items-center justify-between px-4 lg:px-6 shadow-sm">
      {/* Left side - Breadcrumbs */}
      <div className="flex items-center gap-2 flex-1">
        <div className="flex items-center gap-2 text-asu-maroon">
          <div className="w-4 h-3.5">
            <img src="/assets/91ca43ea86c5a74e166baf95dd9caf2c11952dd0.svg" alt="Home" className="w-full h-full" />
          </div>
          <span className="font-arial text-sm lg:text-body-default hidden sm:inline">Dashboard</span>
        </div>
        <span className="text-asu-maroon hidden sm:inline">|</span>
        <span className="font-arial font-bold text-sm lg:text-body-default text-asu-maroon">Project name</span>
      </div>

      {/* Center - Help Bot (desktop only) */}
      <div className="hidden lg:flex justify-center flex-1">
        <button className="w-14 h-14 rounded-full bg-gradient-to-br from-asu-gold to-yellow-400 flex items-center justify-center hover:scale-105 transition-transform">
          <HelpCircle className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-2 lg:gap-4 flex-1 justify-end">
        {mode === 'publish' && (
          <>
            <div className="hidden lg:flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-body-default">Changes saved - ready to publish</span>
            </div>
            <Button variant="primary" size="sm" className="text-xs lg:text-sm">
              Publish
            </Button>
            <Button variant="outline" size="sm" className="text-xs lg:text-sm">
              <span className="hidden sm:inline">View app</span>
              <ExternalLink className="w-3 h-3" />
            </Button>
          </>
        )}
        
        {/* Mobile menu button */}
        <button className="lg:hidden p-2">
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
