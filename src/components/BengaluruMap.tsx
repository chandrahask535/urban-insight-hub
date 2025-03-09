
import { useEffect, useRef, useState } from 'react';
import { FadeIn } from './animations/FadeIn';
import { Map, Layers, Eye, EyeOff, MapPin, Droplet, AlertTriangle } from 'lucide-react';

type BengaluruMapProps = {
  onZoneSelect: (zone: string | null) => void;
};

const BengaluruMap = ({ onZoneSelect }: BengaluruMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [activeOverlays, setActiveOverlays] = useState({
    landPrice: true,
    floodRisk: false,
    waterBodies: true,
    encroachment: false,
  });

  // Bengaluru zones data
  const zones = [
    { id: 'east', name: 'East Bengaluru', position: { x: 75, y: 45 }, price: '₹8,500/sqft', risk: 'Low' },
    { id: 'west', name: 'West Bengaluru', position: { x: 25, y: 45 }, price: '₹6,200/sqft', risk: 'Medium' },
    { id: 'north', name: 'North Bengaluru', position: { x: 50, y: 20 }, price: '₹7,800/sqft', risk: 'Low' },
    { id: 'south', name: 'South Bengaluru', position: { x: 50, y: 70 }, price: '₹9,100/sqft', risk: 'High' },
    { id: 'central', name: 'Central Bengaluru', position: { x: 50, y: 45 }, price: '₹15,200/sqft', risk: 'Medium' },
  ];

  // Simulating map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Notify parent component when a zone is selected
    onZoneSelect(selectedZone);
  }, [selectedZone, onZoneSelect]);

  const toggleOverlay = (overlay: keyof typeof activeOverlays) => {
    setActiveOverlays(prev => ({
      ...prev,
      [overlay]: !prev[overlay]
    }));
  };

  const handleZoneClick = (zoneId: string) => {
    setSelectedZone(prev => prev === zoneId ? null : zoneId);
  };

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] rounded-xl overflow-hidden shadow-elevated bg-muted/50">
      {!mapLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="flex flex-col items-center">
            <Map className="w-8 h-8 text-urban-500 animate-pulse" />
            <p className="mt-2 text-sm text-muted-foreground">Loading Bengaluru map data...</p>
          </div>
        </div>
      ) : (
        <FadeIn className="h-full">
          <div className="relative w-full h-full">
            {/* Bengaluru map - replace with actual map implementation */}
            <div 
              ref={mapContainerRef}
              className="map-container"
              style={{
                background: "url('https://images.unsplash.com/photo-1596796733066-ce43fd0c5f59?q=80&w=2369') center/cover"
              }}
            >
              {/* Zone markers */}
              {zones.map(zone => (
                <button
                  key={zone.id}
                  className={`absolute z-10 ${selectedZone === zone.id ? 'scale-125' : ''} transition-transform`}
                  style={{ 
                    left: `${zone.position.x}%`, 
                    top: `${zone.position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => handleZoneClick(zone.id)}
                >
                  <div className={`p-1 rounded-full ${selectedZone === zone.id ? 'bg-primary' : 'bg-white/70'}`}>
                    <div className={`flex items-center justify-center rounded-full w-8 h-8 
                      ${selectedZone === zone.id ? 'bg-primary text-white' : 'bg-white text-urban-600'}`}>
                      <MapPin className="w-5 h-5" />
                    </div>
                  </div>
                  {selectedZone === zone.id && (
                    <div className="absolute mt-2 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm shadow-float 
                                    rounded-lg p-2 min-w-40 z-20">
                      <h4 className="font-semibold text-sm">{zone.name}</h4>
                      <div className="grid grid-cols-2 gap-1 mt-1 text-xs">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-urban-500 rounded-full mr-1.5"></div>
                          <span>Avg: {zone.price}</span>
                        </div>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-1.5 
                            ${zone.risk === 'Low' ? 'bg-eco-500' : 
                              zone.risk === 'Medium' ? 'bg-amber-500' : 'bg-heat-500'}`}>
                          </div>
                          <span>Risk: {zone.risk}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            {/* Map Controls */}
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-white/90 backdrop-blur-sm shadow-float rounded-lg p-2">
                <div className="flex flex-col space-y-1">
                  <button 
                    className={`flex items-center justify-center w-8 h-8 rounded-md 
                      ${activeOverlays.landPrice ? 'bg-urban-100 text-urban-600' : 'hover:bg-muted'} 
                      transition-colors`}
                    onClick={() => toggleOverlay('landPrice')}
                  >
                    <MapPin className="w-5 h-5" />
                  </button>
                  <button 
                    className={`flex items-center justify-center w-8 h-8 rounded-md 
                      ${activeOverlays.floodRisk ? 'bg-heat-100 text-heat-600' : 'hover:bg-muted'} 
                      transition-colors`}
                    onClick={() => toggleOverlay('floodRisk')}
                  >
                    <AlertTriangle className="w-5 h-5" />
                  </button>
                  <button 
                    className={`flex items-center justify-center w-8 h-8 rounded-md 
                      ${activeOverlays.waterBodies ? 'bg-blue-100 text-blue-600' : 'hover:bg-muted'} 
                      transition-colors`}
                    onClick={() => toggleOverlay('waterBodies')}
                  >
                    <Droplet className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 z-10">
              <div className="bg-white/90 backdrop-blur-sm shadow-float rounded-lg p-3">
                <h4 className="text-xs font-medium mb-2">Map Layers</h4>
                <div className="space-y-2">
                  <LayerControl 
                    name="Land Prices" 
                    color="urban-500" 
                    active={activeOverlays.landPrice}
                    onClick={() => toggleOverlay('landPrice')}
                  />
                  <LayerControl 
                    name="Flood Risk Zones" 
                    color="heat-500" 
                    active={activeOverlays.floodRisk}
                    onClick={() => toggleOverlay('floodRisk')}
                  />
                  <LayerControl 
                    name="Water Bodies" 
                    color="blue-500" 
                    active={activeOverlays.waterBodies}
                    onClick={() => toggleOverlay('waterBodies')}
                  />
                  <LayerControl 
                    name="Encroachment Areas" 
                    color="amber-500" 
                    active={activeOverlays.encroachment}
                    onClick={() => toggleOverlay('encroachment')}
                  />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  );
};

type LayerControlProps = {
  name: string;
  color: string;
  active: boolean;
  onClick: () => void;
};

const LayerControl = ({ name, color, active, onClick }: LayerControlProps) => (
  <div 
    className={`flex items-center space-x-2 text-xs py-1 px-1 rounded-md cursor-pointer
      transition-colors ${active ? 'bg-secondary/80' : ''}`}
    onClick={onClick}
  >
    <div className={`w-3 h-3 rounded-sm bg-${color}`} />
    <span className="flex-grow">{name}</span>
    {active ? (
      <Eye className="w-3.5 h-3.5 text-foreground/70" />
    ) : (
      <EyeOff className="w-3.5 h-3.5 text-foreground/40" />
    )}
  </div>
);

export default BengaluruMap;
