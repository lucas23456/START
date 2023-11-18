import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { firebase } from '../../config';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const AddCargoScreen = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(1); // Используем состояние для отслеживания текущего шага
  const [cargo, setCargo] = useState('');
  const [customComment, setcustomComment] = useState('');

  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('кг');
  const [volume, setVolume] = useState('');
  const [startDate, setStartDate] = useState('');
  const [fromWhere, setfromWhere] = useState('Москва');
  const [toWhere, settoWhere] = useState('Москва');

  const [arrivalAdress, setarrivalAdress] = useState('');
  const [unloading, setUnloading] = useState('');
  const [unloadingAdress, setUnloadingAdress] = useState('Чайковского 68а');

  const [arrivalDate, setArrivalDate] = useState('18/11/2023');
  const [stavka, setStavka] = useState('');

  const [deliveryType, setDeliveryType] = useState('');

  const addCargoToFirestore = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        alert('Пожалуйста, войдите в систему перед добавлением груза.');
        return;
      }
      // Получение ссылки на Firestore и создание нового документа
      const db = firebase.firestore();
      const cargoRef = db.collection('cargo').doc();
  
      // Получение данных пользователя из коллекции 'users'
      const userRef = db.collection('users').doc(user.uid);
      const userDoc = await userRef.get();
  
      if (userDoc.exists) {
        const phoneNumber = userDoc.data().phoneNumber;
  
        // Сбор данных для отправки в Firestore
        const cargoData = {
          id: cargoRef.id,
          customComment,
          weight,
          weightUnit,
          volume,
          startDate,
          arrivalDate,
          unloading,
          arrivalAdress,
          toWhere,
          fromWhere,
          stavka,
          cargo,
          userId: user.uid,
          phoneNumber, 
        };
  
        // Отправка данных в Firestore
        await cargoRef.set(cargoData);
  
        // Сброс состояния после успешной отправки
        setCargo('');
        setWeight('');
        setWeightUnit('кг');
        setfromWhere('Москва');
        settoWhere('Москва');
        setVolume('');
        setStartDate('18/11/2023');
        setArrivalDate('18/11/2023');

      
        setarrivalAdress('');
        setStavka('');
  
        // Вывод успешного сообщения и навигация
        console.log('Груз успешно добавлен в Firestore');
        navigation.navigate('HomeScreen');
      } else {
        console.log('Данные пользователя не найдены.');
        // Здесь можно добавить сообщение об ошибке, если данные пользователя отсутствуют
      }
    } catch (error) {
      // Обработка ошибки и вывод сообщения об ошибке
      console.error('Ошибка при добавлении груза в Firestore:', error);
    }
  };

  const handleDeliveryType = (type) => {
    setDeliveryType(type);
    if (type === 'Городская') {
      setarrivalAdress('');
      setStavka('');
      setCargo('')
      setcustomComment('')
      settoWhere('');
      setUnloadingAdress('')
      setStep(step + 1);
    }
    if (type === 'Межгородская') {
      setarrivalAdress('');
      setStavka('');
      setCargo('');
      setcustomComment('');
      settoWhere('');
      setfromWhere('');
      setUnloadingAdress('');
      setStep(step + 1);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {step === 1 && (
        <>
        <TouchableOpacity style={styles.button} onPress={() => handleDeliveryType('Городская')}>
          <Text style={styles.buttonText}>Городская</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleDeliveryType('Межгородская')}>
          <Text style={styles.buttonText}>Межгородская</Text>
        </TouchableOpacity>
        </>
      )}

      {step === 2 && deliveryType === 'Городская' && (
        <>
        <Text style={styles.header}>Груз:</Text>
          <Picker
            selectedValue={cargo}
            onValueChange={(itemValue) => setCargo(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Автомобиль(ли)" value="Автомобиль(ли)" />
            <Picker.Item label="Автошины" value="Автошины" />
            <Picker.Item label="Алкогольные напитки" value="Алкогольные напитки" />
            <Picker.Item label="Арматура" value="Арматура" />
            <Picker.Item label="Балки надрессорные" value="Балки надрессорные" />
            <Picker.Item label="Безалкогольные напитки" value="Безалкогольные напитки" />
            <Picker.Item label="Боковая рама" value="Боковая рама" />
            <Picker.Item label="Бумага" value="Бумага" />
            <Picker.Item label="Бытовая техника" value="Бытовая техника" />
            <Picker.Item label="Бытовая химия" value="Бытовая химия" />
            <Picker.Item label="Вагонка" value="Вагонка" />
            <Picker.Item label="Газосиликатные блоки" value="Газосиликатные блоки" />
            <Picker.Item label="Гипс" value="Гипс" />
            <Picker.Item label="Гофрокартон" value="Гофрокартон" />
            <Picker.Item label="Грибы" value="Грибы" />
            <Picker.Item label="ДВП" value="ДВП" />
            <Picker.Item label="ДСП" value="ДСП" />
            <Picker.Item label="Двери" value="Двери" />
            <Picker.Item label="Домашний переезд" value="Домашний переезд"/>
            <Picker.Item label="Доски" value="Доски" />
            <Picker.Item label="Древесина" value="Древесина" />
            <Picker.Item label="Древесный уголь" value="Древесный уголь" />
            <Picker.Item label="Ж/д запчасти (прочие)" value="Ж/д запчасти (прочие)" />
            <Picker.Item label="ЖБИ" value="ЖБИ" />
            <Picker.Item label="Животные" value="Животные" />
            <Picker.Item label="Зерно и семена (в упаковке)" value="Зерно и семена (в упаковке)" />
            <Picker.Item label="Зерно и семена (насыпью)" value="Зерно и семена (насыпью)" />
            <Picker.Item label="Игрушки" value="Игрушки" />
            <Picker.Item label="Изделия из кожи" value="Изделия из кожи" />
            <Picker.Item label="Изделия из металла" value="Изделия из металла" />
            <Picker.Item label="Изделия из резины" value="Изделия из резины" />
            <Picker.Item label="Инструмент" value="Инструмент" />
            <Picker.Item label="Кабель" value="Кабель " />
            <Picker.Item label="Канц. товары" value="Канц. товары" />
            <Picker.Item label="Кирпич" value="Кирпич" />
            <Picker.Item label="Ковры" value="Ковры" />
            <Picker.Item label="Колесная пара" value="Колесная пара" />
            <Picker.Item label="Компьютеры" value="Компьютеры" />
            <Picker.Item label="Кондитерские изделия" value="Кондитерские изделия" />
            <Picker.Item label="Консервы" value="Консервы" />
            <Picker.Item label="Кормовые/пищевые добавки" value="Кормовые/пищевые добавки" />
            <Picker.Item label="Крупа" value="Крупа" />
            <Picker.Item label="ЛДСП" value="ЛДСП" />
            <Picker.Item label="Люди" value="Люди" />
            <Picker.Item label="Макулатура" value="Макулатура" />
            <Picker.Item label="Мебель" value="Мебель" />
            <Picker.Item label="Медикаменты" value="Медикаменты" />
            <Picker.Item label="Мел" value="Мел" />
            <Picker.Item label="Металл" value="Металл" />
            <Picker.Item label="Металлолом" value="Металлолом" />
            <Picker.Item label="Металлопрокат" value="Металлопрокат" />
            <Picker.Item label="Минвата" value="Минвата" />
            <Picker.Item label="Молоко сухое" value="Молоко сухое" />
            <Picker.Item label="Мороженое" value="Мороженое" />
            <Picker.Item label="Мука" value="Мука" />
            <Picker.Item label="Мясо" value="Мясо" />
            <Picker.Item label="Нефтепродукты" value="Нефтепродукты" />
            <Picker.Item label="Оборудование и запчасти" value="Оборудование и запчасти" />
            <Picker.Item label="Оборудование медицинское" value="Оборудование медицинское" />
            <Picker.Item label="Обувь" value="Обувь" />
            <Picker.Item label="Овощи" value="Овощи" />
            <Picker.Item label="Огнеупорная продукция" value="Огнеупорная продукция" />
            <Picker.Item label="Одежда" value="Одежда" />
            <Picker.Item label="Парфюмерия и косметика" value="Парфюмерия и косметика" />
            <Picker.Item label="Пенопласт" value="Пенопласт" />
            <Picker.Item label="Песок" value="Песок" />
            <Picker.Item label="Пиво" value="Пиво" />
            <Picker.Item label="Пиломатериалы" value="Пиломатериалы" />
            <Picker.Item label="Пластик" value="Пластик" />
            <Picker.Item label="Поглощающий аппарат" value="Поглощающий аппарат" />
            <Picker.Item label="Поддоны" value="Поддоны" />
            <Picker.Item label="Продукты питания" value="Продукты питания" />
            <Picker.Item label="Профлист" value="Профлист" />
            <Picker.Item label="Птица" value="Птица" />
            <Picker.Item label="Рыба (неживая)" value="Рыба (неживая)" />
            <Picker.Item label="СОНК (КП)" value="СОНК (КП)" />
            <Picker.Item label="Сантехника" value="Сантехника" />
            <Picker.Item label="Сахар" value="Сахар" />
            <Picker.Item label="Сборный груз" value="Сборный груз" />
            <Picker.Item label="Соки" value="Соки" />
            <Picker.Item label="Соль" value="Соль" />
            <Picker.Item label="Стекло и фарфор" value="Стекло и фарфор" />
            <Picker.Item label="Стеклотара (бутылки и др.)" value="Стеклотара (бутылки и др.)" />
            <Picker.Item label="Стройматериалы" value="Стройматериалы" />
            <Picker.Item label="Сэндвич-панели" value="Сэндвич-панели" />
            <Picker.Item label="ТНП" value="ТНП" />
            <Picker.Item label="Табачные изделия" value="Табачные изделия" />
            <Picker.Item label="Тара и упаковка" value="Тара и упаковка" />
            <Picker.Item label="Текстиль" value="Текстиль" />
            <Picker.Item label="Торф" value="Торф" />
            <Picker.Item label="Транспортные средства" value="Транспортные средства" />
            <Picker.Item label="Трубы" value="Трубы" />
            <Picker.Item label="Удобрения" value="Удобрения" />
            <Picker.Item label="Утеплитель" value="Утеплитель" />
            <Picker.Item label="Фанера" value="Фанера" />
            <Picker.Item label="Ферросплавы" value="Ферросплавы" />
            <Picker.Item label="Фрукты" value="Фрукты" />
            <Picker.Item label="Хим. продукты неопасные" value="Хим. продукты неопасные" />
            <Picker.Item label="Хим. продукты опасные" value="Хим. продукты опасные" />
            <Picker.Item label="Хозтовары" value="Хозтовары" />
            <Picker.Item label="Холодильное оборудование" value="Холодильное оборудование" />
            <Picker.Item label="Цветы" value="Цветы" />
            <Picker.Item label="Цемент" value="Цемент" />
            <Picker.Item label="Чипсы" value="Чипсы" />
            <Picker.Item label="Шкуры мокросоленые" value="Шкуры мокросоленые" />
            <Picker.Item label="Шпалы" value="Шпалы" />
            <Picker.Item label="Щебень" value="Щебень" />
            <Picker.Item label="Электроника" value="Электроника" />
            <Picker.Item label="Ягоды" value="Ягоды" />
            <Picker.Item label="20' контейнер" value="20' контейнер" />
            <Picker.Item label="20' контейнер HC" value="20' контейнер HC" />
            <Picker.Item label="20' реф.контейнер" value="20' реф.контейнер" />
            <Picker.Item label="20' танк-контейнер" value="20' танк-контейнер" />
            <Picker.Item label="40' контейнер" value="40' контейнер" />
            <Picker.Item label="40' контейнер HC" value="40' контейнер HC" />
            <Picker.Item label="40' реф.контейнер" value="40' реф.контейнер" />
            <Picker.Item label="40' реф.контейнер HC" value="40' реф.контейнер HC" />
            <Picker.Item label="40' танк-контейнер" value="40' танк-контейнер" />
            <Picker.Item label="45' контейнер (нов.)" value="45' контейнер (нов.)" />
            <Picker.Item label="45' контейнер (стар.)" value="45' контейнер (стар.)" />
            <Picker.Item label="45' реф.контейнер" value="45' реф.контейнер" />

          </Picker>

          <TextInput
            style={styles.input}
            placeholder="Свой комментарий"
            value={customComment}
            onChangeText={setcustomComment}
          />

          <Text style={styles.header}>Город:</Text>

          <Picker
            selectedValue={toWhere}
            onValueChange={(itemValue) => settoWhere(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Москва, РФ" value="Москва, РФ" />
            <Picker.Item label="Санкт-Петербург, РФ" value="Санкт-Петербург, РФ " />
            <Picker.Item label="Екатеринбург, РФ" value="Екатеринбург, РФ" />
            <Picker.Item label="Краснодар, РФ" value="Краснодар, РФ" />
            <Picker.Item label="Нижний Новгород, РФ" value="Нижний Новгород, РФ" />
            <Picker.Item label="Челябинск, РФ" value="Челябинск, РФ" />

          </Picker>

          <Text style={styles.header}>Откуда надо забрать груз:</Text>
          <TextInput
            style={styles.input}
            placeholder="Откуда надо забрать груз "
            value={arrivalAdress}
            onChangeText={setarrivalAdress}
          />
          <Text style={styles.header}>Куда надо доставить:</Text>
          <TextInput
            style={styles.input}
            placeholder="Адрес разгрузки (адрес без города)"
            value={unloadingAdress}
            onChangeText={setUnloadingAdress}
          />
          <Text style={styles.header}>Ставка:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ставка"
            value={stavka}
            onChangeText={setStavka}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={addCargoToFirestore}>
            <Text style={styles.buttonText}>Добавить груз</Text>
        </TouchableOpacity>
        </>
      )}


      {step === 2 && deliveryType === 'Межгородская' && (
        <>
        <Text style={styles.header}>Груз:</Text>
          <Picker
            selectedValue={cargo}
            onValueChange={(itemValue) => setCargo(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Автомобиль(ли)" value="Автомобиль(ли)" />
            <Picker.Item label="Автошины" value="Автошины" />
            <Picker.Item label="Алкогольные напитки" value="Алкогольные напитки" />
            <Picker.Item label="Арматура" value="Арматура" />
            <Picker.Item label="Балки надрессорные" value="Балки надрессорные" />
            <Picker.Item label="Безалкогольные напитки" value="Безалкогольные напитки" />
            <Picker.Item label="Боковая рама" value="Боковая рама" />
            <Picker.Item label="Бумага" value="Бумага" />
            <Picker.Item label="Бытовая техника" value="Бытовая техника" />
            <Picker.Item label="Бытовая химия" value="Бытовая химия" />
            <Picker.Item label="Вагонка" value="Вагонка" />
            <Picker.Item label="Газосиликатные блоки" value="Газосиликатные блоки" />
            <Picker.Item label="Гипс" value="Гипс" />
            <Picker.Item label="Гофрокартон" value="Гофрокартон" />
            <Picker.Item label="Грибы" value="Грибы" />
            <Picker.Item label="ДВП" value="ДВП" />
            <Picker.Item label="ДСП" value="ДСП" />
            <Picker.Item label="Двери" value="Двери" />
            <Picker.Item label="Домашний переезд" value="Домашний переезд"/>
            <Picker.Item label="Доски" value="Доски" />
            <Picker.Item label="Древесина" value="Древесина" />
            <Picker.Item label="Древесный уголь" value="Древесный уголь" />
            <Picker.Item label="Ж/д запчасти (прочие)" value="Ж/д запчасти (прочие)" />
            <Picker.Item label="ЖБИ" value="ЖБИ" />
            <Picker.Item label="Животные" value="Животные" />
            <Picker.Item label="Зерно и семена (в упаковке)" value="Зерно и семена (в упаковке)" />
            <Picker.Item label="Зерно и семена (насыпью)" value="Зерно и семена (насыпью)" />
            <Picker.Item label="Игрушки" value="Игрушки" />
            <Picker.Item label="Изделия из кожи" value="Изделия из кожи" />
            <Picker.Item label="Изделия из металла" value="Изделия из металла" />
            <Picker.Item label="Изделия из резины" value="Изделия из резины" />
            <Picker.Item label="Инструмент" value="Инструмент" />
            <Picker.Item label="Кабель" value="Кабель " />
            <Picker.Item label="Канц. товары" value="Канц. товары" />
            <Picker.Item label="Кирпич" value="Кирпич" />
            <Picker.Item label="Ковры" value="Ковры" />
            <Picker.Item label="Колесная пара" value="Колесная пара" />
            <Picker.Item label="Компьютеры" value="Компьютеры" />
            <Picker.Item label="Кондитерские изделия" value="Кондитерские изделия" />
            <Picker.Item label="Консервы" value="Консервы" />
            <Picker.Item label="Кормовые/пищевые добавки" value="Кормовые/пищевые добавки" />
            <Picker.Item label="Крупа" value="Крупа" />
            <Picker.Item label="ЛДСП" value="ЛДСП" />
            <Picker.Item label="Люди" value="Люди" />
            <Picker.Item label="Макулатура" value="Макулатура" />
            <Picker.Item label="Мебель" value="Мебель" />
            <Picker.Item label="Медикаменты" value="Медикаменты" />
            <Picker.Item label="Мел" value="Мел" />
            <Picker.Item label="Металл" value="Металл" />
            <Picker.Item label="Металлолом" value="Металлолом" />
            <Picker.Item label="Металлопрокат" value="Металлопрокат" />
            <Picker.Item label="Минвата" value="Минвата" />
            <Picker.Item label="Молоко сухое" value="Молоко сухое" />
            <Picker.Item label="Мороженое" value="Мороженое" />
            <Picker.Item label="Мука" value="Мука" />
            <Picker.Item label="Мясо" value="Мясо" />
            <Picker.Item label="Нефтепродукты" value="Нефтепродукты" />
            <Picker.Item label="Оборудование и запчасти" value="Оборудование и запчасти" />
            <Picker.Item label="Оборудование медицинское" value="Оборудование медицинское" />
            <Picker.Item label="Обувь" value="Обувь" />
            <Picker.Item label="Овощи" value="Овощи" />
            <Picker.Item label="Огнеупорная продукция" value="Огнеупорная продукция" />
            <Picker.Item label="Одежда" value="Одежда" />
            <Picker.Item label="Парфюмерия и косметика" value="Парфюмерия и косметика" />
            <Picker.Item label="Пенопласт" value="Пенопласт" />
            <Picker.Item label="Песок" value="Песок" />
            <Picker.Item label="Пиво" value="Пиво" />
            <Picker.Item label="Пиломатериалы" value="Пиломатериалы" />
            <Picker.Item label="Пластик" value="Пластик" />
            <Picker.Item label="Поглощающий аппарат" value="Поглощающий аппарат" />
            <Picker.Item label="Поддоны" value="Поддоны" />
            <Picker.Item label="Продукты питания" value="Продукты питания" />
            <Picker.Item label="Профлист" value="Профлист" />
            <Picker.Item label="Птица" value="Птица" />
            <Picker.Item label="Рыба (неживая)" value="Рыба (неживая)" />
            <Picker.Item label="СОНК (КП)" value="СОНК (КП)" />
            <Picker.Item label="Сантехника" value="Сантехника" />
            <Picker.Item label="Сахар" value="Сахар" />
            <Picker.Item label="Сборный груз" value="Сборный груз" />
            <Picker.Item label="Соки" value="Соки" />
            <Picker.Item label="Соль" value="Соль" />
            <Picker.Item label="Стекло и фарфор" value="Стекло и фарфор" />
            <Picker.Item label="Стеклотара (бутылки и др.)" value="Стеклотара (бутылки и др.)" />
            <Picker.Item label="Стройматериалы" value="Стройматериалы" />
            <Picker.Item label="Сэндвич-панели" value="Сэндвич-панели" />
            <Picker.Item label="ТНП" value="ТНП" />
            <Picker.Item label="Табачные изделия" value="Табачные изделия" />
            <Picker.Item label="Тара и упаковка" value="Тара и упаковка" />
            <Picker.Item label="Текстиль" value="Текстиль" />
            <Picker.Item label="Торф" value="Торф" />
            <Picker.Item label="Транспортные средства" value="Транспортные средства" />
            <Picker.Item label="Трубы" value="Трубы" />
            <Picker.Item label="Удобрения" value="Удобрения" />
            <Picker.Item label="Утеплитель" value="Утеплитель" />
            <Picker.Item label="Фанера" value="Фанера" />
            <Picker.Item label="Ферросплавы" value="Ферросплавы" />
            <Picker.Item label="Фрукты" value="Фрукты" />
            <Picker.Item label="Хим. продукты неопасные" value="Хим. продукты неопасные" />
            <Picker.Item label="Хим. продукты опасные" value="Хим. продукты опасные" />
            <Picker.Item label="Хозтовары" value="Хозтовары" />
            <Picker.Item label="Холодильное оборудование" value="Холодильное оборудование" />
            <Picker.Item label="Цветы" value="Цветы" />
            <Picker.Item label="Цемент" value="Цемент" />
            <Picker.Item label="Чипсы" value="Чипсы" />
            <Picker.Item label="Шкуры мокросоленые" value="Шкуры мокросоленые" />
            <Picker.Item label="Шпалы" value="Шпалы" />
            <Picker.Item label="Щебень" value="Щебень" />
            <Picker.Item label="Электроника" value="Электроника" />
            <Picker.Item label="Ягоды" value="Ягоды" />
            <Picker.Item label="20' контейнер" value="20' контейнер" />
            <Picker.Item label="20' контейнер HC" value="20' контейнер HC" />
            <Picker.Item label="20' реф.контейнер" value="20' реф.контейнер" />
            <Picker.Item label="20' танк-контейнер" value="20' танк-контейнер" />
            <Picker.Item label="40' контейнер" value="40' контейнер" />
            <Picker.Item label="40' контейнер HC" value="40' контейнер HC" />
            <Picker.Item label="40' реф.контейнер" value="40' реф.контейнер" />
            <Picker.Item label="40' реф.контейнер HC" value="40' реф.контейнер HC" />
            <Picker.Item label="40' танк-контейнер" value="40' танк-контейнер" />
            <Picker.Item label="45' контейнер (нов.)" value="45' контейнер (нов.)" />
            <Picker.Item label="45' контейнер (стар.)" value="45' контейнер (стар.)" />
            <Picker.Item label="45' реф.контейнер" value="45' реф.контейнер" />

          </Picker>

          <TextInput
            style={styles.input}
            placeholder="Свой комментарий"
            value={customComment}
            onChangeText={setcustomComment}
          />

          <Text style={styles.header}>Откуда:</Text>
          <Picker
            selectedValue={fromWhere}
            onValueChange={(itemValue) => setfromWhere(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Москва, РФ" value="Москва, РФ" />
            <Picker.Item label="Санкт-Петербург, РФ" value="Санкт-Петербург, РФ " />
            <Picker.Item label="Екатеринбург, РФ" value="Екатеринбург, РФ" />
            <Picker.Item label="Краснодар, РФ" value="Краснодар, РФ" />
            <Picker.Item label="Нижний Новгород, РФ" value="Нижний Новгород, РФ" />
            <Picker.Item label="Челябинск, РФ" value="Челябинск, РФ" />

          </Picker>

          <Text style={styles.header}>Докуда:</Text>

          <Picker
            selectedValue={toWhere}
            onValueChange={(itemValue) => settoWhere(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Москва, РФ" value="Москва, РФ" />
            <Picker.Item label="Санкт-Петербург, РФ" value="Санкт-Петербург, РФ " />
            <Picker.Item label="Екатеринбург, РФ" value="Екатеринбург, РФ" />
            <Picker.Item label="Краснодар, РФ" value="Краснодар, РФ" />
            <Picker.Item label="Нижний Новгород, РФ" value="Нижний Новгород, РФ" />
            <Picker.Item label="Челябинск, РФ" value="Челябинск, РФ" />

          </Picker>

          <Text style={styles.header}>Откуда надо забрать груз:</Text>
          <TextInput
            style={styles.input}
            placeholder="Откуда надо забрать груз "
            value={arrivalAdress}
            onChangeText={setarrivalAdress}
          />
          <Text style={styles.header}>Куда надо доставить:</Text>
          <TextInput
            style={styles.input}
            placeholder="Адрес разгрузки (адрес без города)"
            value={unloadingAdress}
            onChangeText={setUnloadingAdress}
          />
          <Text style={styles.header}>Ставка:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ставка"
            value={stavka}
            onChangeText={setStavka}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={addCargoToFirestore}>
            <Text style={styles.buttonText}>Добавить груз</Text>
        </TouchableOpacity>

        </>
      )}

      {/* {step === 3 && (
        <>
          <Text style={styles.header}>Вес:</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
          <Picker
            selectedValue={weightUnit}
            onValueChange={(itemValue) => setWeightUnit(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="кг" value="кг" />
            <Picker.Item label="т" value="т" />
          </Picker>
        </>
      )}

      {step === 4 && (
        <>
          <Text style={styles.header}>Объём в м³:</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={volume}
            onChangeText={setVolume}
            keyboardType="numeric"
          />
        </>
      )}
    {step === 5 && (
        <>
          <Text style={styles.header}>Откуда:</Text>
          <Picker
            selectedValue={fromWhere}
            onValueChange={(itemValue) => setfromWhere(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Москва, РФ" value="Москва, РФ" />
            <Picker.Item label="Санкт-Петербург, РФ" value="Санкт-Петербург, РФ " />
            <Picker.Item label="Екатеринбург, РФ" value="Екатеринбург, РФ" />
            <Picker.Item label="Краснодар, РФ" value="Краснодар, РФ" />
            <Picker.Item label="Нижний Новгород, РФ" value="Нижний Новгород, РФ" />
            <Picker.Item label="Челябинск, РФ" value="Челябинск, РФ" />

          </Picker>

          <Text style={styles.header}>Куда:</Text>

          <Picker
            selectedValue={toWhere}
            onValueChange={(itemValue) => settoWhere(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Москва, РФ" value="Москва, РФ" />
            <Picker.Item label="Санкт-Петербург, РФ" value="Санкт-Петербург, РФ " />
            <Picker.Item label="Екатеринбург, РФ" value="Екатеринбург, РФ" />
            <Picker.Item label="Краснодар, РФ" value="Краснодар, РФ" />
            <Picker.Item label="Нижний Новгород, РФ" value="Нижний Новгород, РФ" />
            <Picker.Item label="Челябинск, РФ" value="Челябинск, РФ" />

          </Picker>
        </> 
      )}
      {step === 6 && (
        <>
          <Text style={styles.header}>Загрузка:</Text>
          <TextInput
            style={styles.input}
            placeholder="ДД/ММ/ГГ"
            value={arrivalDate}
            onChangeText={setArrivalDate}
          />
          <TextInput
            style={styles.input}
            placeholder="Адрес загрузке (адрес без города)"
            value={arrivalAdress}
            onChangeText={setarrivalAdress}
          />
        </>
      )}

      {step === 7 && (
        <>
          <Text style={styles.header}>Разгрузка:</Text>
          <TextInput
            style={styles.input}
            placeholder="ДД/ММ/ГГ"
            value={unloading}
            onChangeText={setUnloading}
          />
          <TextInput
            style={styles.input}
            placeholder="Адрес разгрузки (адрес без города)"
            value={unloadingAdress}
            onChangeText={setUnloadingAdress}
          />
        </>
      )}  

         {step === 8 && (
          <>
            <Text style={styles.header}>Ставка:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ставка"
              value={stavka}
              onChangeText={setStavka}
              keyboardType="numeric"
            />
          </>
        )}  
 */}
      {step > 8 && (
        <TouchableOpacity style={styles.button} onPress={nextStep}>
          <Text style={styles.buttonText}>Далее</Text>
        </TouchableOpacity>
      )}

      {step > 1 && (
        <TouchableOpacity style={styles.button} onPress={prevStep}>
          <Text style={styles.buttonText}>Назад</Text>
        </TouchableOpacity>
      )}

      {step === 8 && (
        <TouchableOpacity style={styles.button} onPress={addCargoToFirestore}>
          <Text style={styles.buttonText}>Добавить груз</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  label: {
    fontSize: 18,
  },  
  header: {
    fontSize: 24,
    fontWeight: 'bold',

  },
  input: {
    paddingTop: 20,
    paddingBottom: 20,
    width: 300,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  picker: {
    width: 201,
  },
  button: {
    marginTop: 40,
    height: 70,
    width: 250,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 19,
    color: 'white',
  },
});

export default AddCargoScreen;
