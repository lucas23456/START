import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { firebase } from '../../config';
import { Picker } from '@react-native-picker/picker';

const HomeScreen = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedFromWhere, setSelectedFromWhere] = useState(''); // Выбранный город отправления
  const [selectedToWhere, setSelectedToWhere] = useState(''); // Выбранный город назначения
  const [filteredJobs, setFilteredJobs] = useState([]); // Отфильтрованные грузы
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const db = firebase.firestore();
    const jobsRef = db.collection('cargo');

    // Получить все грузы из Firestore
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
        console.error('Ошибка при получении грузов:', error);
      });
  }, []);

  useEffect(() => {
    if (searching) {
      // При поиске, фильтруем грузы
      filterJobs(selectedFromWhere, selectedToWhere, jobs);
      setSearching(false);
    }
  }, [searching]);

  const filterJobs = (fromWhere, toWhere, jobData) => {
    const filtered = jobData.filter(item => {
      if (fromWhere && toWhere) {
        return item.fromWhere === fromWhere && item.toWhere === toWhere;
      } else if (fromWhere) {
        return item.fromWhere === fromWhere;
      } else if (toWhere) {
        return item.toWhere === toWhere;
      }
      return true; // Показываем все грузы, если не выбраны города
    });

    setFilteredJobs(filtered);
  };

  const handleSearch = () => {
    setSearching(true);
  };

  const renderJobItem = ({ item }) => (
    <TouchableOpacity
      style={styles.jobItem}
      onPress={() => navigation.navigate('JobDetailsScreen', { jobData: item })}
    >
      <Image source={require('../../assets/START_LOGOS/icon.png')} style={styles.jobImage} />
      <View style={styles.jobDetails}>
        <Text style={styles.jobTitle}>{item.fromWhere} - {item.toWhere}</Text>
        <Text style={styles.jobPrice}>Ставка {item.stavka}₽</Text>
        <Text style={styles.jobType}>вес груза: {item.weight} {item.weightUnit}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedFromWhere}
          onValueChange={itemValue => setSelectedFromWhere(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Откуда (Все)" value=""/>
          <Picker.Item label="Москва, РФ" value="Москва, РФ" />
            <Picker.Item label="Санкт-Петербург, РФ" value="Санкт-Петербург, РФ " />
            <Picker.Item label="Екатеринбург, РФ" value="Екатеринбург, РФ" />
            <Picker.Item label="Краснодар, РФ" value="Краснодар, РФ" />
            <Picker.Item label="Нижний Новгород, РФ" value="Нижний Новгород, РФ" />
            <Picker.Item label="Челябинск, РФ" value="Челябинск, РФ" />
          {/* Добавьте другие ваши города отправления */}
        </Picker>

        <Picker
          selectedValue={selectedToWhere}
          onValueChange={itemValue => setSelectedToWhere(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Куда (Все)" value="" />
          <Picker.Item label="Москва, РФ" value="Москва, РФ" />
            <Picker.Item label="Санкт-Петербург, РФ" value="Санкт-Петербург, РФ " />
            <Picker.Item label="Екатеринбург, РФ" value="Екатеринбург, РФ" />
            <Picker.Item label="Краснодар, РФ" value="Краснодар, РФ" />
            <Picker.Item label="Нижний Новгород, РФ" value="Нижний Новгород, РФ" />
            <Picker.Item label="Челябинск, РФ" value="Челябинск, РФ" />
          {/* Добавьте другие ваши города назначения */}
        </Picker>
      </View>

      <TouchableOpacity title="Поиск" style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Поиск</Text>
      </TouchableOpacity>

      {searching ? (
        <Text style={styles.searchingText}>Идет поиск...</Text>
      ) : (
        <FlatList
          data={filteredJobs}
          renderItem={renderJobItem}
          keyExtractor={item => item.id}
          style={styles.jobList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    flexDirection: 'row',
    borderColor: 'black'
  },
  picker: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  jobList: {
    paddingHorizontal: 16,
    textShadowColor:'#585858',
  },
  jobItem: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    // borderWidth: 1, // Добавляем контур
    // borderColor: 'black',
    borderRadius: 10,
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
  searchingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
  },
  button: {
    height: 50,
    width: 100,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    alignSelf: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 19,
    color: 'white',
  },
});

export default HomeScreen;
