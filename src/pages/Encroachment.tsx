
import Navigation from '@/components/Navigation';
import { FadeIn } from '@/components/animations/FadeIn';
import AnalysisPanel from '@/components/AnalysisPanel';
import MapInterface from '@/components/MapInterface';
import { Chip } from '@/components/ui/Chip';

const Encroachment = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-secondary/50 to-background">
      <Navigation />
      
      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="space-y-12">
          <FadeIn>
            <div className="space-y-2">
              <Chip variant="heat" className="mb-2">Detailed View</Chip>
              <h1 className="text-3xl font-bold tracking-tight">Land Encroachment Analysis</h1>
              <p className="text-muted-foreground max-w-2xl">
                Monitor illegal land use changes, track encroachment patterns, and identify high-risk areas.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay="short">
            <MapInterface />
          </FadeIn>
          
          <section>
            <AnalysisPanel />
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

export default Encroachment;
