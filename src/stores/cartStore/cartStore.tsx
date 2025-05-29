import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Store} from './cartStore.type';

const useCartStore = create<Store>()(
  persist(
    set => ({
      cartUserId: '',
      products: [],
      setCartUserId: cartUserId => set({cartUserId}),
      addProduct: newProduct =>
        set(state => {
          const existing = state.products.find(p => p?._id === newProduct._id);

          if (existing) {
            return {
              products: state.products.map(p =>
                p && p._id === newProduct._id
                  ? {...p, count: (p.count ?? 0) + (newProduct.count ?? 1)}
                  : p,
              ),
            };
          }

          return {
            products: [
              ...state.products,
              {...newProduct, count: newProduct.count ?? 1},
            ],
          };
        }),
      decreaseProductCount: id =>
        set(state => ({
          products: state.products.map(p =>
            p._id === id && p.count && p.count > 1
              ? {...p, count: p.count - 1}
              : p,
          ),
        })),
      removeProduct: id =>
        set(state => ({
          products: state.products.filter(p => p._id !== id),
        })),
      clearProducts: () => set({products: []}),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
export default useCartStore;
