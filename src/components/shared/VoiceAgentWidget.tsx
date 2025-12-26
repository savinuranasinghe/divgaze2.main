import { useState } from 'react';
import { Mic, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceAgentWidgetProps {
  agentUrl?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  autoOpen?: boolean;
}

export const VoiceAgentWidget = ({ 
  agentUrl = 'https://divgaze-agent.vercel.app',
  position = 'bottom-right',
  autoOpen = false 
}: VoiceAgentWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getPositionClasses = () => {
    const positions = {
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4'
    };
    return positions[position];
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className={`fixed ${getPositionClasses()} z-50 h-14 w-14 rounded-full bg-gradient-to-r from-primary to-purple-600 p-0 shadow-lg transition-all hover:scale-110 hover:shadow-xl md:h-16 md:w-16`}
          aria-label="Open Voice Agent"
        >
          <Mic className="h-6 w-6 text-white md:h-7 md:w-7" />
        </Button>
      )}

      {/* Voice Agent Container - MAXIMUM HEIGHT */}
      {isOpen && (
        <div 
          className={`fixed z-50 flex flex-col overflow-hidden rounded-2xl bg-slate-900 shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-4 duration-300`}
          style={{
            bottom: '20px',
            right: '20px',
            width: '480px',
            height: 'calc(100vh - 40px)', // Full screen height minus margins
            maxHeight: '900px', // Maximum height
            maxWidth: '95vw',
          }}
        >
          {/* Compact Header */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-gradient-to-r from-primary to-purple-600 px-3 py-2 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Mic className="h-4 w-4 text-white" />
              <h3 className="font-semibold text-white text-xs">DivGaze Voice Agent</h3>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-white/20"
              aria-label="Close Voice Agent"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* iFrame - Takes all available height */}
          <div className="flex-1 overflow-hidden bg-slate-950">
            <iframe
              src={agentUrl}
              className="w-full h-full border-0 block"
              title="DivGaze Voice Agent"
              allow="microphone"
            />
          </div>
        </div>
      )}

      {/* Mobile Full Screen Styles */}
      <style>{`
        @media (max-width: 768px) {
          /* Mobile fullscreen */
          div[style*="width: 480px"] {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            max-height: 100% !important;
            border-radius: 0 !important;
          }
        }
      `}</style>
    </>
  );
};
