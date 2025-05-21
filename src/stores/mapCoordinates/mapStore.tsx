// useMapStore.ts
import {create} from 'zustand';

type MapState = {
  center: [number, number];
  setCenter: (coords: [number, number]) => void;
};

export const useMapStore = create<MapState>(set => ({
  center: [35.49548, 33.88863],
  setCenter: coords => set({center: coords}),
}));
