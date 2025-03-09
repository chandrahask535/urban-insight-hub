
import { useState } from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { MapIcon, Menu, X } from 'lucide-react';

const Navigation = () => {
  const { isAuthenticated, logout } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const links = [
    { name: 'Dashboard', href: '/' },
    { name: 'Encroachment', href: '/encroachment' },
    { name: 'Heat Islands', href: '/heat-islands' },
    { name: 'Flood Prediction', href: '/flood-prediction' },
    { name: 'Recommendations', href: '/recommendations' },
    { name: 'Bengaluru', href: '/bengaluru' },
  ];

  const NavLinks = () => (
    <>
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.href}
          className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium ${
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`
          }
          onClick={() => setIsOpen(false)}
        >
          {link.name}
        </NavLink>
      ))}
    </>
  );

  const renderMobileNavigation = () => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <MapIcon className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">Urban Insight</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex flex-col space-y-1 mb-6">
          <NavLinks />
        </div>
        <div className="mt-auto space-y-2">
          {isAuthenticated ? (
            <>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
              </Button>
              <Button variant="default" className="w-full" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/login" onClick={() => setIsOpen(false)}>Log in</Link>
              </Button>
              <Button variant="default" className="w-full" asChild>
                <Link to="/signup" onClick={() => setIsOpen(false)}>Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );

  const renderDesktopNavigation = () => (
    <div className="hidden md:flex items-center space-x-1">
      <NavLinks />
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/70 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <MapIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Urban Insight</span>
            </Link>
          </div>

          {isMobile ? renderMobileNavigation() : renderDesktopNavigation()}

          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/profile">Profile</Link>
                </Button>
                <Button variant="default" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button variant="default" asChild>
                  <Link to="/signup">Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
