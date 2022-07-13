import { View, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import Text from "@kaloraat/react-native-text";
import UserInput from '../components/auth/UserInput';
import SubmitButton from '../components/auth/SubmitButton';
import axios from 'axios';
import CircleLogo from '../components/auth/CircleLogo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [state, setState] = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true)
    if (!name || !email || !password) {
      alert("All fields are required")
      setLoading(false)
      return
    }
    try {
      const { data } = await axios.post(`/signup`, {
        name, 
        email, 
        password
      })

      if (data.error) {
        alert(data.error)
        setLoading(false)
      } else {
        setState(data);
        await AsyncStorage.setItem('@auth', JSON.stringify(data));
        setLoading(false)
        console.log("SIGN UP SUCCESS => ", data);
        alert("Sign up successful")

        navigation.navigate("Home");
      }
      //redirect
    } catch (error) {
      alert("Signup failed, Try again.")
      console.log(error);
      setLoading(false)
    }
  }

  return (
    <KeyboardAwareScrollView 
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center"
    }}>
      <View style={{ marginVertical: 100 }}>
        <CircleLogo />
        
        <Text title center>Sign Up</Text>

        <UserInput 
          name="NAME" 
          value={name} 
          setValue={setName} 
          autoCapitalize="words"
          autoCorrect={false}
        />
        <UserInput 
          name="EMAIL" 
          value={email} 
          setValue={setEmail} 
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <UserInput 
          name="PASSWORD" 
          value={password} 
          setValue={setPassword} 
          secureTextEntry={true}
          autoCompleteType="password"
        />

        <SubmitButton 
          title="Sign Up" 
          handleSubmit={handleSubmit} 
          loading={loading}
        />

        <Text>
          Already Joined?{" "} 
          <Text onPress={() => navigation.navigate("Signin")} color="#ff2222">
            Sign In
          </Text>
        </Text>

        {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Signup