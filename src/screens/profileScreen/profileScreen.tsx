import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  Image,
  ToastAndroid,
} from 'react-native';
import useAuthStore from '../../stores/authStore/authStore';
import CustomErrorMessage from '../../components/atoms/errorMessage/errorMessage';
import {styles} from './profileScreenstyle';
import {errorCodes} from '../../lib/errorCodes';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomButton from '../../components/atoms/customButton/customButton';
import {useTheme} from '../../contexts/themeContext';
import {darkBaseColor, lightBaseColor} from '../../styles/formStyles';
import {Controller, useForm} from 'react-hook-form';
import CustomInput from '../../components/atoms/customInput/customInput';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {schema} from '../../utils/editFormTypeValidation';
import {validateInput} from '../../utils/editFormValidation';
import {Modal} from 'react-native';
import CustomTitle from '../../components/atoms/customTitle/customTitle';
import CustomModalIcons from '../../components/atoms/customModalIcons/customModalIcons';
import useUserStore from '../../stores/profileStore/profileStore';
import CustomIcon from '../../components/atoms/customIcon/customIcon';
import {API_URL} from '../../config/index';
import {fetchProfile} from '../../api/fetchProfile/fetchProfileCall';
import {updateProfile} from '../../api/updateProfile/updateProfileCall';
import {RefreshControl, ScrollView} from 'react-native';
const {FLARE, NOT_FOUND, NOT_VERIFIED} = errorCodes;
const ProfileScreen = () => {
  const {user, setUser, updateProfileImage} = useUserStore();
  const profilePicture = user.profileImage;
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  const infos = isAppDark ? styles.darkInfo : styles.info;
  const data = isAppDark ? styles.darkData : styles.data;
  const [isEditing, setIsEditing] = useState(false);
  const [verified, setVerified] = useState(false);
  const [fetchingUserLoad, setFetchingUserLoad] = useState(false);
  const [saveLoad, setSaveLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const userToken = useAuthStore(state => state.accessToken!);
  const clearToken = useAuthStore(state => state.clearToken);
  //Fetch profile
  const getProfile = useCallback(async () => {
    try {
      setFetchingUserLoad(true);
      let result = await fetchProfile({token: userToken});
      if (result.status === FLARE || result.status === NOT_FOUND) {
        result = await fetchProfile({token: userToken});
      }
      if (result.status === NOT_VERIFIED) {
        console.log('Unauthorized user');
      }
      setUser(result.data.user);
      if (result.data.user.isEmailVerified) {
        setVerified(true);
      }
      updateProfileImage(`${API_URL + result.data.user.profileImage.url}`);
    } catch (err: any) {
      console.log(err.message || 'Failed to load profile');
    }
    setFetchingUserLoad(false);
  }, [setUser, userToken, updateProfileImage]);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getProfile();
    setRefreshing(false);
  }, [getProfile]);
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  const creationDate = new Date(user.createdAt);
  const year = creationDate.getFullYear();
  const m = creationDate.getMonth() + 1;
  const month = m < 10 ? '0' + m : String(m);
  const d = creationDate.getDate();
  const day = d < 10 ? '0' + d : String(d);
  const formattedCreationDate = `${year}-${month}-${day}`;

  type FormData = z.infer<typeof schema>;

  const {control, handleSubmit, reset} = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const handleEditing = () => {
    reset({
      userName: `${user.firstName} ${user.lastName}`,
      profileImage: profilePicture ?? '',
    });
    setIsEditing(true);
  };

  const onSubmit = async (formData: FormData) => {
    setSaveLoading(true);
    setIsEditing(true);
    const {firstName, lastName} = validateInput(formData.userName);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', firstName);
      formDataToSend.append('lastName', lastName);

      if (profilePicture) {
        const uriParts = profilePicture.split('.');
        const fileType = uriParts[uriParts.length - 1];

        formDataToSend.append('profileImage', {
          uri: profilePicture,
          name: `profile.${fileType}`,
          type: `image/${fileType}`,
        } as any);
      }

      const response = await updateProfile({
        token: userToken,
        formData: formDataToSend,
      });
      if (response.success === true) {
        const updatedUser = response.data.user;
        setUser({
          ...user,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          profileImage: updatedUser.profileImage?.url
            ? API_URL + updatedUser.profileImage.url
            : user.profileImage,
        });
        ToastAndroid.show('Profile updated successfully!', ToastAndroid.SHORT);
      } else {
        throw new Error(response.message || 'Failed to update profile');
      }
    } catch (error) {
      ToastAndroid.show('Failed to update profile', ToastAndroid.SHORT);
    }
    setSaveLoading(false);
    setIsEditing(false);
  };
  const toggleModalVisibility = () => {
    setShowModal(prev => !prev);
  };
  if (!user || fetchingUserLoad) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator
          size="large"
          color={isAppDark ? darkBaseColor : lightBaseColor}
        />
      </View>
    );
  }
  return (
    <ScrollView
      style={isAppDark ? styles.darkContainer : styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[isAppDark ? darkBaseColor : lightBaseColor]}
        />
      }>
      <View style={isAppDark ? styles.darkContainer : styles.container}>
        <View>
          <View style={styles.profileImage}>
            {user.profileImage ? (
              user.profileImage.startsWith('file://') ? (
                <Image
                  source={{uri: user.profileImage}}
                  style={styles.profileImage}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={{uri: user.profileImage}}
                  style={styles.profileImage}
                  resizeMode="contain"
                />
              )
            ) : (
              <Icon name="user" size={100} color="gray" />
            )}
            <Pressable
              style={styles.uploadImage}
              onPress={toggleModalVisibility}>
              <Icon name="edit" size={25} />
            </Pressable>
          </View>
          <Text style={infos}>
            User Name:{' '}
            {isEditing ? (
              <Controller
                control={control}
                name="userName"
                render={({field: {value, onChange}}) => (
                  <CustomInput
                    placeholder="User Name"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="default"
                  />
                )}
              />
            ) : (
              <Text style={data}>{user.firstName + ' ' + user.lastName}</Text>
            )}
          </Text>
          <Text style={infos}>
            Email: <Text style={data}>{user.email}</Text>
          </Text>
          <Text style={infos}>
            Verification:{' '}
            <Text style={data}>
              {verified ? (
                <CustomIcon type="check" />
              ) : (
                <CustomIcon type="times-circle" />
              )}
            </Text>
          </Text>
          <Text style={infos}>
            Account Creation: <Text style={data}>{formattedCreationDate}</Text>
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          {saveLoad ? (
            <ActivityIndicator
              size="large"
              color={isAppDark ? darkBaseColor : lightBaseColor}
            />
          ) : !isEditing ? (
            <Pressable style={styles.buttonContainer} onPress={handleEditing}>
              <CustomButton text="Edit Profile" />
            </Pressable>
          ) : (
            <>
              <Pressable
                style={styles.buttonContainer}
                onPress={handleSubmit(onSubmit)}>
                <CustomButton text="Save Profile" />
              </Pressable>
            </>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Pressable onPress={clearToken}>
            <CustomErrorMessage message="Logout" />
          </Pressable>
        </View>
        <Modal visible={showModal} animationType="slide" transparent={true}>
          <View style={styles.mainModalContainer}>
            <Pressable
              style={styles.upperOverlay}
              onPress={toggleModalVisibility}
            />
            <View
              style={
                isAppDark ? styles.darkModalContainer : styles.modalContainer
              }>
              <Pressable onPress={toggleModalVisibility}>
                <CustomIcon type="times-circle" />
              </Pressable>
              <CustomTitle text="Profile Photo" />
              <View>
                <CustomModalIcons includeRemove={true} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
