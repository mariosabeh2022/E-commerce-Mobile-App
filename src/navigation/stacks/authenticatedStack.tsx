import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthenticatedTabs from './authenticatedTabs';
import CameraScreen from '../../screens/camera/camera';

export type AuthenticatedStackParamList = {
  Tabs: undefined;
  CameraScreen?: {
    onCapture?: (image: any) => void;
  };
  EditProduct: {id: string};
};

const Stack = createNativeStackNavigator<AuthenticatedStackParamList>();

export default function AuthenticatedStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tabs" component={AuthenticatedTabs} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
    </Stack.Navigator>
  );
}
