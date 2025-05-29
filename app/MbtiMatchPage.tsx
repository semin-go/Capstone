import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
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

  const isInputFilled = yourMbti.trim() !== '' && partnerMbti.trim() !== '';

  // ✅ 궁합 분석 페이지로 이동
  const handleAnalyzePress = () => {
    router.push({
      pathname: '/CompatibilityResultPage',
      params: {
        your: yourMbti.trim().toUpperCase(),
        partner: partnerMbti.trim().toUpperCase(),
      },
    });
  };

  // ✅ 상대방 MBTI 분석 페이지로 이동
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
      {/* 🔙 Back & Home */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#934F28" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="home" size={24} color="#934F28" />
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

        {/* 궁합 분석 */}
        <TouchableOpacity
          style={[styles.menuButton, !isInputFilled && styles.disabled]}
          disabled={!isInputFilled}
          onPress={handleAnalyzePress}
        >
          <Text style={styles.menuText}>궁합 분석</Text>
        </TouchableOpacity>

        {/* 상대방 MBTI 분석 */}
        <TouchableOpacity
          style={[styles.menuButton, !partnerMbti.trim() && styles.disabled]}
          disabled={!partnerMbti.trim()}
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
    justifyContent: 'space-between',
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
});
