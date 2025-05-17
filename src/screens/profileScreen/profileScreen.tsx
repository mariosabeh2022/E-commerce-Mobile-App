import React from 'react';
import {Pressable, View} from 'react-native';
import useAuthStore from '../../stores/authStore/authStore';
import CustomErrorMessage from '../../components/atoms/errorMessage/errorMessage';
const ProfileScreen = () => {
  const clearToken = useAuthStore(state => state.clearToken);
  return (
    <View style={{alignSelf: 'center'}}>
      <Pressable onPress={clearToken}>
        <CustomErrorMessage message="Logout" />
      </Pressable>
    </View>
  );
};

export default ProfileScreen;
