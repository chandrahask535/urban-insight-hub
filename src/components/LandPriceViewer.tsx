
import { useState } from 'react';
import { DataCard } from './ui/DataCard';
import { FadeIn } from './animations/FadeIn';
import { 
  Home, TrendingUp, MapPin, 
  ArrowUpRight, AlertCircle, Filter 
} from 'lucide-react';
import { Card } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

type LandPriceViewerProps = {
  selectedZone: string | null;
};

// Land prices by zone/locality
const landPriceData = {
  "east": [
    { area: "Whitefield", price: 8500, change: "+5.2%", zIndex: 75 },
    { area: "Marathahalli", price: 9200, change: "+6.8%", zIndex: 82 },
    { area: "Mahadevapura", price: 7800, change: "+4.1%", zIndex: 68 },
    { area: "CV Raman Nagar", price: 10500, change: "+7.3%", zIndex: 85 },
  ],
  "west": [
    { area: "Rajajinagar", price: 12500, change: "+3.5%", zIndex: 78 },
    { area: "Yeshwanthpur", price: 8900, change: "+4.2%", zIndex: 72 },
    { area: "Vijayanagar", price: 9600, change: "+2.8%", zIndex: 70 },
  ],
  "north": [
    { area: "Hebbal", price: 11200, change: "+8.5%", zIndex: 88 },
    { area: "Yelahanka", price: 7500, change: "+6.1%", zIndex: 75 },
    { area: "Jakkur", price: 8200, change: "+5.7%", zIndex: 72 },
  ],
  "south": [
    { area: "Jayanagar", price: 14800, change: "+4.5%", zIndex: 90 },
    { area: "JP Nagar", price: 12100, change: "+5.2%", zIndex: 86 },
    { area: "Banashankari", price: 10500, change: "+3.8%", zIndex: 82 },
    { area: "BTM Layout", price: 9800, change: "+6.7%", zIndex: 84 },
  ],
  "central": [
    { area: "Indiranagar", price: 18500, change: "+6.8%", zIndex: 95 },
    { area: "Koramangala", price: 19200, change: "+7.5%", zIndex: 96 },
    { area: "MG Road", price: 22500, change: "+4.2%", zIndex: 92 },
    { area: "Cunningham Road", price: 25000, change: "+3.1%", zIndex: 90 },
  ],
  "all": [
    { area: "Indiranagar", price: 18500, change: "+6.8%", zIndex: 95 },
    { area: "Whitefield", price: 8500, change: "+5.2%", zIndex: 75 },
    { area: "Jayanagar", price: 14800, change: "+4.5%", zIndex: 90 },
    { area: "Hebbal", price: 11200, change: "+8.5%", zIndex: 88 },
    { area: "Rajajinagar", price: 12500, change: "+3.5%", zIndex: 78 },
  ]
};

