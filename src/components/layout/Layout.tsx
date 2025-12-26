import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { VoiceAgentWidget } from '@/components/shared/VoiceAgentWidget';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* DivGaze Voice Agent Widget */}
      <VoiceAgentWidget 
        agentUrl="https://divgaze-agent.vercel.app"
        position="bottom-right"
      />
    </div>
  );
};
