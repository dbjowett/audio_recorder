import { AudioPlayer } from '@/components/AudioPlayer';
import { Navbar } from '@/components/Navbar';
import { AudioFileProvider } from '@/components/providers/audio-context-provider';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Audio Recorder',
  description: 'Audio Recorder',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, '')}>
        <TooltipProvider delayDuration={0}>
          <AudioFileProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <main>{children}</main>
              <AudioPlayer />
            </ThemeProvider>
          </AudioFileProvider>
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
