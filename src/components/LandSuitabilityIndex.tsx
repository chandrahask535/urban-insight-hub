
import { useState } from 'react';
import { DataCard } from './ui/DataCard';
import { FadeIn } from './animations/FadeIn';
import { Card } from './ui/card';
import { 
  Building, MapPin, Layers, 
  Check, X, Info, CheckCircle, AlertOctagon
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";

type LandSuitabilityIndexProps = {
  selectedZone: string | null;
};

// Land suitability and recommendation data
const landSuitabilityData = {
  "east": [
    { 
      area: "Whitefield North", 
      suitability: "High", 
      score: 85, 
      pros: ["Good drainage", "Elevated land", "Low flood risk"],
      cons: ["Traffic congestion", "Limited public transport"],
      recommendation: "Residential mixed-use development with water harvesting systems"
    },
    { 
      area: "Varthur", 
      suitability: "Low", 
      score: 35, 
      pros: ["Availability of land", "Lower prices"],
      cons: ["High flood risk", "Lake pollution", "Poor drainage"],
      recommendation: "Avoid development; focus on lake restoration and flood management"
    },
    { 
      area: "Mahadevapura", 
      suitability: "Moderate", 
      score: 62, 
      pros: ["IT corridor proximity", "Good connectivity"],
      cons: ["Moderate flood risk", "Water scarcity"],
      recommendation: "Commercial development with extensive rainwater harvesting"
    },
  ],
  "west": [
    { 
      area: "Rajajinagar Extension", 
      suitability: "High", 
      score: 78, 
      pros: ["Good infrastructure", "Low flood risk", "Metro connectivity"],
      cons: ["Higher land prices", "Limited new land parcels"],
      recommendation: "High-density residential with green spaces"
    },
    { 
      area: "Kengeri", 
      suitability: "Moderate", 
      score: 65, 
      pros: ["Availability of land", "Lower prices", "Metro connectivity"],
      cons: ["Moderate flood risk", "Underdeveloped infrastructure"],
      recommendation: "Planned township with water management infrastructure"
    },
  ],
  "north": [
    { 
      area: "Yelahanka New Town", 
      suitability: "High", 
      score: 82, 
      pros: ["Planned layout", "Good drainage", "Low flood risk"],
      cons: ["Airport noise", "Distance from CBD"],
      recommendation: "Residential and commercial mixed-use development"
    },
    { 
      area: "Jakkur", 
      suitability: "Moderate", 
      score: 68, 
      pros: ["Lake vicinity", "Relatively lower prices"],
      cons: ["Moderate flood risk", "Encroachment issues"],
      recommendation: "Low-density residential with lake buffer zones"
    },
  ],
  "south": [
    { 
      area: "JP Nagar Phase 9", 
      suitability: "High", 
      score: 80, 
      pros: ["Established neighborhood", "Good infrastructure", "Metro connectivity"],
      cons: ["High land prices", "Limited new development options"],
      recommendation: "Vertical development with water conservation features"
    },
    { 
      area: "Electronics City Phase 2", 
      suitability: "High", 
      score: 75, 
      pros: ["IT hub", "Planned development", "Affordable"],
      cons: ["Distance from city center", "Traffic congestion"],
      recommendation: "Integrated township with tech park expansion"
    },
  ],
  "central": [
    { 
      area: "Shantinagar Extension", 
      suitability: "Moderate", 
      score: 55, 
      pros: ["Central location", "Excellent connectivity"],
      cons: ["High density", "Flooding issues", "Limited new land"],
      recommendation: "Redevelopment with improved drainage systems"
    },
    { 
      area: "Richmond Town", 
      suitability: "Moderate", 
      score: 60, 
      pros: ["Prime location", "Good amenities"],
      cons: ["Very high prices", "Limited development potential"],
      recommendation: "Conservation and limited redevelopment with heritage considerations"
    },
  ],
  "all": [
    { 
      area: "Yelahanka New Town", 
      suitability: "High", 
      score: 82, 
      pros: ["Planned layout", "Good drainage", "Low flood risk"],
      cons: ["Airport noise", "Distance from CBD"],
      recommendation: "Residential and commercial mixed-use development"
    },
    { 
      area: "Whitefield North", 
      suitability: "High", 
      score: 85, 
      pros: ["Good drainage", "Elevated land", "Low flood risk"],
      cons: ["Traffic congestion", "Limited public transport"],
      recommendation: "Residential mixed-use development with water harvesting systems"
    },
    { 
      area: "Varthur", 
      suitability: "Low", 
      score: 35, 
      pros: ["Availability of land", "Lower prices"],
      cons: ["High flood risk", "Lake pollution", "Poor drainage"],
      recommendation: "Avoid development; focus on lake restoration and flood management"
    },
  ]
};

// Urban planning recommendations
const planningRecommendations = [
  {
    id: 1,
    title: "Lake Buffer Zone Enforcement",
    description: "Establish and strictly enforce 75-meter no-development buffer zones around all lakes to prevent encroachment and reduce flood risk.",
    impact: "High",
    timeline: "Immediate",
    type: "Regulatory"
  },
  {
    id: 2,
    title: "Integrated Stormwater Management",
    description: "Implement comprehensive stormwater management system with underground storage tanks and permeable surfaces throughout the city.",
    impact: "High",
    timeline: "Medium-term",
    type: "Infrastructure"
  },
  {
    id: 3,
    title: "Transit-Oriented Development",
    description: "Focus high-density development near metro stations and major transit hubs to reduce congestion and improve mobility.",
    impact: "Medium",
    timeline: "Long-term",
    type: "Planning"
  },
  {
    id: 4,
    title: "Mandatory Rainwater Harvesting",
    description: "Require all new buildings above 100 sq.m to implement rainwater harvesting systems with minimum storage capacity based on plot size.",
    impact: "Medium",
    timeline: "Immediate",
    type: "Regulatory"
  },
];

const LandSuitabilityIndex = ({ selectedZone }: LandSuitabilityIndexProps) => {
  const [filterSuitability, setFilterSuitability] = useState<string | null>(null);
  
  // Show all areas if no zone is selected
  const currentZone = selectedZone || "all";
  
  // Filter by suitability if filter is set
  let areasToShow = landSuitabilityData[currentZone as keyof typeof landSuitabilityData];
  if (filterSuitability) {
    areasToShow = areasToShow.filter(area => area.suitability === filterSuitability);
  }

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Land Suitability & Urban Planning</h2>
            <p className="text-muted-foreground">
              Sustainable development recommendations and suitability analysis
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Badge 
              variant="outline" 
              className={`cursor-pointer ${!filterSuitability ? 'bg-secondary' : ''}`}
              onClick={() => setFilterSuitability(null)}
            >
              All
            </Badge>
            <Badge 
              variant="outline" 
              className={`cursor-pointer ${filterSuitability === 'High' ? 'bg-eco-100 text-eco-800 hover:bg-eco-100' : ''}`}
              onClick={() => setFilterSuitability('High')}
            >
              High Suitability
            </Badge>
            <Badge 
              variant="outline" 
              className={`cursor-pointer ${filterSuitability === 'Moderate' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' : ''}`}
              onClick={() => setFilterSuitability('Moderate')}
            >
              Moderate
            </Badge>
            <Badge 
              variant="outline" 
              className={`cursor-pointer ${filterSuitability === 'Low' ? 'bg-heat-100 text-heat-800 hover:bg-heat-100' : ''}`}
              onClick={() => setFilterSuitability('Low')}
            >
              Low Suitability
            </Badge>
          </div>
        </div>
      </FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <FadeIn delay="short">
          <DataCard
            title="Sustainable Development"
            description="Planning principles for sustainable growth"
            chip={{ text: "Best Practices", variant: "eco" }}
          >
            <div className="space-y-3">
              <div className="bg-eco-50 rounded-lg p-3 flex items-center">
                <CheckCircle className="w-5 h-5 text-eco-500 mr-2.5" />
                <div>
                  <div className="text-sm font-medium">Lake Restoration Priority</div>
                  <div className="text-xs text-muted-foreground">Focus on restoring natural water bodies</div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-eco-500 mr-2 mt-0.5" />
                  <div>Mandatory rainwater harvesting in all new constructions</div>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-eco-500 mr-2 mt-0.5" />
                  <div>75-meter no-development zone around lakes</div>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-eco-500 mr-2 mt-0.5" />
                  <div>Transit-oriented development near metro stations</div>
                </div>
              </div>
            </div>
          </DataCard>
        </FadeIn>
        
        <FadeIn delay="medium">
          <DataCard
            title="Land Use Planning"
            description="Recommended zoning and development"
            chip={{ text: "Policy", variant: "urban" }}
          >
            <div className="space-y-3">
              <div className="bg-urban-50 rounded-lg p-3 flex items-center">
                <Layers className="w-5 h-5 text-urban-500 mr-2.5" />
                <div>
                  <div className="text-sm font-medium">Mixed-Use Development</div>
                  <div className="text-xs text-muted-foreground">Integrate residential, commercial & green spaces</div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-urban-500 mr-2 mt-0.5" />
                  <div>Vertical development in transit corridors</div>
                </div>
                <div className="flex items-start">
                  <X className="w-4 h-4 text-heat-500 mr-2 mt-0.5" />
                  <div>Avoid development in high flood risk areas</div>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-urban-500 mr-2 mt-0.5" />
                  <div>Urban density aligned with infrastructure capacity</div>
                </div>
              </div>
            </div>
          </DataCard>
        </FadeIn>
        
        <FadeIn delay="medium">
          <DataCard
            title="Infrastructure Focus"
            description="Priority infrastructure investments"
            chip={{ text: "Development", variant: "primary" }}
          >
            <div className="space-y-3">
              <div className="bg-blue-50 rounded-lg p-3 flex items-center">
                <Building className="w-5 h-5 text-blue-500 mr-2.5" />
                <div>
                  <div className="text-sm font-medium">Stormwater Management</div>
                  <div className="text-xs text-muted-foreground">Integrated drainage and storage systems</div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                  <div>Upgrade stormwater drain capacity</div>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                  <div>Develop water retention areas in flood-prone zones</div>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                  <div>Permeable surfaces for all new public spaces</div>
                </div>
              </div>
            </div>
          </DataCard>
        </FadeIn>
      </div>
      
      {/* Land suitability assessment */}
      <FadeIn delay="medium">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">
              {selectedZone 
                ? `${selectedZone.charAt(0).toUpperCase() + selectedZone.slice(1)} Bengaluru Land Suitability` 
                : 'Land Suitability Assessment'}
            </h3>
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Based on flood risk, infrastructure, and environmental factors</span>
            </div>
          </div>
          
          <div className="space-y-5">
            {areasToShow.map((area, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className={`p-4 flex justify-between items-center 
                  ${area.suitability === 'High' ? 'bg-eco-50 border-b border-eco-100' : 
                    area.suitability === 'Moderate' ? 'bg-amber-50 border-b border-amber-100' : 
                    'bg-heat-50 border-b border-heat-100'}`}>
                  <div className="flex items-center">
                    <MapPin className={`w-5 h-5 mr-2.5 
                      ${area.suitability === 'High' ? 'text-eco-500' : 
                        area.suitability === 'Moderate' ? 'text-amber-500' : 
                        'text-heat-500'}`} />
                    <div>
                      <div className="font-medium">{area.area}</div>
                      <div className="flex items-center mt-1">
                        <span className={`text-xs rounded-full px-2 py-0.5 
                          ${area.suitability === 'High' ? 'bg-eco-100 text-eco-800' : 
                            area.suitability === 'Moderate' ? 'bg-amber-100 text-amber-800' : 
                            'bg-heat-100 text-heat-800'}`}>
                          {area.suitability} Suitability
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">Suitability Score:</span>
                    <span className="font-semibold">{area.score}/100</span>
                  </div>
                </div>
                
                <div className="p-4 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Advantages</h4>
                      <ul className="space-y-1">
                        {area.pros.map((pro, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <Check className="w-4 h-4 text-eco-500 mr-2 mt-0.5" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Challenges</h4>
                      <ul className="space-y-1">
                        {area.cons.map((con, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <X className="w-4 h-4 text-heat-500 mr-2 mt-0.5" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Planning Recommendation</h4>
                    <p className="text-sm">{area.recommendation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </FadeIn>
      
      {/* Urban planning recommendations */}
      <FadeIn delay="long">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Key Urban Planning Recommendations</h3>
            <AlertOctagon className="w-5 h-5 text-urban-500" />
          </div>
          
          <div className="space-y-4">
            {planningRecommendations.map((rec) => (
              <div key={rec.id} className="border rounded-lg p-4">
                <div className="flex justify-between">
                  <h4 className="font-medium">{rec.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{rec.type}</Badge>
                    <Badge variant={rec.impact === 'High' ? 'destructive' : 'default'}>
                      {rec.impact} Impact
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{rec.description}</p>
                <div className="mt-2 text-xs flex items-center">
                  <span className="text-muted-foreground">Timeline:</span>
                  <span className="ml-1 font-medium">{rec.timeline}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </FadeIn>
    </div>
  );
};

export default LandSuitabilityIndex;
