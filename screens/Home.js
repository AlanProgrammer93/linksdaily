import { SafeAreaView, View } from 'react-native'
import React, { useContext } from 'react'
import Text from "@kaloraat/react-native-text";
import { AuthContext } from '../context/auth';
import FooterTabs from '../components/nav/FooterTabs';

const Home = () => {
  const [state, setState] = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>
        
      </Text>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterTabs />
      </View>
    </SafeAreaView>
  )
}

export default Home