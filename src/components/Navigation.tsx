
import { cn } from '@/lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FadeIn } from './animations/FadeIn';
import { MapIcon, Thermometer, LightbulbIcon, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navigation = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const navItems = [
    {
      name: 'Overview',
      path: '/',
      icon: <MapIcon className="w-4 h-4" />,
    },
    {
      name: 'Encroachment',
      path: '/encroachment',
      icon: <MapIcon className="w-4 h-4" />,
    },
    {
      name: 'Heat Islands',
      path: '/heat-islands',
      icon: <Thermometer className="w-4 h-4" />,
    },
    {
      name: 'Recommendations',
      path: '/recommendations',
      icon: <LightbulbIcon className="w-4 h-4" />,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <FadeIn direction="down">
        <div className="flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-urban-500 rounded-full flex items-center justify-center">
              <MapIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold tracking-tight text-lg">Urban Insight</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <FadeIn key={item.name} delay={index === 0 ? 'none' : index === 1 ? 'short' : index === 2 ? 'medium' : 'long'} direction="down">
                <Link
                  to={item.path}
                  className={cn(
                    'flex items-center px-3 py-2 text-sm rounded-md transition-colors',
                    'hover:bg-secondary',
                    location.pathname === item.path
                      ? 'text-urban-600 font-medium'
                      : 'text-muted-foreground'
                  )}
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Link>
              </FadeIn>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-urban-100 text-urban-600">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline"
                className="text-urban-600"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </FadeIn>
    </header>
  );
};

export default Navigation;
