
import { useState } from 'react';
import { DataCard } from './ui/DataCard';
import { FadeIn } from './animations/FadeIn';
import { Card } from './ui/card';
import { 
  CloudRain, AlertTriangle, MapPin, 
  Calendar, BarChart, ArrowUpRight
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FloodRiskAnalyzerProps = {
  selectedZone: string | null;
};

// Flood risk data by zone
const floodRiskData = {
  "east": [
    { area: "Bellandur", risk: "Critical", score: 85, last: "July 2023" },
    { area: "Mahadevapura", risk: "High", score: 78, last: "July 2023" },
    { area: "Varthur", risk: "Critical", score: 89, last: "July 2023" },
    { area: "Whitefield", risk: "Medium", score: 62, last: "August 2022" },
  ],
  "west": [
    { area: "Rajarajeshwari Nagar", risk: "High", score: 75, last: "July 2022" },
    { area: "Kengeri", risk: "Medium", score: 55, last: "September 2022" },
    { area: "Nagarbhavi", risk: "Low", score: 35, last: "October 2021" },
  ],
  "north": [
    { area: "Yelahanka", risk: "Medium", score: 58, last: "August 2022" },
    { area: "Hebbal", risk: "Medium", score: 52, last: "July 2022" },
    { area: "Jakkur", risk: "Low", score: 42, last: "September 2022" },
  ],
  "south": [
    { area: "Bommanahalli", risk: "High", score: 72, last: "July 2023" },
    { area: "HSR Layout", risk: "High", score: 76, last: "July 2023" },
    { area: "BTM Layout", risk: "Medium", score: 65, last: "August 2022" },
    { area: "JP Nagar", risk: "Medium", score: 60, last: "September 2022" },
  ],
  "central": [
    { area: "Shantinagar", risk: "Medium", score: 55, last: "July 2022" },
    { area: "Shivajinagar", risk: "Medium", score: 58, last: "July 2022" },
    { area: "Cubbon Park", risk: "Low", score: 32, last: "October 2021" },
  ],
  "all": [
    { area: "Bellandur", risk: "Critical", score: 85, last: "July 2023" },
    { area: "Varthur", risk: "Critical", score: 89, last: "July 2023" },
    { area: "Bommanahalli", risk: "High", score: 72, last: "July 2023" },
    { area: "HSR Layout", risk: "High", score: 76, last: "July 2023" },
    { area: "Mahadevapura", risk: "High", score: 78, last: "July 2023" },
  ]
};

// Active warnings data
const activeWarnings = [
  {
    id: 1,
    area: "Bellandur-Varthur Watershed",
    message: "Critical flood risk due to heavy rainfall forecast and lake overflow potential",
    issued: "Today, 08:15 AM",
    expires: "48 hours",
    level: "Critical"
  },
  {
    id: 2,
    area: "Koramangala-Challaghatta Valley",
    message: "High flood risk in low-lying areas with potential storm water drain overflow",
    issued: "Yesterday, 06:30 PM",
    expires: "36 hours",
    level: "High"
  },
  {
    id: 3,
    area: "Hebbal Valley",
    message: "Moderate flood risk with potential for localized waterlogging in specific areas",
    issued: "Yesterday, 10:45 AM",
    expires: "24 hours",
    level: "Medium"
  }
];

const FloodRiskAnalyzer = ({ selectedZone }: FloodRiskAnalyzerProps) => {
  const [timeframe, setTimeframe] = useState('current');
  
  // Show all areas if no zone is selected
  const currentZone = selectedZone || "all";
  const areasToShow = floodRiskData[currentZone as keyof typeof floodRiskData];
  
  // Sort by risk score (highest first)
  const sortedAreas = [...areasToShow].sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Flood Risk Analysis</h2>
            <p className="text-muted-foreground">
              Real-time flood risk assessment and historical flooding patterns
            </p>
          </div>
          
          <Tabs defaultValue={timeframe} onValueChange={setTimeframe} className="w-[300px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="current">Current</TabsTrigger>
              <TabsTrigger value="monsoon">Monsoon</TabsTrigger>
              <TabsTrigger value="annual">Annual</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <FadeIn delay="short">
          <DataCard
            title="Current Risk Level"
            description="Overall flood risk assessment"
            chip={{ text: "Alert", variant: "heat" }}
          >
            <div className="space-y-3">
              <div className="flex flex-col justify-center items-center py-2">
                <div className="text-4xl font-bold text-heat-600">High</div>
                <div className="text-sm text-muted-foreground mt-1">City-wide risk level</div>
                
                <div className="w-full mt-3 bg-secondary rounded-full h-3">
                  <div className="bg-heat-500 h-3 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between w-full text-xs mt-1 text-muted-foreground">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                  <span>Critical</span>
                </div>
              </div>
            </div>
          </DataCard>
        </FadeIn>
        
        <FadeIn delay="medium">
          <DataCard
            title="Rainfall Forecast"
            description="Predicted rainfall in the next 48 hours"
            chip={{ text: "Heavy", variant: "heat" }}
          >
            <div className="space-y-3">
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span>Expected Precipitation</span>
                  <span className="font-medium text-heat-600">175mm</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div className="bg-heat-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-heat-50 rounded-lg p-3">
                <div className="flex items-center">
                  <CloudRain className="w-5 h-5 text-heat-500 mr-2.5" />
                  <div>
                    <div className="text-sm font-medium">Heavy Rainfall Alert</div>
                    <div className="text-xs text-muted-foreground">Next 24-48 hours</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-heat-500" />
              </div>
            </div>
          </DataCard>
        </FadeIn>
        
        <FadeIn delay="medium">
          <DataCard
            title="Historical Patterns"
            description="Seasonal flooding trends in Bengaluru"
            chip={{ text: "Data", variant: "primary" }}
          >
            <div className="space-y-3">
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span>Annual Flooding Days</span>
                  <span className="font-medium text-urban-600">45 days</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div className="bg-urban-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-blue-50 rounded-lg p-3">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-blue-500 mr-2.5" />
                  <div>
                    <div className="text-sm font-medium">Peak Flooding Period</div>
                    <div className="text-xs text-muted-foreground">July-September (monsoon)</div>
                  </div>
                </div>
                <BarChart className="w-4 h-4 text-blue-500" />
              </div>
            </div>
          </DataCard>
        </FadeIn>
      </div>
      
      {/* Active flood warnings */}
      <FadeIn delay="medium">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Active Flood Warnings</h3>
            <span className="bg-heat-100 text-heat-800 px-2 py-1 rounded text-xs font-medium">
              3 Active Alerts
            </span>
          </div>
          
          <div className="space-y-4">
            {activeWarnings.map((warning) => (
              <div 
                key={warning.id} 
                className={`rounded-lg p-4 border ${
                  warning.level === 'Critical' ? 'bg-heat-50 border-heat-200' : 
                  warning.level === 'High' ? 'bg-orange-50 border-orange-200' : 
                  'bg-amber-50 border-amber-200'
                }`}
              >
                <div className="flex items-start">
                  <AlertTriangle className={`w-5 h-5 mr-3 mt-0.5 ${
                    warning.level === 'Critical' ? 'text-heat-500' : 
                    warning.level === 'High' ? 'text-orange-500' : 
                    'text-amber-500'
                  }`} />
                  <div>
                    <div className="font-medium flex items-center">
                      <span>{warning.area}</span>
                      <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                        warning.level === 'Critical' ? 'bg-heat-200 text-heat-800' : 
                        warning.level === 'High' ? 'bg-orange-200 text-orange-800' : 
                        'bg-amber-200 text-amber-800'
                      }`}>
                        {warning.level}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{warning.message}</p>
                    <div className="flex items-center mt-2 text-xs text-muted-foreground">
                      <span>Issued: {warning.issued}</span>
                      <span className="mx-2">•</span>
                      <span>Expires in: {warning.expires}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </FadeIn>
      
      {/* Flood risk by area */}
      <FadeIn delay="medium">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">
              {selectedZone 
                ? `${selectedZone.charAt(0).toUpperCase() + selectedZone.slice(1)} Bengaluru Flood Risk` 
                : 'High-Risk Areas in Bengaluru'}
            </h3>
            <span className="bg-secondary px-2 py-1 rounded text-xs">
              Updated: Today, 06:00 AM
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-3 font-medium text-muted-foreground">Area</th>
                  <th className="text-left pb-3 font-medium text-muted-foreground">Risk Level</th>
                  <th className="text-left pb-3 font-medium text-muted-foreground">Risk Score</th>
                  <th className="text-left pb-3 font-medium text-muted-foreground">Last Flood</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {sortedAreas.map((area, index) => (
                  <tr key={index} className="hover:bg-muted/20 transition-colors">
                    <td className="py-3 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-heat-500" />
                      {area.area}
                    </td>
                    <td className="py-3">
                      <RiskLevelBadge risk={area.risk} />
                    </td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <span className="font-medium">{area.score}/100</span>
                        <div className="ml-2 w-16 bg-secondary rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full ${getRiskLevelBarColor(area.risk)}`} 
                            style={{ width: `${area.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {area.last}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-5 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
            <AlertTriangle className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
            <div>
              <div className="font-medium">Mitigation Recommendations</div>
              <p className="text-sm text-muted-foreground mt-1">
                High-risk areas require immediate stormwater drain clearance and maintenance.
                Residents should prepare emergency kits and evacuation plans during the monsoon season.
                BBMP has been notified of critical infrastructure needs in Bellandur and Varthur regions.
              </p>
            </div>
          </div>
        </Card>
      </FadeIn>
    </div>
  );
};

type RiskLevelBadgeProps = {
  risk: string;
};

const RiskLevelBadge = ({ risk }: RiskLevelBadgeProps) => {
  const colorClasses = getRiskLevelBadgeColor(risk);
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}>
      {risk}
    </span>
  );
};

const getRiskLevelBarColor = (risk: string) => {
  switch (risk) {
    case 'Critical':
      return 'bg-heat-600';
    case 'High':
      return 'bg-orange-500';
    case 'Medium':
      return 'bg-amber-500';
    default:
      return 'bg-eco-500';
  }
};

const getRiskLevelBadgeColor = (risk: string) => {
  switch (risk) {
    case 'Critical':
      return 'bg-heat-100 text-heat-800';
    case 'High':
      return 'bg-orange-100 text-orange-800';
    case 'Medium':
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-eco-100 text-eco-800';
  }
};

export default FloodRiskAnalyzer;
