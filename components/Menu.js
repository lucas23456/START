import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'


const Menu = () => {
    const navigation = useNavigation()
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.menuItem}>
        <FontAwesome name="home" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AddJobScreen')} style={styles.menuItem}>
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.menuItem}>
        <FontAwesome name="user" size={24} color="white" />
      </TouchableOpacity>
      {/* Добавьте другие элементы меню */}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 3,
    backgroundColor: 'black',
  },
  menuItem: {
    paddingVertical: 5,
  },
});

export default Menu;