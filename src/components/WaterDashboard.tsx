
import { useState } from 'react';
import { DataCard } from './ui/DataCard';
import { FadeIn } from './animations/FadeIn';
import { 
  Droplet, CloudRain, Scale, AlertCircle, 
  TrendingUp, ArrowUpRight, AreaChart
} from 'lucide-react';
import { Card } from './ui/card';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";

type WaterDashboardProps = {
  selectedZone: string | null;
};

const WaterDashboard = ({ selectedZone }: WaterDashboardProps) => {
  const [timeRange, setTimeRange] = useState('30d');
  
  // Water levels by lake - this would come from an API in a real app
  const waterLevels = {
    "east": [
      { name: "Bellandur Lake", level: "Critical", percentage: 12, change: "-2.3m" },
      { name: "Varthur Lake", level: "Low", percentage: 28, change: "-0.8m" },
      { name: "Vibhutipura Lake", level: "Medium", percentage: 45, change: "-0.5m" },
    ],
    "west": [
      { name: "Hesaraghatta Lake", level: "Medium", percentage: 43, change: "-0.6m" },
      { name: "Kengeri Lake", level: "Low", percentage: 25, change: "-1.1m" },
    ],
    "north": [
      { name: "Hebbal Lake", level: "Medium", percentage: 51, change: "-0.3m" },
      { name: "Yelahanka Lake", level: "Low", percentage: 32, change: "-0.7m" },
    ],
    "south": [
      { name: "Hulimavu Lake", level: "Critical", percentage: 15, change: "-1.7m" },
      { name: "Begur Lake", level: "Medium", percentage: 38, change: "-0.6m" },
    ],
    "central": [
      { name: "Ulsoor Lake", level: "Medium", percentage: 41, change: "-0.5m" },
      { name: "Sankey Tank", level: "Good", percentage: 72, change: "+0.2m" },
    ],
    "all": [
      { name: "Bellandur Lake", level: "Critical", percentage: 12, change: "-2.3m" },
      { name: "Varthur Lake", level: "Low", percentage: 28, change: "-0.8m" },
      { name: "Hebbal Lake", level: "Medium", percentage: 51, change: "-0.3m" },
      { name: "Ulsoor Lake", level: "Medium", percentage: 41, change: "-0.5m" },
      { name: "Sankey Tank", level: "Good", percentage: 72, change: "+0.2m" },
    ]
  };

  // Show all lakes if no zone is selected
  const currentZone = selectedZone || "all";
  const lakesToShow = waterLevels[currentZone as keyof typeof waterLevels];

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Water Resource Monitoring</h2>
            <p className="text-muted-foreground">
              Real-time monitoring of Bengaluru's lakes and water bodies
            </p>
          </div>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <FadeIn delay="short">
          <DataCard
            title="Water Level Status"
            description="Current levels in monitored water bodies"
            chip={{ text: "Critical", variant: "heat" }}
          >
            <div className="space-y-3">
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span>Average Water Level</span>
                  <span className="font-medium text-heat-600">28%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div className="bg-heat-500 h-1.5 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-heat-50 rounded-lg p-3">
                <div className="flex items-center">
                  <Droplet className="w-5 h-5 text-heat-500 mr-2.5" />
                  <div>
                    <div className="text-sm font-medium">Critical Alert</div>
                    <div className="text-xs text-muted-foreground">7 lakes at critically low levels</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-heat-500" />
              </div>
            </div>
          </DataCard>
        </FadeIn>
        
        <FadeIn delay="medium">
          <DataCard
            title="Rainfall Status"
            description="Current and forecast precipitation data"
            chip={{ text: "Moderate", variant: "urban" }}
          >
            <div className="space-y-3">
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span>Current Month vs Avg</span>
                  <span className="font-medium text-urban-600">-32%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div className="bg-urban-500 h-1.5 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-urban-50 rounded-lg p-3">
                <div className="flex items-center">
                  <CloudRain className="w-5 h-5 text-urban-500 mr-2.5" />
                  <div>
                    <div className="text-sm font-medium">Expected Rainfall</div>
                    <div className="text-xs text-muted-foreground">45mm expected in next 7 days</div>
                  </div>
                </div>
                <TrendingUp className="w-4 h-4 text-urban-500" />
              </div>
            </div>
          </DataCard>
        </FadeIn>
        
        <FadeIn delay="medium">
          <DataCard
            title="Groundwater Levels"
            description="Monitoring of underground water reserves"
            chip={{ text: "Declining", variant: "heat" }}
          >
            <div className="space-y-3">
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span>Current Depth</span>
                  <span className="font-medium text-heat-600">-1.4m YoY</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div className="bg-heat-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-heat-50 rounded-lg p-3">
                <div className="flex items-center">
                  <Scale className="w-5 h-5 text-heat-500 mr-2.5" />
                  <div>
                    <div className="text-sm font-medium">Depletion Rate</div>
                    <div className="text-xs text-muted-foreground">Accelerating in urban core</div>
                  </div>
                </div>
                <AreaChart className="w-4 h-4 text-heat-500" />
              </div>
            </div>
          </DataCard>
        </FadeIn>
      </div>
      
      {/* Lake water levels table */}
      <FadeIn delay="medium">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">
              {selectedZone ? `${selectedZone.charAt(0).toUpperCase() + selectedZone.slice(1)} Bengaluru` : 'Bengaluru'} Lake Monitoring
            </h3>
            <span className="bg-secondary px-2 py-1 rounded text-xs">Updated: Today, 09:45 AM</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-3 font-medium text-muted-foreground">Lake Name</th>
                  <th className="text-left pb-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left pb-3 font-medium text-muted-foreground">Water Level</th>
                  <th className="text-left pb-3 font-medium text-muted-foreground">Change (30d)</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {lakesToShow.map((lake, index) => (
                  <tr key={index} className="hover:bg-muted/20 transition-colors">
                    <td className="py-3 flex items-center">
                      <Droplet className={`w-4 h-4 mr-2 ${getWaterLevelColor(lake.level)}`} />
                      {lake.name}
                    </td>
                    <td className="py-3">
                      <WaterLevelBadge level={lake.level} />
                    </td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <span className="font-medium">{lake.percentage}%</span>
                        <div className="ml-2 w-16 bg-secondary rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full ${getWaterLevelBarColor(lake.level)}`} 
                            style={{ width: `${lake.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className={`flex items-center ${lake.change.startsWith('-') ? 'text-heat-600' : 'text-eco-600'}`}>
                        {lake.change.startsWith('-') ? (
                          <TrendingUp className="w-4 h-4 mr-1 rotate-180" />
                        ) : (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        )}
                        {lake.change}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-5 bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start">
            <AlertCircle className="w-5 h-5 text-amber-500 mr-3 mt-0.5" />
            <div>
              <div className="font-medium">Lake Restoration Needed</div>
              <p className="text-sm text-muted-foreground mt-1">
                Multiple lakes in Bengaluru are at critically low levels requiring immediate restoration
                efforts. Encroachment removal and desilting operations are recommended.
              </p>
            </div>
          </div>
        </Card>
      </FadeIn>
    </div>
  );
};

type WaterLevelBadgeProps = {
  level: string;
};

const WaterLevelBadge = ({ level }: WaterLevelBadgeProps) => {
  const colorClasses = getWaterLevelBadgeColor(level);
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}>
      {level}
    </span>
  );
};

const getWaterLevelColor = (level: string) => {
  switch (level) {
    case 'Critical':
      return 'text-heat-600';
    case 'Low':
      return 'text-amber-500';
    case 'Medium':
      return 'text-yellow-500';
    case 'Good':
      return 'text-eco-500';
    default:
      return 'text-blue-500';
  }
};

const getWaterLevelBarColor = (level: string) => {
  switch (level) {
    case 'Critical':
      return 'bg-heat-600';
    case 'Low':
      return 'bg-amber-500';
    case 'Medium':
      return 'bg-yellow-500';
    case 'Good':
      return 'bg-eco-500';
    default:
      return 'bg-blue-500';
  }
};

const getWaterLevelBadgeColor = (level: string) => {
  switch (level) {
    case 'Critical':
      return 'bg-heat-100 text-heat-800';
    case 'Low':
      return 'bg-amber-100 text-amber-800';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'Good':
      return 'bg-eco-100 text-eco-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
};

export default WaterDashboard;
