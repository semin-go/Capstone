import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CompatibilityResultPage() {
  const router = useRouter();
  const { your, partner } = useLocalSearchParams();

  const score = 74;
  const description =
    '둘은 매력적인 상반된 조합이지만,\n갈등회피와 감정 표현 방식에서 충돌이 생길 수 있어요';

  return (
    <View style={styles.container}>
      {/* 🔙 뒤로가기 버튼 */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <MaterialIcons name="arrow-back-ios" size={24} color="#934F28" />
      </TouchableOpacity>

      {/* 🤖 로봇 & 하트 자리는 비워둠 */}
      <View style={styles.imagePlaceholder} />

      {/* 💯 궁합 점수 */}
      <View style={styles.scoreBox}>
        <Text style={styles.scoreText}>궁합 점수: {score}</Text>
      </View>

      {/* ❤️ 결과 카드 */}
      <View style={styles.resultCard}>
        <View style={styles.row}>
          <View style={styles.mbtiBlock}>
            <Text style={styles.mbti}>{your}</Text>
            <Text style={styles.label}>사용자</Text>
          </View>

          <Text style={styles.heart}>❤️</Text>

          <View style={styles.mbtiBlock}>
            <Text style={styles.mbti}>{partner}</Text>
            <Text style={styles.label}>상대</Text>
          </View>
        </View>

        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCEFE4',
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  imagePlaceholder: {
    height: 120,
    marginBottom: 30,
  },
  scoreBox: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 20,
    elevation: 3,
  },
  scoreText: {
    color: '#934F28',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  mbtiBlock: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  mbti: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#934F28',
  },
  label: {
    fontSize: 14,
    color: '#934F28',
    marginTop: 4,
  },
  heart: {
    fontSize: 24,
  },
  description: {
    color: '#934F28',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
});
