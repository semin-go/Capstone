import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function MbtiMatchPage() {
  const router = useRouter();

  const [yourMbti, setYourMbti] = useState('');
  const [partnerMbti, setPartnerMbti] = useState('');

  // List of valid MBTI types (case insensitive)
  const validMbtiTypes = [
    'ISTJ', 'INFP', 'ENFP', 'ENFJ', 'INFJ', 'INTJ', 'ENTJ', 'INTP', 
    'ISFP', 'ESFP', 'ESTP', 'ISFJ', 'ESFJ', 'ISTP', 'ENTP', 'ESTJ'
  ];

  // Check if the MBTI is valid
  const isMbtiValid = (mbti: string) => validMbtiTypes.includes(mbti.trim().toUpperCase());

  // Check if both partner and your MBTI are valid
  const isInputValid = isMbtiValid(yourMbti) && isMbtiValid(partnerMbti);

  const handleAnalyzePress = () => {
    router.push({
      pathname: '/CompatibilityResultPage',
      params: {
        your: yourMbti.trim().toUpperCase(),
        partner: partnerMbti.trim().toUpperCase(),
      },
    });
  };

  const handlePartnerDetailPress = () => {
    router.push({
      pathname: '/MbtiDetailPage',
      params: {
        partner: partnerMbti.trim().toUpperCase(),
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* ❤️🤖 로봇 + 하트 UI */}
      <View style={styles.imageWrapper}>
        <Image source={require('../assets/images/robot.png')} style={styles.robot} />
        <Image source={require('../assets/images/heart.png')} style={styles.heartKo} />
        <Image source={require('../assets/images/heartBlue.png')} style={styles.heartEn} />
      </View>

      {/* 🔙 Back only */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#934F28" />
        </TouchableOpacity>
      </View>

      {/* 입력 및 버튼 그룹 */}
      <View style={styles.buttonGroup}>
        <TextInput
          style={styles.inputBox}
          placeholder="상대방 MBTI 입력"
          value={partnerMbti}
          onChangeText={setPartnerMbti}
          autoCapitalize="characters"
        />
        <TextInput
          style={styles.inputBox}
          placeholder="본인 MBTI 입력"
          value={yourMbti}
          onChangeText={setYourMbti}
          autoCapitalize="characters"
        />

        <TouchableOpacity
          style={[styles.menuButton, !isInputValid && styles.disabled]} // Disable if either MBTI is invalid
          disabled={!isInputValid}
          onPress={handleAnalyzePress}
        >
          <Text style={styles.menuText}>궁합 분석</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuButton, !isMbtiValid(partnerMbti) && styles.disabled]} // Disable if invalid partner MBTI
          disabled={!isMbtiValid(partnerMbti)}
          onPress={handlePartnerDetailPress}
        >
          <Text style={styles.menuText}>상대방 MBTI 분석</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCEFE4',
    paddingTop: 60,
    paddingHorizontal: 20,
    position: 'relative',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonGroup: {
    width: '100%',
    gap: 15,
  },
  inputBox: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#934F28',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  menuButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    elevation: 3,
  },
  disabled: {
    backgroundColor: '#eee',
    opacity: 0.6,
  },
  menuText: {
    color: '#934F28',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  robot: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: -15,
  },
  heartKo: {
    position: 'absolute',
    top: 20,
    left: 120,
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  heartEn: {
    position: 'absolute',
    top: 60,
    left: 160,
    width: 85,
    height: 85,
    resizeMode: 'contain',
  },
});