const LandPriceViewer = ({ selectedZone }: LandPriceViewerProps) => {
  const [propertyType, setPropertyType] = useState('residential');
  const [priceRange, setPriceRange] = useState([5000, 20000]);
  
  // Show all areas if no zone is selected
  const currentZone = selectedZone || "all";
  const areasToShow = landPriceData[currentZone as keyof typeof landPriceData];
  
  // Filter areas by price range
  const filteredAreas = areasToShow.filter(
    area => area.price >= priceRange[0] && area.price <= priceRange[1]
  );

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Land Price Analysis</h2>
            <p className="text-muted-foreground">
              Current market prices and trends across Bengaluru
            </p>
          </div>
          
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="agricultural">Agricultural</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </FadeIn>
      
      <FadeIn delay="short">
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-5">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-medium">Filter by Price Range (₹/sqft)</h3>
          </div>
          
          <div className="px-3">
            <Slider 
              defaultValue={[5000, 20000]} 
              max={25000} 
              min={5000} 
              step={500}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mb-6"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₹{priceRange[0].toLocaleString()}</span>
              <span>₹{priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </Card>
      </FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <FadeIn delay="short">
          <DataCard
            title="Market Overview"
            description="Land price trends in Bengaluru"
            chip={{ text: "Rising", variant: "urban" }}
          >
            <div className="space-y-3">
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span>YoY Price Growth</span>
                  <span className="font-medium text-urban-600">+5.4%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div className="bg-urban-500 h-1.5 rounded-full" style={{ width: '54%' }}></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-urban-50 rounded-lg p-3">
                <div className="flex items-center">
                  <Home className="w-5 h-5 text-urban-500 mr-2.5" />
                  <div>
                    <div className="text-sm font-medium">Highest Growth</div>
                    <div className="text-xs text-muted-foreground">Hebbal: +8.5% annual</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-urban-500" />
              </div>
            </div>
          </DataCard>
        </FadeIn>
        
        <FadeIn delay="medium">
          <DataCard
            title="Price Per Sqft"
            description="Average price per square foot"
            chip={{ text: "Premium", variant: "urban" }}
          >
            <div className="flex flex-col justify-center items-center py-2">
              <div className="text-4xl font-bold text-urban-600">₹11,240</div>
              <div className="text-sm text-muted-foreground mt-1">City Average</div>
              
              <div className="w-full mt-3">
                <div className="text-sm flex justify-between mb-1">
                  <span className="text-muted-foreground">Price Distribution</span>
                </div>
                <div className="w-full flex h-2">
                  <div className="bg-eco-500 h-2 rounded-l-full" style={{ width: '20%' }}></div>
                  <div className="bg-urban-400 h-2" style={{ width: '45%' }}></div>
                  <div className="bg-urban-600 h-2 rounded-r-full" style={{ width: '35%' }}></div>
                </div>
                <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                  <span>Budget</span>
                  <span>Mid-range</span>
                  <span>Luxury</span>
                </div>
              </div>
            </div>
          </DataCard>
        </FadeIn>
        
        <FadeIn delay="medium">
          <DataCard
            title="Price Forecast"
            description="Projected trends for next quarter"
            chip={{ text: "Forecast", variant: "primary" }}
          >
            <div className="space-y-3">
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span>Expected Growth</span>
                  <span className="font-medium text-urban-600">+2.8%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div className="bg-urban-500 h-1.5 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-blue-50 rounded-lg p-3">
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 text-blue-500 mr-2.5" />
                  <div>
                    <div className="text-sm font-medium">Market Prediction</div>
                    <div className="text-xs text-muted-foreground">Steady growth in eastern region</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-blue-500" />
              </div>
            </div>
          </DataCard>
        </FadeIn>
      </div>
      
      {/* Area Land Prices */}
      <FadeIn delay="medium">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">
              {selectedZone 
                ? `${selectedZone.charAt(0).toUpperCase() + selectedZone.slice(1)} Bengaluru Land Prices` 
                : 'Top Bengaluru Localities'}
            </h3>
            <span className="bg-secondary px-2 py-1 rounded text-xs">
              Updated: {new Date().toLocaleDateString()}
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-3 font-medium text-muted-foreground">Area</th>
                  <th className="text-left pb-3 font-medium text-muted-foreground">Price (₹/sqft)</th>
                  <th className="text-left pb-3 font-medium text-muted-foreground">YoY Change</th>
                  <th className="text-left pb-3 font-medium text-muted-foreground">Demand Index</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredAreas.map((area, index) => (
                  <tr key={index} className="hover:bg-muted/20 transition-colors">
                    <td className="py-3 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-urban-500" />
                      {area.area}
                    </td>
                    <td className="py-3 font-medium">
                      ₹{area.price.toLocaleString()}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center text-eco-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {area.change}
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <span className="font-medium">{area.zIndex}/100</span>
                        <div className="ml-2 w-16 bg-secondary rounded-full h-1.5">
                          <div 
                            className="bg-urban-500 h-1.5 rounded-full" 
                            style={{ width: `${area.zIndex}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-5 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
            <div>
              <div className="font-medium">Buyer's Insight</div>
              <p className="text-sm text-muted-foreground mt-1">
                Areas with proximity to metro stations and tech corridors are experiencing higher 
                appreciation rates. East Bengaluru remains most attractive for tech professionals 
                with new infrastructure development.
              </p>
            </div>
          </div>
        </Card>
      </FadeIn>
    </div>
  );
};

export default LandPriceViewer;
