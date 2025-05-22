import React from 'react';
import MapLibreGL from '@maplibre/maplibre-react-native';
import {StyleSheet, View} from 'react-native';
import {useMapStore} from '../../stores/mapCoordinates/mapStore';
import {darkBaseColor, lightBaseColor} from '../../styles/formStyles';
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
        <MapLibreGL.MapView style={{flex: 1}} onPress={handleMapPress}>
          <MapLibreGL.Camera centerCoordinate={center} zoomLevel={7} />
          <MapLibreGL.PointAnnotation id="centerMarker" coordinate={center}>
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: lightBaseColor,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: darkBaseColor,
              }}
            />
          </MapLibreGL.PointAnnotation>
        </MapLibreGL.MapView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainMapcontainer: {
    flex: 1,
    width: '100%',
    height: '45%',
  },
  mapContainer: {
    position: 'absolute',
    bottom: 0,
    height: '100%',
    width: '100%',
  },
});
