import { useState } from 'react';
import { clsx } from 'clsx';
import { Menu, X, User, MessageSquare, HelpCircle, Bot, FileText, Settings, BarChart3 } from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const menuItems = [
  { icon: Bot, label: 'Basic', active: true },
  { icon: FileText, label: 'Advanced', active: false },
  { icon: Settings, label: 'Tools', active: false },
  { icon: BarChart3, label: 'Analytics', active: false },
];

const helpItems = [
  { icon: MessageSquare, label: 'Feedback', active: false },
  { icon: HelpCircle, label: 'Support', active: false },
];

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed lg:static top-0 left-0 h-full w-[280px] lg:w-[100px] bg-grey-7 rounded-r-2xl lg:rounded-2xl z-40 transform transition-transform duration-300 lg:transform-none flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-grey-6">
          <h2 className="font-arial font-bold text-body-default lg:text-center">
            <span className="lg:hidden">My AI</span>
            <span className="hidden lg:inline">My AI</span>
          </h2>
        </div>

        {/* Menu Items */}
        <div className="flex-1 p-4 lg:p-2">
          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={clsx(
                  "w-full p-3 lg:p-4 rounded-lg flex lg:flex-col items-center gap-3 lg:gap-2 text-left lg:text-center transition-colors",
                  item.active
                    ? "bg-white shadow-sm border border-grey-4"
                    : "bg-grey-7 hover:bg-grey-6"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-arial text-sm lg:text-xs">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Help Section */}
          <div className="mt-8 pt-4 border-t border-grey-6">
            <h3 className="font-arial font-bold text-sm lg:text-xs mb-2 lg:text-center">Help</h3>
            <div className="space-y-1">
              {helpItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full p-3 lg:p-4 rounded-lg flex lg:flex-col items-center gap-3 lg:gap-2 text-left lg:text-center transition-colors bg-grey-7 hover:bg-grey-6"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-arial text-sm lg:text-xs">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="p-4 lg:p-2 border-t border-grey-6">
          <button className="w-full p-3 lg:p-4 rounded-lg flex lg:flex-col items-center gap-3 lg:gap-2 text-left lg:text-center transition-colors hover:bg-grey-6">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-asu-maroon to-red-600 flex items-center justify-center">
              <User className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </div>
            <span className="font-arial text-sm lg:text-xs lg:hidden">Profile</span>
          </button>
        </div>
      </aside>
    </>
  );
}
