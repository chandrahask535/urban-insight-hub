
import { useEffect, useRef, useState } from 'react';
import { FadeIn } from './animations/FadeIn';
import { Map as MapIcon, Layers, Eye, EyeOff } from 'lucide-react';

const MapInterface = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [layersVisible, setLayersVisible] = useState({
    encroachment: true,
    heatIsland: true,
    greenSpace: false,
  });

  // Simulating map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleLayer = (layer: keyof typeof layersVisible) => {
    setLayersVisible(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] rounded-xl overflow-hidden shadow-elevated bg-muted/50">
      {!mapLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="flex flex-col items-center">
            <MapIcon className="w-8 h-8 text-urban-500 animate-pulse" />
            <p className="mt-2 text-sm text-muted-foreground">Loading map data...</p>
          </div>
        </div>
      ) : (
        <FadeIn className="h-full">
          <div className="relative w-full h-full">
            {/* Placeholder for actual map - this would be replaced with Mapbox/Leaflet */}
            <div 
              ref={mapContainerRef}
              className="map-container"
              style={{
                background: "url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2069') center/cover"
              }}
            >
              {/* Map content would be rendered here by the map library */}
            </div>
            
            {/* Map Controls */}
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-white/90 backdrop-blur-sm shadow-float rounded-lg p-2">
                <div className="space-y-1">
                  <button className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors">
                    <Layers className="w-5 h-5 text-foreground" />
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
                    name="Land Encroachment" 
                    color="heat-500" 
                    active={layersVisible.encroachment}
                    onClick={() => toggleLayer('encroachment')}
                  />
                  <LayerControl 
                    name="Heat Islands" 
                    color="urban-600" 
                    active={layersVisible.heatIsland}
                    onClick={() => toggleLayer('heatIsland')}
                  />
                  <LayerControl 
                    name="Green Spaces" 
                    color="eco-500" 
                    active={layersVisible.greenSpace}
                    onClick={() => toggleLayer('greenSpace')}
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
    className={`flex items-center space-x-2 text-xs py-1 px-1 rounded-md cursor-pointer transition-colors ${active ? 'bg-secondary/80' : ''}`}
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

export default MapInterface;
