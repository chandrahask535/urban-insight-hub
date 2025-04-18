
import { FadeIn } from '@/components/animations/FadeIn';
import Navigation from '@/components/Navigation';
import MapInterface from '@/components/MapInterface';
import Dashboard from '@/components/Dashboard';
import AnalysisPanel from '@/components/AnalysisPanel';
import RecommendationsPanel from '@/components/RecommendationsPanel';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-secondary/50 to-background">
      <Navigation />
      
      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="space-y-12">
          <FadeIn>
            <MapInterface />
          </FadeIn>
          
          <section>
            <Dashboard />
          </section>
          
          <section>
            <AnalysisPanel />
          </section>
          
          <section>
            <RecommendationsPanel />
          </section>
        </div>
      </main>
      
      <footer className="bg-muted/30 border-t py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            Urban Insight Hub © {new Date().getFullYear()} — City Planning & Analysis Platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
