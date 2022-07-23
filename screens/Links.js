import { SafeAreaView, View } from 'react-native'
import React from 'react'
import Text from "@kaloraat/react-native-text";
import FooterTabs from '../components/nav/FooterTabs';

const Post = () => {
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

export default Post