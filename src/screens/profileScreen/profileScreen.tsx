import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import useAuthStore from '../../stores/authStore/authStore';
import CustomErrorMessage from '../../components/atoms/errorMessage/errorMessage';
import {fetchProfile} from '../../lib/axiosInstance';
import {errorCodes} from '../../lib/errorCodes';
const {FLARE} = errorCodes;
const ProfileScreen = () => {
  const userToken = useAuthStore(state => state.accessToken!);
  const clearToken = useAuthStore(state => state.clearToken);
  type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    createdAt: string;
  };

  const [user, setUser] = useState<User>({
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    profileImage: '',
    createdAt: '',
  });
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        let result = await fetchProfile({token: userToken});
        if (result.status === FLARE) {
          result = await fetchProfile({token: userToken});
        }
        console.log(result.data.user);
        setUser(result.data.user);
        console.log('verificatiobn:', result.data.user.isEmailVerified);
        setVerified(result.data.user.isEmailVerified);
      } catch (err: any) {
        console.log(err.message || 'Failed to load profile');
      }
      setLoading(false);
    };

    getProfile();
  }, [userToken]);
  if (!user || loading) {
    return <ActivityIndicator />;
  }
  return (
    <View style={{alignSelf: 'center'}}>
      <View>
        <Text>{user.profileImage}</Text>
        <Text>First Name: {user.firstName}</Text>
        <Text>Last Name: {user.lastName}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Verfication: {verified? 'Verified':'Not Yet Verified'}</Text>
        <Text>Account Creationg: {user.createdAt}</Text>
      </View>
      <Pressable onPress={clearToken}>
        <CustomErrorMessage message="Logout" />
      </Pressable>
    </View>
  );
};

export default ProfileScreen;
