import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import Text from "@kaloraat/react-native-text";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { Divider } from '@rneui/themed';

export const Tab = ({ text, name, handlePress }) => (
  <TouchableOpacity>
    <>
      <FontAwesome5
        name={name}
        size={25}
        style={{
          marginBottom: 3,
          alignSelf: "center",
        }}
        onPress={handlePress}
      />
      <Text>{text}</Text>
    </>
  </TouchableOpacity>
)

const FooterTabs = () => {
  const navigation = useNavigation();

  return (
    <>
      <Divider width={1} />
      <View style={{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 30,
        justifyContent: "space-between",
      }}>
        <Tab
          text="Home"
          name="home"
          handlePress={() => navigation.navigate("Home")}
        />
        <Tab
          text="Post"
          name="plus-square"
          handlePress={() => navigation.navigate("Post")}
        />
        <Tab
          text="Links"
          name="list-ol"
          handlePress={() => navigation.navigate("Links")}
        />
        <Tab
          text="Account"
          name="user"
          handlePress={() => navigation.navigate("Account")}
        />
      </View>
    </>
  )
}

export default FooterTabs