import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const mbtiData: Record<string, {
  subtitle: string;
  expression: string;
  affection: string;
  caution: string;
  favorites: string;
}> = {
    ISTJ: {
    subtitle: '신중하고 현실적인 계획형',
    expression: '감정보다 행동으로 마음을 표현함',
    affection: '꾸준하고 성실한 연애를 선호함',
    caution: '감정을 말로 표현하기보다는 책임감 있게 행동으로 보이려 해요.',
    favorites: '직접적인 칭찬보다는 신뢰를 표현하는 말에 감동 받아요.\n예: “네가 있어서 든든해”',
  },
  INFP: {
    subtitle: '이상적이고 충실한 중재자',
    expression: '감정 중심으로 진심을 담아 표현함',
    affection: '마음의 깊은 연결을 중시함',
    caution: '현실보다 이상을 추구해 갈등이 생길 수 있어요.',
    favorites: '“네 진심이 느껴져” 같은 진정성 있는 말을 좋아해요.',
  },
  ENFP: {
    subtitle: '열정적이고 창의적인 활동가',
    expression: '풍부한 감정으로 자주 표현함',
    affection: '재미있고 즉흥적인 연애를 즐김',
    caution: '금방 흥미를 잃을 수 있어 관계가 불안정할 수 있어요.',
    favorites: '“너랑 있으면 즐거워!” 같은 말에 큰 힘을 얻어요.',
  },
  ENFJ: {
    subtitle: '따뜻하고 책임감 있는 지도자',
    expression: '상대방의 감정을 잘 살펴 표현함',
    affection: '헌신적이고 희생적인 사랑을 함',
    caution: '자신을 너무 희생하다가 지칠 수 있어요.',
    favorites: '“네 덕분에 마음이 편해졌어” 같은 말에 감동받아요.',
  },
  INFJ: {
    subtitle: '통찰력 있는 조용한 이상주의자',
    expression: '조용하지만 깊이 있는 감정 표현을 함',
    affection: '마음의 일치와 공감이 중요한 스타일',
    caution: '속마음을 쉽게 드러내지 않아 오해를 살 수 있어요.',
    favorites: '“너의 생각이 정말 인상 깊었어” 같은 말에 힘을 얻어요.',
  },
  INTJ: {
    subtitle: '전략적인 사고를 가진 계획자',
    expression: '실용적이고 이성적인 표현을 선호함',
    affection: '논리적이지만 깊이 있는 관계를 선호함',
    caution: '감정 표현에 서툴러 거리감이 생길 수 있어요.',
    favorites: '“너라서 믿을 수 있어” 같은 신뢰의 표현을 좋아해요.',
  },
  ENTJ: {
    subtitle: '리더십 강한 논리적 지휘관',
    expression: '직설적으로 감정을 표현함',
    affection: '목표지향적이고 책임감 있는 관계를 추구함',
    caution: '상대의 감정을 놓칠 수 있어요.',
    favorites: '“네가 있어서 든든해” 같은 말에 힘을 얻어요.',
  },
  INTP: {
    subtitle: '논리적이고 창의적인 사색가',
    expression: '은근한 방식으로 표현함',
    affection: '자유로운 연애를 선호함',
    caution: '감정 표현 부족으로 소통의 단절이 생길 수 있어요.',
    favorites: '“너의 아이디어 정말 좋아” 같은 지적 칭찬에 약해요.',
  },
  ISFP: {
    subtitle: '차분하고 감성적인 예술가',
    expression: '말보다는 행동으로 조용히 표현함',
    affection: '편안하고 조화로운 관계를 원함',
    caution: '자신을 강하게 주장하지 않아 상처받기 쉬움',
    favorites: '“너의 따뜻함이 좋아” 같은 말에 감동받아요.',
  },
  ESFP: {
    subtitle: '사교적이고 에너지 넘치는 연예인',
    expression: '활발하고 유쾌하게 표현함',
    affection: '지루하지 않은 즐거운 연애를 선호함',
    caution: '즉흥적인 선택으로 문제가 생길 수 있어요.',
    favorites: '“너랑 있으면 행복해!” 같은 말에 힘을 얻어요.',
  },
  ESTP: {
    subtitle: '모험을 즐기는 활동가',
    expression: '직접적인 행동으로 표현함',
    affection: '자유롭고 신나는 연애를 선호함',
    caution: '감정적인 깊이를 놓칠 수 있어요.',
    favorites: '“너랑 있으면 설레!” 같은 반응을 좋아해요.',
  },
  ISFJ: {
    subtitle: '따뜻하고 성실한 보호자',
    expression: '상대의 니즈를 잘 살펴 표현함',
    affection: '헌신적이고 조용한 연애를 선호함',
    caution: '스스로를 너무 희생하다가 지칠 수 있어요.',
    favorites: '“항상 고마워” 같은 배려의 말을 좋아해요.',
  },
  ESFJ: {
    subtitle: '친절하고 사교적인 조화자',
    expression: '상대방을 기쁘게 하려 노력하며 표현함',
    affection: '다정하고 배려심 깊은 연애를 선호함',
    caution: '상대의 반응에 민감해 상처받기 쉬움',
    favorites: '“너 덕분에 즐거웠어” 같은 말에 감동받아요.',
  },
  ISTP: {
    subtitle: '조용하고 실용적인 장인',
    expression: '직접적으로 드러내기보단 행동으로 표현함',
    affection: '개인 공간을 존중하는 연애를 선호함',
    caution: '감정 공유가 적어 오해가 생길 수 있어요.',
    favorites: '“네가 해결해줘서 다행이야” 같은 신뢰의 표현을 좋아해요.',
  },
  ENTP: {
    subtitle: '창의적이고 논쟁을 즐기는 발명가',
    expression: '유쾌하게 표현하며 센스를 자랑함',
    affection: '자극적인 연애를 즐김',
    caution: '지루함을 못 견뎌 쉽게 싫증날 수 있어요.',
    favorites: '“너 진짜 재밌어” 같은 반응에 큰 기쁨을 느낌.',
  },
  ESTJ: {
    subtitle: '체계적이고 실용적인 관리자',
    expression: '솔직하고 단도직입적으로 표현함',
    affection: '책임감 있고 현실적인 연애를 추구함',
    caution: '감정에 둔감할 수 있어요.',
    favorites: '“너처럼 믿음직한 사람 처음이야” 같은 말을 좋아해요.',
  },
  // Your MBTI data (same as original)
};

