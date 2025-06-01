// app/Finding.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function FindingPage() {
  const router = useRouter();
  const { currentLocation, targetLocation, foodType, distance } = useLocalSearchParams();

  const handleViewResults = () => {
    router.push({
      pathname: '/ResultPage',
      params: {
        currentLocation,
        targetLocation,
        foodType,
        distance,
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#934F28" />
        </TouchableOpacity>
        <Text style={styles.title}>맛집 찾는 중...</Text>
      </View>

      <Image
        source={require('../assets/images/robot.png')}
        style={styles.robot}
      />

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>📍 현재 위치: {currentLocation}</Text>
        <Text style={styles.infoText}>🚩 원하는 위치: {targetLocation}</Text>
        <Text style={styles.infoText}>🍜 음식: {foodType}</Text>
        <Text style={styles.infoText}>📏 거리: {distance}M 이내</Text>
      </View>

      <Text style={styles.tipText}>
        🤖 {targetLocation} 근처에서 맛있는 {foodType} 가게를 찾고 있어요!
        {'\n'}잠시만 기다려주세요...
      </Text>

      <TouchableOpacity style={styles.resultButton} onPress={handleViewResults}>
        <MaterialIcons name="restaurant" size={20} color="#fff" />
        <Text style={styles.resultButtonText}>추천 결과 보기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 40,
    backgroundColor: '#FCECDC',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#934F28',
    marginLeft: 10,
  },
  robot: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoText: {
    fontSize: 15,
    color: '#934F28',
    marginBottom: 8,
    fontWeight: '500',
  },
  tipText: {
    fontSize: 14,
    color: '#934F28',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  resultButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#934F28',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  resultButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
