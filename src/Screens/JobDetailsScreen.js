import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../config';
import { Linking } from 'react-native';

const JobDetailsScreen = ({ route }) => {
  const { jobData } = route.params;
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [jobOwner, setJobOwner] = useState(null);

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      setUser(currentUser);

      // Загрузить данные о владельце вакансии из коллекции 'cargo'
      const cargoRef = firebase.firestore().collection('cargo').doc(jobData.userId);

      cargoRef.get()
        .then((cargoDoc) => {
          if (cargoDoc.exists) {
            setJobOwner(cargoDoc.data());
          }
        })
        .catch((error) => {
          console.error('Ошибка при загрузке данных о владельце вакансии: ', error);
        });
    }
  }, []);

  const openWhatsApp = () => {
    if (jobData && jobData.phoneNumber) {
      const phoneNumber = jobData.phoneNumber;
      const message = 'Привет, я заинтересован в вашей вакансии.';
  
      const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

      Linking.openURL(whatsappUrl)
        .then(() => {
          console.log('WhatsApp запущен');
        })
        .catch((error) => {
          console.error('Ошибка при открытии WhatsApp: ', error);
          // В случае ошибки можно предложить пользователю ввести номер вручную
        });
    } else {
      console.log('Номер телефона не найден.');
      // Здесь можно добавить сообщение об ошибке, если номер телефона отсутствует
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.jobType}>Груз: {jobData.cargo}</Text>
      <Text style={styles.jobDescription}>Описание: {jobData.customComment}</Text>
      <Text style={styles.jobDescription}>Вес: {jobData.weight} {jobData.weightUnit}</Text>
      <Text style={styles.jobDescription}>Ставка: {jobData.stavka} ₽</Text>
      <Text style={styles.jobDescription}>Место отправления: {jobData.fromWhere}</Text>
      <Text style={styles.jobDescription}>Адрес: {jobData.arrivalAdress}</Text>

      <Text style={styles.jobDescription}>Место прибытия: {jobData.toWhere}</Text>
      <Text style={styles.jobDescription}>Адрес: {jobData.unloadingAdress}</Text>

      <Text style={styles.jobDescription}>Дата начала: {jobData.startDate}</Text>
      <Text style={styles.jobDescription}>Дата когда надо закончить {jobData.unloading}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          openWhatsApp();
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>
          Контакты с заказчиком
        </Text>
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
  jobType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 40,
  },
  jobDescription: {
    fontSize: 18,
    marginTop: 20,
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
});

export default JobDetailsScreen;
