
import React, { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

// Default location for "вул. Левка Лук'яненка, 21, корпус 3, офіс 7"
const DEFAULT_COORDINATES = {
  lng: 30.516791,
  lat: 50.451574
};

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [mapboxToken, setMapboxToken] = useState<string>(() => {
    // Try to get token from localStorage if previously saved
    return localStorage.getItem('mapbox_token') || '';
  });
  const [mapError, setMapError] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Clean up any previous map instance
    if (map.current) {
      map.current.remove();
      map.current = null;
      setMapLoaded(false);
    }

    // Reset error state
    setMapError(null);

    if (!mapboxToken) return;

    const initializeMap = async () => {
      try {
        // Save token to localStorage for future visits
        localStorage.setItem('mapbox_token', mapboxToken);

        // Dynamically import mapbox-gl to prevent SSR issues
        const mapboxgl = await import('mapbox-gl');
        
        // Initialize map
        mapboxgl.default.accessToken = mapboxToken;
        
        map.current = new mapboxgl.default.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          zoom: 15,
          center: [DEFAULT_COORDINATES.lng, DEFAULT_COORDINATES.lat],
        });

        // Add navigation controls
        map.current.addControl(
          new mapboxgl.default.NavigationControl(),
          'top-right'
        );

        // Add marker
        new mapboxgl.default.Marker()
          .setLngLat([DEFAULT_COORDINATES.lng, DEFAULT_COORDINATES.lat])
          .setPopup(
            new mapboxgl.default.Popup({ offset: 25 })
              .setHTML('<h3>НЕЗАЛЕЖНИЙ ІНСТИТУТ СУДОВИХ ЕКСПЕРТИЗ</h3><p>вул. Левка Лук\'яненка, 21, корпус 3, офіс 7</p>')
          )
          .addTo(map.current);
          
        map.current.on('load', () => {
          setMapLoaded(true);
        });
      } catch (error) {
        console.error("Error initializing map:", error);
        setMapError("Помилка при завантаженні карти. Перевірте токен Mapbox.");
      }
    };

    initializeMap();

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken]);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = document.getElementById('mapbox-token') as HTMLInputElement;
    if (input && input.value) {
      setMapboxToken(input.value);
    }
  };

  return (
    <div className="space-y-4">
      {!mapboxToken && (
        <form onSubmit={handleTokenSubmit} className="mb-4">
          <label htmlFor="mapbox-token" className="block text-sm font-medium text-gray-700 mb-1">
            Для відображення карти, введіть Mapbox токен
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="mapbox-token"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
              placeholder="pk.eyJ1IjoieW91..."
            />
            <button 
              type="submit"
              className="bg-brand-blue hover:bg-brand-light text-white px-4 py-2 rounded-md transition-colors"
            >
              Зберегти
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Отримати токен можна на сайті <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">mapbox.com</a>
          </p>
        </form>
      )}
      
      <div 
        ref={mapContainer}
        className={`w-full h-96 rounded-lg shadow-md ${!mapboxToken ? 'bg-gray-100 flex items-center justify-center' : ''}`}
      >
        {!mapboxToken && (
          <p className="text-gray-500">Введіть Mapbox токен для відображення карти</p>
        )}
        {mapError && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50 bg-opacity-70 rounded-lg">
            <p className="text-red-600 p-4 text-center">{mapError}</p>
          </div>
        )}
        {!mapLoaded && mapboxToken && !mapError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-70 rounded-lg">
            <p className="text-gray-600 p-4 text-center">Завантаження карти...</p>
          </div>
        )}
      </div>
      
      {mapboxToken && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              localStorage.removeItem('mapbox_token');
              setMapboxToken('');
            }}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Змінити токен
          </button>
        </div>
      )}
    </div>
  );
};

export default Map;
