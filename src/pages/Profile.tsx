
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Navigation from '@/components/Navigation';
import { User, Mail, Shield } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // If not authenticated, redirect to login
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container max-w-screen-lg mx-auto pt-24 px-4 pb-16">
        <FadeIn>
          <h1 className="text-3xl font-bold mb-6">User Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarFallback className="text-2xl bg-urban-100 text-urban-600">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.role.charAt(0).toUpperCase() + user.role.slice(1)} Account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{user.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{user.role === 'admin' ? 'Administrator' : 'Standard User'}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={() => {
                      logout();
                      navigate('/login');
                    }}
                  >
                    Sign Out
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Profile Information</h3>
                      <p className="text-sm text-muted-foreground">
                        Update your account profile information and email address.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Security</h3>
                      <p className="text-sm text-muted-foreground">
                        Update your password and secure your account.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Configure the notifications you receive.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Account created on {new Date().toLocaleDateString()}
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </FadeIn>
      </main>
    </div>
  );
};

export default Profile;
