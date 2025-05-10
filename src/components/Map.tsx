
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>(() => {
    // Try to get token from localStorage if previously saved
    return localStorage.getItem('mapbox_token') || '';
  });

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      // Save token to localStorage for future visits
      localStorage.setItem('mapbox_token', mapboxToken);

      // Initialize map
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 14,
        center: [30.516791, 50.515747], // Coordinates for Левка Лук'яненка, 21, Київ
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      // Add marker
      new mapboxgl.Marker()
        .setLngLat([30.516791, 50.515747])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML('<h3>НЕЗАЛЕЖНИЙ ІНСТИТУТ СУДОВИХ ЕКСПЕРТИЗ</h3><p>вул. Левка Лук\'яненка, 21, корпус 3, офіс 7</p>')
        )
        .addTo(map.current);
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
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
      </div>
    </div>
  );
};

export default Map;
