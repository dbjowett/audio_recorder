import { Github } from 'lucide-react';
import { ThemeDropdownMenu } from './ThemeDropdown';
import { Button } from './ui/button';

export const Navbar = () => {
  return (
    <div className="h-16 bg-transparent backdrop-blur-md fixed top-0 w-full flex justify-end items-center px-2 md:px-4 lg:px-6">
      <div className="flex gap-2 md:gap-4">
        <a href={`https://github.com/dbjowett`} target="_blank" rel="noreferrer">
          <Button size={'icon'} variant={'outline'}>
            <Github size={15} />
          </Button>
        </a>
        <ThemeDropdownMenu />
      </div>
    </div>
  );
};
