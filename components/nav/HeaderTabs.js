import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import Text from "@kaloraat/react-native-text";
import { AuthContext } from '../../context/auth';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const HeaderTabs = () => {
  const [state, setState] = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate("TrendingLinks")}>
        <FontAwesome5Icon name='bell' size={25} color='#ff9900' />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default HeaderTabs