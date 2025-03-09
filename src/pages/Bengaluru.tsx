
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { FadeIn } from '@/components/animations/FadeIn';
import { Chip } from '@/components/ui/Chip';
import BengaluruMap from '@/components/BengaluruMap';
import WaterDashboard from '@/components/WaterDashboard';
import LandPriceViewer from '@/components/LandPriceViewer';
import FloodRiskAnalyzer from '@/components/FloodRiskAnalyzer';
import LandSuitabilityIndex from '@/components/LandSuitabilityIndex';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Droplet, Building, AlertTriangle, AreaChart } from 'lucide-react';

const Bengaluru = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-secondary/50 to-background">
      <Navigation />
      
      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="space-y-10">
          <FadeIn>
            <div className="space-y-2">
              <Chip variant="urban" className="mb-2">Bengaluru</Chip>
              <h1 className="text-3xl font-bold tracking-tight">Integrated Urban Water Management & Planning</h1>
              <p className="text-muted-foreground max-w-3xl">
                Comprehensive analytics for flood prediction, water monitoring, land suitability,
                and sustainable urban development in Bengaluru.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay="short">
            <div className="relative">
              <BengaluruMap onZoneSelect={setSelectedZone} />
            </div>
          </FadeIn>
          
          <FadeIn delay="medium">
            <Tabs defaultValue="water" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="water" className="flex items-center gap-2">
                  <Droplet className="h-4 w-4" />
                  <span className="hidden sm:inline">Water Management</span>
                  <span className="sm:hidden">Water</span>
                </TabsTrigger>
                <TabsTrigger value="land" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="hidden sm:inline">Land Prices</span>
                  <span className="sm:hidden">Land</span>
                </TabsTrigger>
                <TabsTrigger value="flood" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="hidden sm:inline">Flood Prediction</span>
                  <span className="sm:hidden">Flood</span>
                </TabsTrigger>
                <TabsTrigger value="planning" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span className="hidden sm:inline">Urban Planning</span>
                  <span className="sm:hidden">Planning</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="water" className="mt-0">
                <WaterDashboard selectedZone={selectedZone} />
              </TabsContent>
              
              <TabsContent value="land" className="mt-0">
                <LandPriceViewer selectedZone={selectedZone} />
              </TabsContent>
              
              <TabsContent value="flood" className="mt-0">
                <FloodRiskAnalyzer selectedZone={selectedZone} />
              </TabsContent>
              
              <TabsContent value="planning" className="mt-0">
                <LandSuitabilityIndex selectedZone={selectedZone} />
              </TabsContent>
            </Tabs>
          </FadeIn>
        </div>
      </main>
      
      <footer className="bg-muted/30 border-t py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            Bengaluru Urban Insight © {new Date().getFullYear()} — Integrated Urban Water Management & Planning
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Bengaluru;
