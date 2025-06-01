import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function imagebasedPage() {
  const router = useRouter();
  const [currentLocation, setCurrentLocation] = useState('');
  const [targetLocation, setTargetLocation] = useState('');
  const [foodType, setFoodType] = useState('');
  const [distance, setDistance] = useState('');

  const handleSearch = () => {
    if (!currentLocation || !targetLocation || !foodType || !distance) {
      alert('모든 항목을 입력해주세요!');
      return;
    }

    router.push({
      pathname: '/Finding',
      params: {
        currentLocation,
        targetLocation,
        foodType,
        distance,
      },
    });
  };

  const handleLocationClick = () => {
    setCurrentLocation('내 현재 위치');
  };

  const isFormFilled =
    currentLocation.trim() !== '' &&
    targetLocation.trim() !== '' &&
    foodType.trim() !== '' &&
    distance.trim() !== '';

  const distanceOptions = Array.from({ length: 20 }, (_, i) => (i + 1) * 100);

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push('/MainPage')}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#934F28" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>맛집 추천</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>맛집 찾기</Text>

        <Text style={styles.label}>📍 현재 위치</Text>
        <View style={styles.locationInputWrapper}>
          <TextInput
            style={styles.locationInput}
            placeholder="예: 충북대학교 서문"
            value={currentLocation}
            onChangeText={setCurrentLocation}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity style={styles.gpsButton} onPress={handleLocationClick}>
            <MaterialIcons name="my-location" size={20} color="#aaa" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>🚩 원하는 위치</Text>
        <TextInput
          style={styles.input}
          placeholder="예: 충북대"
          value={targetLocation}
          onChangeText={setTargetLocation}
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>🍜 원하는 음식</Text>
        <View style={styles.input}>
          <Picker
            selectedValue={foodType}
            onValueChange={(itemValue) => setFoodType(itemValue)}
            mode="dropdown"
            style={styles.picker}
            dropdownIconColor="#934F28"
          >
            <Picker.Item label="-- 선택해주세요 --" value="" />
            <Picker.Item label="한식" value="한식" />
            <Picker.Item label="양식" value="양식" />
            <Picker.Item label="일식" value="일식" />
            <Picker.Item label="분식" value="분식" />
            <Picker.Item label="브런치" value="브런치" />
            <Picker.Item label="고기구이" value="고기구이" />
            <Picker.Item label="해물" value="해물" />
            <Picker.Item label="아시아음식" value="아시아음식" />
          </Picker>
        </View>

        <Text style={styles.label}>📏 최소 거리 (M)</Text>
        <View style={styles.input}>
          <Picker
            selectedValue={distance}
            onValueChange={(itemValue) => setDistance(itemValue)}
            mode="dropdown"
            style={styles.picker}
            dropdownIconColor="#934F28"
          >
            <Picker.Item label="-- 선택해주세요 --" value="" />
            {distanceOptions.map((val) => (
              <Picker.Item key={val} label={`${val}M`} value={String(val)} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity
          style={[styles.button, !isFormFilled && styles.disabledButton]}
          onPress={handleSearch}
          disabled={!isFormFilled}
        >
          <MaterialIcons name="search" size={24} color="#fff" />
          <Text style={styles.buttonText}>맛집 찾기</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FCECDC',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FCECDC',
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#934F28',
    marginLeft: 8,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#934F28',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#934F28',
    alignSelf: 'flex-start',
    marginBottom: 6,
    maxWidth: 500,
  },
  input: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 14,
    marginBottom: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  locationInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    height: 44,
    width: '100%',
    maxWidth: 500,
    overflow: 'hidden',
  },
  locationInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    height: '100%',
    paddingHorizontal: 12,
    borderWidth: 0,
  },
  gpsButton: {
    width: 44,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderColor: '#ddd',
  },
  picker: {
    fontSize: 14,
    color: '#000',
    width: '100%',
    height: 44,
  },
  button: {
    maxWidth: 500,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#934F28',
    paddingVertical: 16, // ✨ 더 큼
    paddingHorizontal: 24,
    borderRadius: 30,
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#c4a491',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17, // ✨ 더 큼
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
