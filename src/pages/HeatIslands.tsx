
import Navigation from '@/components/Navigation';
import { FadeIn } from '@/components/animations/FadeIn';
import MapInterface from '@/components/MapInterface';
import { Chip } from '@/components/ui/Chip';
import { DataCard } from '@/components/ui/DataCard';
import { Thermometer, AreaChart, Building, TreePine } from 'lucide-react';

const HeatIslands = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-secondary/50 to-background">
      <Navigation />
      
      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="space-y-12">
          <FadeIn>
            <div className="space-y-2">
              <Chip variant="heat" className="mb-2">Temperature Analysis</Chip>
              <h1 className="text-3xl font-bold tracking-tight">Urban Heat Islands</h1>
              <p className="text-muted-foreground max-w-2xl">
                Identify areas with excessive heat retention, analyze temperature patterns, and implement cooling strategies.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay="short">
            <MapInterface />
          </FadeIn>
          
          <section>
            <FadeIn>
              <h2 className="text-2xl font-bold tracking-tight mb-6">Heat Analysis</h2>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FadeIn delay="short">
                <DataCard
                  title="Downtown Core"
                  description="Central business district"
                  chip={{ text: "Critical", variant: "heat" }}
                >
                  <div className="space-y-2">
                    <div className="bg-heat-50 rounded-lg p-3 flex items-center">
                      <Thermometer className="w-5 h-5 text-heat-500 mr-3" />
                      <div>
                        <div className="text-sm font-medium">+5.2°C Above Average</div>
                        <div className="text-xs text-muted-foreground">Peak during 2-4pm</div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span>Urban Density</span>
                        <span className="font-medium text-heat-600">Very High</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-1.5">
                        <div className="bg-heat-500 h-1.5 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  </div>
                </DataCard>
              </FadeIn>
              
              <FadeIn delay="medium">
                <DataCard
                  title="Industrial Zone"
                  description="Manufacturing and warehouse district"
                  chip={{ text: "High", variant: "urban" }}
                >
                  <div className="space-y-2">
                    <div className="bg-urban-50 rounded-lg p-3 flex items-center">
                      <Building className="w-5 h-5 text-urban-600 mr-3" />
                      <div>
                        <div className="text-sm font-medium">+4.8°C Above Average</div>
                        <div className="text-xs text-muted-foreground">High heat retention</div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span>Green Coverage</span>
                        <span className="font-medium text-urban-600">Very Low</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-1.5">
                        <div className="bg-urban-500 h-1.5 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                    </div>
                  </div>
                </DataCard>
              </FadeIn>
              
              <FadeIn delay="long">
                <DataCard
                  title="Residential District"
                  description="High-density residential area"
                  chip={{ text: "Moderate", variant: "eco" }}
                >
                  <div className="space-y-2">
                    <div className="bg-eco-50 rounded-lg p-3 flex items-center">
                      <TreePine className="w-5 h-5 text-eco-600 mr-3" />
                      <div>
                        <div className="text-sm font-medium">+2.3°C Above Average</div>
                        <div className="text-xs text-muted-foreground">Moderate cooling from parks</div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span>Tree Canopy</span>
                        <span className="font-medium text-eco-600">Moderate</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-1.5">
                        <div className="bg-eco-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </div>
                </DataCard>
              </FadeIn>
            </div>
          </section>
          
          <section>
            <FadeIn>
              <div className="bg-white rounded-xl shadow-card border p-5">
                <h3 className="text-lg font-medium mb-4">Temperature Trends</h3>
                
                <div className="h-64 w-full bg-muted/30 rounded-lg flex items-center justify-center">
                  <AreaChart className="w-16 h-16 text-muted-foreground/50" />
                  <span className="ml-2 text-muted-foreground">Temperature trend visualization would appear here</span>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="font-medium">Average Increase</div>
                    <div className="text-heat-600 text-lg font-semibold">3.4°C</div>
                    <div className="text-xs text-muted-foreground">Above surrounding areas</div>
                  </div>
                  
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="font-medium">Peak Temperature</div>
                    <div className="text-heat-600 text-lg font-semibold">38.2°C</div>
                    <div className="text-xs text-muted-foreground">Recorded in downtown</div>
                  </div>
                  
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="font-medium">Critical Hours</div>
                    <div className="text-heat-600 text-lg font-semibold">1PM - 4PM</div>
                    <div className="text-xs text-muted-foreground">Highest heat intensity</div>
                  </div>
                </div>
              </div>
            </FadeIn>
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

export default HeatIslands;
