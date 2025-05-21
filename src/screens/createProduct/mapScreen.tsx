import React from 'react';
import MapLibreGL from '@maplibre/maplibre-react-native';
import {StyleSheet, View} from 'react-native';
import {useMapStore} from '../../stores/mapCoordinates/mapStore';
MapLibreGL.setAccessToken('CYR7xfJUCqmrqb10LQqN');

export default function MapScreen() {
  const center = useMapStore(state => state.center);
  const setCenter = useMapStore(state => state.setCenter);

  const handleMapPress = (e: any) => {
    const coords = e.geometry.coordinates as [number, number];
    setCenter(coords);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapLibreGL.MapView style={{flex: 1}} onPress={handleMapPress}>
          <MapLibreGL.Camera centerCoordinate={center} zoomLevel={8} />
          <MapLibreGL.PointAnnotation id="centerMarker" coordinate={center}>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: 'red',
                borderRadius: 15,
                borderWidth: 2,
                borderColor: 'white',
              }}
            />
          </MapLibreGL.PointAnnotation>
        </MapLibreGL.MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '20%',
  },
  mapContainer: {
    position: 'absolute',
    bottom: 0,
    height: '40%',
    width: '100%',
  },
});
