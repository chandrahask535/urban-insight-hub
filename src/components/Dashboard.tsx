
import { Chip } from './ui/Chip';
import { DataCard } from './ui/DataCard';
import { FadeIn } from './animations/FadeIn';
import { ChevronRight, AlertTriangle, Thermometer, TreePine, CloudRain } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <FadeIn>
          <Chip variant="primary" className="mb-2">Urban Analytics Platform</Chip>
          <h1 className="text-3xl font-bold tracking-tight">Urban Planning & Land Use Analysis</h1>
          <p className="text-muted-foreground max-w-2xl">
            Monitor urban development, detect land encroachment, identify heat islands, and forecast flood risks using satellite imagery and AI-driven analytics.
          </p>
        </FadeIn>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <FadeIn delay="short">
          <DataCard
            title="Land Encroachment Detection"
            description="Identifies illegal land use changes using satellite imagery"
            chip={{ text: "Land Use", variant: "urban" }}
            footer={
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">42 detected areas</span>
                <Link to="/encroachment" className="flex items-center text-urban-600 font-medium hover:underline cursor-pointer">
                  View details <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            }
          >
            <div className="space-y-2">
              <div className="bg-urban-50 rounded-lg p-3 flex items-center">
                <AlertTriangle className="w-5 h-5 text-heat-500 mr-3" />
                <div>
                  <div className="text-sm font-medium">Critical Alert</div>
                  <div className="text-xs text-muted-foreground">Northern lake zone encroachment detected</div>
                </div>
              </div>
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span>Encroachment Severity</span>
                  <span className="font-medium text-heat-600">High</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div className="bg-heat-500 h-1.5 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </DataCard>
        </FadeIn>
        
        <FadeIn delay="medium">
          <DataCard
            title="Urban Heat Islands"
            description="Areas with higher temperatures due to urban development"
            chip={{ text: "Temperature", variant: "heat" }}
            footer={
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">3 critical zones</span>
                <Link to="/heat-islands" className="flex items-center text-urban-600 font-medium hover:underline cursor-pointer">
                  View details <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            }
          >
            <div className="space-y-2">
              <div className="bg-heat-50 rounded-lg p-3 flex items-center">
                <Thermometer className="w-5 h-5 text-heat-500 mr-3" />
                <div>
                  <div className="text-sm font-medium">Temperature Anomaly</div>
                  <div className="text-xs text-muted-foreground">Downtown area +5.2°C above average</div>
                </div>
              </div>
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span>Heat Intensity</span>
                  <span className="font-medium text-heat-600">Moderate</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div className="bg-heat-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </DataCard>
        </FadeIn>
        
        <FadeIn delay="medium">
          <DataCard
            title="Flood Prediction"
            description="Real-time flood risk assessment and alerts"
            chip={{ text: "Warning", variant: "heat" }}
            footer={
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">1 critical alert</span>
                <Link to="/flood-prediction" className="flex items-center text-urban-600 font-medium hover:underline cursor-pointer">
                  View details <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            }
          >
            <div className="space-y-2">
              <div className="bg-heat-50 rounded-lg p-3 flex items-center">
                <CloudRain className="w-5 h-5 text-heat-500 mr-3" />
                <div>
                  <div className="text-sm font-medium">Heavy Rainfall Alert</div>
                  <div className="text-xs text-muted-foreground">North River Basin: 175mm in 24h</div>
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
        
        <FadeIn delay="long">
          <DataCard
            title="AI Planning Recommendations"
            description="Smart suggestions for sustainable urban development"
            chip={{ text: "Sustainable", variant: "eco" }}
            footer={
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">12 recommendations</span>
                <Link to="/recommendations" className="flex items-center text-urban-600 font-medium hover:underline cursor-pointer">
                  View all <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            }
          >
            <div className="space-y-2">
              <div className="bg-eco-50 rounded-lg p-3 flex items-center">
                <TreePine className="w-5 h-5 text-eco-600 mr-3" />
                <div>
                  <div className="text-sm font-medium">Green Space Recommendation</div>
                  <div className="text-xs text-muted-foreground">Create urban garden in sector B12</div>
                </div>
              </div>
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span>Impact Potential</span>
                  <span className="font-medium text-eco-600">High</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div className="bg-eco-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </DataCard>
        </FadeIn>
      </div>
    </div>
  );
};

export default Dashboard;
