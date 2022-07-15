import { View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Text from "@kaloraat/react-native-text";
import UserInput from '../components/auth/UserInput';
import SubmitButton from '../components/auth/SubmitButton';
import axios from 'axios';
import CircleLogo from '../components/auth/CircleLogo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicket from 'expo-image-picker';

const Account = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // image
  const [uploadImage, setUploadImage] = useState("");
  const [image, setImage] = useState({
    url: "",
    public_id: ""
  });

  const [state, setState] = useContext(AuthContext);

  useEffect(() => {
    if (state) {
      const { name, email, role, image } = state.user;
      setName(name);
      setEmail(email);
      setRole(role);
      setImage(image);
    }
  }, [state])

  const handleSubmit = async () => {
    setLoading(true)
    
    try {
      const { data } = await axios.post('/update-password', {password});
      if (data.error) {
        alert(data.error)
        setLoading(false)
      } else {
        alert('Password updated')
        setPassword("")
        setLoading(false)
      }
    } catch (error) {
      alert("Password update failed, Try again.")
      console.log(error);
      setLoading(false)
    }
  }

  const handleUpload = async () => {
    let permissionResult = await ImagePicket.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Camera access is required");
      return;
    }
    // get image from image library
    let picketResult = await ImagePicket.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (picketResult.cancelled === true) {
      return;
    }

    let base64Image = `data:image/jpg;base64,${picketResult.base64}`;
    setUploadImage(base64Image);

    const { data } = await axios.post("/upload-image", {
        image: base64Image,
    });

    const as = JSON.parse(await AsyncStorage.getItem("@auth"));
    as.user = data;
    await AsyncStorage.setItem('@auth', JSON.stringify(as));

    setState({ ...state, user: data });
    setImage(data.image);
    alert("Profile image saved");
  }

  return (
    <KeyboardAwareScrollView 
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center"
    }}>
      <View style={{ marginVertical: 100 }}>
        <CircleLogo>
          {image && image.url ? (
            <Image
              source={{ uri: image.url }} 
              style={{ 
                width: 190, 
                height: 190, 
                borderRadius: 100,
                marginVertical: 20 
              }}
            />
          ) : uploadImage ? (
            <Image
              source={{ uri: uploadImage }} 
              style={{ 
                width: 190, 
                height: 190, 
                borderRadius: 100,
                marginVertical: 20 
              }}
            />
          ) : (
            <TouchableOpacity onPress={() => handleUpload()}>
              <FontAwesome5Icon name='camera' size={25} color="orange" />
            </TouchableOpacity>
          )}
        </CircleLogo>

        {image && image.url ? (
          <TouchableOpacity onPress={() => handleUpload()}>
            <FontAwesome5Icon 
              name='camera' 
              size={25} 
              color="orange" 
              style={{ marginTop: -5, marginBottom: 10, alignSelf: "center" }}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}

        <Text title center style={{ paddingBottom: 10 }}>
          {name}
        </Text>
        <Text medium center style={{ paddingBottom: 10 }}>
          {email}
        </Text>
        <Text small center light style={{ paddingBottom: 50 }}>
          {role}
        </Text>

        <UserInput 
          name="PASSWORD" 
          value={password} 
          setValue={setPassword} 
          secureTextEntry={true}
          autoCompleteType="password"
        />

        <SubmitButton 
          title="Update Password" 
          handleSubmit={handleSubmit} 
          loading={loading}
        />
        {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Account