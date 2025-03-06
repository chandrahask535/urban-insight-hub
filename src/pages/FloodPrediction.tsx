
import Navigation from '@/components/Navigation';
import { FadeIn } from '@/components/animations/FadeIn';
import MapInterface from '@/components/MapInterface';
import { Chip } from '@/components/ui/Chip';
import { DataCard } from '@/components/ui/DataCard';
import { AlertTriangle, CloudRain, BarChart3, MapPin } from 'lucide-react';
import FloodAlertPanel from '@/components/FloodAlertPanel';

const FloodPrediction = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-secondary/50 to-background">
      <Navigation />
      
      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="space-y-12">
          <FadeIn>
            <div className="space-y-2">
              <Chip variant="primary" className="mb-2">Early Warning System</Chip>
              <h1 className="text-3xl font-bold tracking-tight">Flood Prediction & Monitoring</h1>
              <p className="text-muted-foreground max-w-2xl">
                Real-time flood prediction using historical weather data, satellite imagery, and AI models to provide early warnings.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay="short">
            <MapInterface />
          </FadeIn>
          
          <section>
            <FadeIn>
              <h2 className="text-2xl font-bold tracking-tight mb-6">Current Alerts</h2>
            </FadeIn>
            
            <FloodAlertPanel />
          </section>
          
          <section>
            <FadeIn>
              <h2 className="text-2xl font-bold tracking-tight mb-6">Risk Assessment</h2>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FadeIn delay="short">
                <DataCard
                  title="North River Basin"
                  description="Upstream area with heavy rainfall"
                  chip={{ text: "High Risk", variant: "heat" }}
                >
                  <div className="space-y-2">
                    <div className="bg-heat-50 rounded-lg p-3 flex items-center">
                      <CloudRain className="w-5 h-5 text-heat-500 mr-3" />
                      <div>
                        <div className="text-sm font-medium">175mm Rainfall (24h)</div>
                        <div className="text-xs text-muted-foreground">85% above monthly average</div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span>Flood Risk</span>
                        <span className="font-medium text-heat-600">Critical</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-1.5">
                        <div className="bg-heat-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </DataCard>
              </FadeIn>
              
              <FadeIn delay="medium">
                <DataCard
                  title="Downtown District"
                  description="Urban area with poor drainage"
                  chip={{ text: "Medium Risk", variant: "urban" }}
                >
                  <div className="space-y-2">
                    <div className="bg-urban-50 rounded-lg p-3 flex items-center">
                      <MapPin className="w-5 h-5 text-urban-600 mr-3" />
                      <div>
                        <div className="text-sm font-medium">Drainage Capacity: 55%</div>
                        <div className="text-xs text-muted-foreground">Infrastructure needs upgrade</div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span>Resilience Index</span>
                        <span className="font-medium text-urban-600">Moderate</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-1.5">
                        <div className="bg-urban-500 h-1.5 rounded-full" style={{ width: '55%' }}></div>
                      </div>
                    </div>
                  </div>
                </DataCard>
              </FadeIn>
              
              <FadeIn delay="long">
                <DataCard
                  title="Southern Wetlands"
                  description="Natural flood mitigation zone"
                  chip={{ text: "Low Risk", variant: "eco" }}
                >
                  <div className="space-y-2">
                    <div className="bg-eco-50 rounded-lg p-3 flex items-center">
                      <BarChart3 className="w-5 h-5 text-eco-600 mr-3" />
                      <div>
                        <div className="text-sm font-medium">Water Absorption: 92%</div>
                        <div className="text-xs text-muted-foreground">Natural buffer functioning well</div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span>Environmental Capacity</span>
                        <span className="font-medium text-eco-600">Excellent</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-1.5">
                        <div className="bg-eco-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
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
                <h3 className="text-lg font-medium mb-4">Historical Flood Data</h3>
                
                <div className="h-64 w-full bg-muted/30 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-16 h-16 text-muted-foreground/50" />
                  <span className="ml-2 text-muted-foreground">Flood trend visualization would appear here</span>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="font-medium">Last Major Flood</div>
                    <div className="text-urban-600 text-lg font-semibold">June 2022</div>
                    <div className="text-xs text-muted-foreground">Affected 12,000 residents</div>
                  </div>
                  
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="font-medium">Annual Flood Risk</div>
                    <div className="text-urban-600 text-lg font-semibold">28%</div>
                    <div className="text-xs text-muted-foreground">Probability of occurrence</div>
                  </div>
                  
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="font-medium">Response Time</div>
                    <div className="text-eco-600 text-lg font-semibold">4.5 hours</div>
                    <div className="text-xs text-muted-foreground">Average emergency deployment</div>
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

export default FloodPrediction;
