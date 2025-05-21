import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthenticatedTabs from './authenticatedTabs';
import CreateProduct from '../../screens/createProduct/createProduct';

export type AuthenticatedStackParamList = {
  Tabs: undefined;
  CameraScreen?: {
    onCapture?: (image: any) => void;
  };
};

const Stack = createNativeStackNavigator<AuthenticatedStackParamList>();

export default function AuthenticatedStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tabs" component={AuthenticatedTabs} />
      <Stack.Screen name="CameraScreen" component={CreateProduct} />
    </Stack.Navigator>
  );
}
