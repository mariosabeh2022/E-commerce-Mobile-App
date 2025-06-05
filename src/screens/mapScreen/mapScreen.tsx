import React, {useCallback} from 'react';
import MapLibreGL from '@maplibre/maplibre-react-native';
import {View} from 'react-native';
import {useMapStore} from '../../stores/mapCoordinates/mapStore';
import {styles} from './mapScreen.style';
import {MapScreenProps} from './mapScreen.type';

MapLibreGL.setAccessToken('CYR7xfJUCqmrqb10LQqN');
export default function MapScreen({coordinates}: MapScreenProps) {
  const defaultCenter = useMapStore(state => state.center);
  const setCenter = useMapStore(state => state.setCenter);
  //Setting coordinates for beirut as fallback
  const center = coordinates ?? defaultCenter;
  const handleMapPress = useCallback(
    (e: any) => {
      const coords = e.geometry.coordinates as [number, number];
      setCenter(coords);
    },
    [setCenter],
  );

  return (
    <View style={styles.mainMapContainer}>
      <View style={styles.mapContainer}>
        <MapLibreGL.MapView style={styles.mapView} onPress={handleMapPress}>
          <MapLibreGL.Camera centerCoordinate={center} zoomLevel={7} />
          <MapLibreGL.PointAnnotation id="centerMarker" coordinate={center}>
            <View style={styles.innerView} />
          </MapLibreGL.PointAnnotation>
        </MapLibreGL.MapView>
      </View>
    </View>
  );
}
