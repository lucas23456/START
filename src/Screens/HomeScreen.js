import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { firebase } from '../../config';

const HomeScreen = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    const jobsRef = db.collection('cargo');

    // Получить все вакансии из Firestore
    jobsRef
      .get()
      .then(querySnapshot => {
        const jobData = [];
        querySnapshot.forEach(doc => {
          jobData.push(doc.data());
        });
        setJobs(jobData);
      })
      .catch(error => {
        console.error('Ошибка при получении вакансий:', error);
      });
  }, []);

  const renderJobItem = ({ item }) => (
    <TouchableOpacity
      style={styles.jobItem}
      onPress={() => navigation.navigate('JobDetailsScreen', { jobData: item })}
    >
      <Image source={require('../../assets/START_LOGOS/icon.png')} style={styles.jobImage} />
      <View style={styles.jobDetails}>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <Text style={styles.jobPrice}>{item.price} ₽</Text>
        <Text style={styles.jobAuthor}>{item.author.firstName}</Text>
        <Text style={styles.jobType}>Тип задания: {item.type}</Text>

      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList data={jobs} renderItem={renderJobItem} keyExtractor={item => item.id} style={styles.jobList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  jobList: {
    paddingHorizontal: 16,
  },
  jobItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  jobImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  jobDetails: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  jobType: {
    fontSize: 15,
    marginBottom: 4,
  },
  jobPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  jobAuthor: {
    fontSize: 14,
    color: 'gray',
  },
});

export default HomeScreen;