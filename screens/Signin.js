import { View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Text from "@kaloraat/react-native-text";
import UserInput from '../components/auth/UserInput';
import SubmitButton from '../components/auth/SubmitButton';
import axios from 'axios';
import CircleLogo from '../components/auth/CircleLogo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true)
    if (!email || !password) {
      alert("All fields are required")
      setLoading(false)
      return
    }
    try {
      const { data } = await axios.post(`${API}/signin`, {
        email, 
        password
      })

      if (data.error) {
        alert(data.error);
        setLoading(false)
      } else {
        setLoading(false)
        console.log("SIGN IN SUCCESS => ", data);
        alert("Sign in successful")
      }
      
      //redirect
    } catch (error) {
      alert("Signin failed, Try again.")
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
        
        <Text title center>Sign In</Text>

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
          title="Sign In" 
          handleSubmit={handleSubmit} 
          loading={loading}
        />

        <Text small center>
          Not yet registered?{" "} 
          <Text onPress={() => navigation.navigate("Signup")} color="#ff2222">
            Sign Up
          </Text>
        </Text>

        <Text small center color="orange" style={{ marginTop: 10 }}>
            Forgot Password?
        </Text>

        {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Signin