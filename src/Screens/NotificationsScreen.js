import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { firebase } from '../../config';

export default function NotificationsScreen() {
  const [jobApplications, setJobApplications] = useState([]);
  const currentUser = firebase.auth().currentUser;

  useEffect(() => {
    if (currentUser) {
      const userIdToView = currentUser.uid; // Идентификатор текущего пользователя
      const jobApplicationsWithUsersRef = firebase.firestore().collection('jobApplicationsWithUsers');

      // Запрос данных из коллекции jobApplicationsWithUsers для текущего пользователя
      jobApplicationsWithUsersRef
        .where('userId', '==', userIdToView)
        .get()
        .then((querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
          setJobApplications(data);
        })
        .catch((error) => {
          console.error('Ошибка при загрузке данных: ', error);
        });
    }
  }, [currentUser]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Ваши отклики на задания:</Text>
      {jobApplications.map((jobApplication, index) => (
        <View key={index} style={styles.notification}>
          <Text>Имя пользователя: {jobApplication.userName}</Text>
          <Text>Телефон: {jobApplication.phoneNumber}</Text>
          <Text>Откуда: {jobApplication.fromWhere}</Text>
          <Text>Куда: {jobApplication.toWhere}</Text>
          {/* Добавьте другие данные, которые вам нужны */}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notification: {
    fontSize: 18,
    marginTop: 10,
  },
});
