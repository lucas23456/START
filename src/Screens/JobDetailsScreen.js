import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../../config';

const JobDetailsScreen = ({ route }) => {
  const { jobData } = route.params;
  const navigation = useNavigation()

  const handleChat = () => {
    navigation.navigate('ChatScreen', { otherUser: jobData.author, jobId: jobData.id });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
    {/* <Image style={styles.Image} source={require('../../assets/START_LOGOS/pac.png')} /> */}

      <Text style={styles.jobTitle}>{jobData.title}</Text>
      <Text style={styles.jobAuthor}>Заказчик {jobData.author.firstName}</Text>

      <Text style={styles.jobDescription}>{jobData.description}</Text>

      <Text style={styles.jobDescription}>{jobData.price} ₽</Text>

      <Text style={styles.jobType}>Тип задания: {jobData.type}</Text>

      {/* Другая информация о вакансии */}

      <TouchableOpacity style={styles.button}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>Взяться за работу</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.button}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>Предложить свою цену</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.button} onPress={handleChat}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>Контакты</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center'
  },
  jobType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 40,
  },
  jobAuthor: {
    fontSize: 20,
    color: 'gray',
    textAlign: 'center',
  },
  jobDescription: {
    fontSize: 18,
    marginTop: 40,
  },
  button: {
    marginTop: 20,
    height: 50,
    width: 250,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  Image:{
    width: "110%",
    height: 300

  }

});

export default JobDetailsScreen;