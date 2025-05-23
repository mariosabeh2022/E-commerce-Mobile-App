import React from 'react';
import MapLibreGL from '@maplibre/maplibre-react-native';
import {View} from 'react-native';
import {useMapStore} from '../../stores/mapCoordinates/mapStore';
import {styles} from './mapScreen.style';
MapLibreGL.setAccessToken('CYR7xfJUCqmrqb10LQqN');
type MapScreenProps = {
  coordinates?: [number, number];
};
export default function MapScreen({coordinates}: MapScreenProps) {
  const defaultCenter = useMapStore(state => state.center);
  const setCenter = useMapStore(state => state.setCenter);
  const center = coordinates ?? defaultCenter;
  const handleMapPress = (e: any) => {
    const coords = e.geometry.coordinates as [number, number];
    setCenter(coords);
  };

  return (
    <View style={styles.mainMapcontainer}>
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
