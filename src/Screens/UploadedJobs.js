import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { firebase } from '../../config';

export default function UploadedJobs() {
  const [uploadedJobs, setUploadedJobs] = useState([]);
  const user = firebase.auth().currentUser;

  useEffect(() => {
    if (user) {
      // Получите заказы пользователя из Firestore
      const unsubscribe = firebase.firestore()
        .collection('cargo')
        .where('userId', '==', user.uid)
        .onSnapshot((querySnapshot) => {
          const jobs = [];
          querySnapshot.forEach((doc) => {
            jobs.push({ id: doc.id, ...doc.data() });
          });
          setUploadedJobs(jobs);
        });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const handleMarkJobCompleted = (jobId) => {
    // Всплывающее окно подтверждения перед перемещением заказа в выполненные
    Alert.alert(
      'Переместить заказ в выполненные',
      'Вы уверены, что хотите переместить этот заказ в выполненные?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Переместить',
          onPress: () => {
            // Перемещение заказа из коллекции "cargo" в "completedCargo"
            const cargoRef = firebase.firestore().collection('cargo').doc(jobId);
            cargoRef.get()
              .then((doc) => {
                if (doc.exists) {
                  const data = doc.data();
                  firebase.firestore().collection('completedCargo').add(data)
                    .then(() => {
                      console.log('Заказ успешно перемещен в выполненные');
                      // Удаление заказа из коллекции "cargo"
                      cargoRef.delete();
                    })
                    .catch((error) => {
                      console.error('Ошибка при перемещении заказа:', error);
                    });
                }
              })
              .catch((error) => {
                console.error('Ошибка при получении заказа:', error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={uploadedJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.jobContainer}>
            <Text style={styles.jobType}>Груз: {item.cargo}</Text>
            <Text style={styles.jobDescription}>{item.startDate}</Text>
            <Text style={styles.jobDescription}>{item.weight} кг</Text>
            <Text style={styles.jobDescription}>{item.stavka} ₽</Text>
            <Text style={styles.jobDescription}>{item.fromWhere}</Text>
            <Text style={styles.jobDescription}>{item.toWhere}</Text>
            <TouchableOpacity
              style={styles.markCompletedButton}
              onPress={() => handleMarkJobCompleted(item.id)}
            >
              <Text style={styles.buttonText}>Заказ выполнен успешно</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  jobContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  jobType: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  jobDescription: {
    fontSize: 16,
  },
  markCompletedButton: {
    marginTop: 10,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
