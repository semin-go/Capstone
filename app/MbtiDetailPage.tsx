import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MbtiDetailPage() {
  const router = useRouter();
  const { partner } = useLocalSearchParams(); // MbtiMatchPage에서 넘어온 상대 MBTI

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 상단 버튼 */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#934F28" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="home" size={24} color="#934F28" />
        </TouchableOpacity>
      </View>

      {/* 하트 자리 비움 */}
      <View style={styles.heartPlaceholder} />

      {/* MBTI 헤더 */}
      <View style={styles.mbtiHeader}>
        <Text style={styles.mbti}>{partner}</Text>
        <Text style={styles.subtitle}>신중하고 현실적인 계획형</Text>
      </View>

      {/* 표현 방식 / 애정 스타일 카드 */}
      <View style={styles.card}>
        <View style={styles.itemRow}>
          <Text style={styles.emoji}>💙</Text>
          <Text style={styles.itemText}>표현 방식{"\n"}감정보다 행동으로 마음을 표현함</Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.emoji}>💚</Text>
          <Text style={styles.itemText}>애정 스타일{"\n"}꾸준하고 성실한 연애를 선호함</Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.emoji}>💗</Text>
          <Text style={styles.itemText}>애정 스타일{"\n"}꾸준하고 성실한 연애를 선호함</Text>
        </View>
      </View>

      {/* 연애 시 주의할 점 카드 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>연애 시 주의할 점</Text>
        <Text style={styles.cardText}>
          감정을 말로 표현하기보다는 책임감 있게{"\n"}행동으로 보이려 해요.{"\n"}
          상대방이 감정적인 교감을 원할 땐 소통의{"\n"}간극이 생길 수 있어요.
        </Text>
      </View>

      {/* 상대가 좋아하는 말/행동 카드 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>상대가 좋아하는 말/행동</Text>
        <Text style={styles.cardText}>
          직접적인 칭찬보다는 신뢰를 표현하는 말에 감동 받아요.{"\n"}
          예: “네가 있어서 든든해” 같은 말에 약해요.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 40,
    backgroundColor: '#FCEFE4',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  heartPlaceholder: {
    height: 100,
    marginBottom: 10,
  },
  mbtiHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mbti: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#934F28',
  },
  subtitle: {
    fontSize: 14,
    color: '#934F28',
    marginTop: 6,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    width: '100%',
    marginBottom: 20,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#934F28',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#934F28',
    lineHeight: 20,
  },
  itemRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  emoji: {
    fontSize: 18,
    marginTop: 2,
  },
  itemText: {
    fontSize: 14,
    color: '#934F28',
    lineHeight: 18,
    flex: 1,
  },
});
