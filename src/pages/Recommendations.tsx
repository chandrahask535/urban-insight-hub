
import Navigation from '@/components/Navigation';
import { FadeIn } from '@/components/animations/FadeIn';
import RecommendationsPanel from '@/components/RecommendationsPanel';
import { Chip } from '@/components/ui/Chip';

const Recommendations = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-secondary/50 to-background">
      <Navigation />
      
      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="space-y-12">
          <FadeIn>
            <div className="space-y-2">
              <Chip variant="eco" className="mb-2">AI Planning</Chip>
              <h1 className="text-3xl font-bold tracking-tight">Urban Planning Recommendations</h1>
              <p className="text-muted-foreground max-w-2xl">
                AI-powered suggestions for sustainable urban development, encroachment prevention, and heat island mitigation.
              </p>
            </div>
          </FadeIn>
          
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

export default Recommendations;
