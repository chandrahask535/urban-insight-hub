
import { useEffect, useRef, useState } from 'react';
import { FadeIn } from './animations/FadeIn';
import { Map as MapIcon, Layers, Eye, EyeOff, Thermometer } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// This would normally be in an environment variable
// In a real app, you should never hardcode API keys
mapboxgl.accessToken = 'pk.eyJ1IjoiZGVtby11c2VyIiwiYSI6ImNscXE5ZHRjcTA5a3QyanFlb2x0ZTMybHMifQ.Z40JTrLpz-7FYx0Z7bRTrw';

const MapInterface = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [layersVisible, setLayersVisible] = useState({
    encroachment: true,
    heatIsland: true,
    greenSpace: false,
  });

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [77.5946, 12.9716], // Bengaluru coordinates
      zoom: 11
    });

    // Set up map event listeners
    const map = mapRef.current;
    
    map.on('load', () => {
      setMapLoaded(true);
      
      // Add heat island layer
      map.addSource('heat-data', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            // Downtown core - high temperature
            {
              'type': 'Feature',
              'properties': {
                'temperature': 38.2,
                'name': 'Downtown Core'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [77.5946, 12.9716]
              }
            },
            // Industrial zone
            {
              'type': 'Feature',
              'properties': {
                'temperature': 37.5,
                'name': 'Industrial Zone'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [77.6346, 12.9516]
              }
            },
            // Commercial district
            {
              'type': 'Feature',
              'properties': {
                'temperature': 36.8,
                'name': 'Commercial District'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [77.5746, 12.9916]
              }
            },
            // Residential area
            {
              'type': 'Feature',
              'properties': {
                'temperature': 35.2,
                'name': 'Residential Area'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [77.6146, 12.9416]
              }
            },
            // Green space
            {
              'type': 'Feature',
              'properties': {
                'temperature': 32.8,
                'name': 'Park Area'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [77.5846, 13.0016]
              }
            }
          ]
        }
      });
      
      map.addLayer({
        'id': 'heat-layer',
        'type': 'heatmap',
        'source': 'heat-data',
        'paint': {
          'heatmap-weight': [
            'interpolate',
            ['linear'],
            ['get', 'temperature'],
            32, 0,
            39, 1
          ],
          'heatmap-intensity': 1.5,
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(33,102,172,0)',
            0.2, 'rgb(103,169,207)',
            0.4, 'rgb(209,229,240)',
            0.6, 'rgb(253,219,199)',
            0.8, 'rgb(239,138,98)',
            1, 'rgb(178,24,43)'
          ],
          'heatmap-radius': 20,
          'heatmap-opacity': 0.9
        },
        'layout': {
          'visibility': layersVisible.heatIsland ? 'visible' : 'none'
        }
      });

      // Add markers for key locations
      const locations = [
        { name: 'Downtown Core', temp: '+5.2°C', coords: [77.5946, 12.9716], color: '#ff7214' },
        { name: 'Industrial Zone', temp: '+4.8°C', coords: [77.6346, 12.9516], color: '#f04f08' },
        { name: 'Residential District', temp: '+2.3°C', coords: [77.5846, 13.0016], color: '#1ca38e' }
      ];

      locations.forEach(location => {
        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'flex flex-col items-center';
        
        const markerIcon = document.createElement('div');
        markerIcon.className = 'w-8 h-8 rounded-full flex items-center justify-center';
        markerIcon.style.backgroundColor = location.color;
        
        const icon = document.createElement('span');
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path></svg>`;
        markerIcon.appendChild(icon);
        
        el.appendChild(markerIcon);
        
        // Add tooltip on hover
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div class="p-2">
              <div class="font-medium">${location.name}</div>
              <div class="text-sm text-heat-600">${location.temp} Above Average</div>
            </div>
          `);
          
        // Add marker to map
        new mapboxgl.Marker(el)
          .setLngLat(location.coords as [number, number])
          .setPopup(popup)
          .addTo(map);
      });
    });

    // Clean up on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  const toggleLayer = (layer: keyof typeof layersVisible) => {
    setLayersVisible(prev => {
      const newState = {
        ...prev,
        [layer]: !prev[layer]
      };
      
      if (mapRef.current) {
        if (layer === 'heatIsland' && mapRef.current.getLayer('heat-layer')) {
          mapRef.current.setLayoutProperty(
            'heat-layer',
            'visibility',
            newState.heatIsland ? 'visible' : 'none'
          );
        }
      }
      
      return newState;
    });
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
            <div 
              ref={mapContainerRef}
              className="map-container"
            />
            
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
            
            {/* Temperature scale */}
            <div className="absolute bottom-4 right-4 z-10">
              <div className="bg-white/90 backdrop-blur-sm shadow-float rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Thermometer className="w-4 h-4 text-heat-500" />
                  <h4 className="text-xs font-medium">Temperature Scale</h4>
                </div>
                <div className="h-32 w-6 relative rounded-md overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-heat-500 via-heat-300 to-eco-300"></div>
                  <div className="absolute -left-4 bottom-0 text-xs">32°C</div>
                  <div className="absolute -left-4 top-0 text-xs">39°C</div>
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
