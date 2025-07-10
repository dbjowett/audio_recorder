import { AudioPlayer } from '@/components/AudioPlayer';
import { Navbar } from '@/components/Navbar';
import { AudioFileProvider } from '@/components/providers/audio-context-provider';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
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
              <div className="text-red-500 font-bold text-3xl">Tailwind is working!</div>
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
