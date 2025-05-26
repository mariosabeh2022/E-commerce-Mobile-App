import {LinkingOptions} from '@react-navigation/native';
import {AuthenticatedStackParamList} from './navigator/navigationTypes';

export const linking: LinkingOptions<AuthenticatedStackParamList> = {
  prefixes: ['ecommerceMobileApp://'],
  config: {
    screens: {
      // Root stack screens
      Tabs: {
        screens: {
          Devices: {
            screens: {
              Products: 'products',
              Details: 'details/:id',
            },
          },
        },
      },
    },
  },
};