export default function MbtiDetailPage() {
  const router = useRouter();
  const { partner } = useLocalSearchParams();
  const mbtiKey = String(partner).toUpperCase();
  const mbti = mbtiData[mbtiKey];

  if (!mbti) {
    // If MBTI value is invalid, return nothing
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        {/* 🔙 Back Button */}
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#934F28" />
        </TouchableOpacity>
        {/* 🏠 Home Button at top-right */}
        <TouchableOpacity onPress={() => router.replace('/MainPage')} style={styles.homeButton}>
          <MaterialIcons name="home" size={24} color="#934F28" />
        </TouchableOpacity>
      </View>

      <View style={styles.heartPlaceholder} />

      <View style={styles.mbtiHeader}>
        <Text style={styles.mbti}>{mbtiKey}</Text>
        <Text style={styles.subtitle}>{mbti.subtitle}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.itemRow}>
          <Text style={styles.emoji}>💙</Text>
          <Text style={styles.itemText}>표현 방식{"\n"}{mbti.expression}</Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.emoji}>💚</Text>
          <Text style={styles.itemText}>애정 스타일{"\n"}{mbti.affection}</Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.emoji}>💗</Text>
          <Text style={styles.itemText}>애정 스타일{"\n"}{mbti.affection}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>연애 시 주의할 점</Text>
        <Text style={styles.cardText}>{mbti.caution}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>상대가 좋아하는 말/행동</Text>
        <Text style={styles.cardText}>{mbti.favorites}</Text>
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
  homeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 10,
  },
});
