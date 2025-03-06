
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { FadeIn } from './animations/FadeIn';
import { MapIcon, Thermometer, LightbulbIcon } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
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
            <button className="inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium text-urban-600 bg-urban-50 rounded-md transition-colors hover:bg-urban-100">
              Sign In
            </button>
          </div>
        </div>
      </FadeIn>
    </header>
  );
};

export default Navigation;
