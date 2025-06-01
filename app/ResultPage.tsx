import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Linking,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Restaurant = {
  id: string;
  name: string;
  category: string;
  distance: string;
  recommendedMenu: string[];
};

export default function ResultPage() {
  const router = useRouter();
  const { foodType, distance } = useLocalSearchParams();

  if (!foodType || !distance) {
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back-ios" size={22} color="#934F28" />
          </TouchableOpacity>
          <Text style={styles.title}>맛집 추천</Text>
        </View>
        <Text style={styles.emptyText}>❌ 필수 정보가 누락되어 결과를 표시할 수 없습니다.</Text>
      </View>
    );
  }

  const safeFoodType = (foodType as string).toLowerCase().trim();
  const maxDistance = Number(distance);

  const recommendedRestaurants: Restaurant[] = [
    { id: '1', name: '수육국밥 충대점', category: '한식', distance: '250M', recommendedMenu: ['수육국밥', '내장탕'] },
    { id: '2', name: '김가네 충북대점', category: '분식', distance: '400M', recommendedMenu: ['떡볶이', '김밥'] },
    { id: '3', name: '도쿄라멘', category: '일식', distance: '520M', recommendedMenu: ['돈코츠라멘', '쇼유라멘'] },
    { id: '4', name: '피자스쿨 충북대', category: '양식', distance: '630M', recommendedMenu: ['페퍼로니피자', '불고기피자'] },
    { id: '5', name: '쭈꾸미나라', category: '해물', distance: '800M', recommendedMenu: ['쭈꾸미볶음', '해물찜'] },
    { id: '6', name: '마포갈매기 충대', category: '고기구이', distance: '950M', recommendedMenu: ['갈매기살', '삼겹살'] },
    { id: '7', name: '이삭토스트 충북대점', category: '브런치', distance: '300M', recommendedMenu: ['햄치즈토스트', '베이컨토스트'] },
    { id: '8', name: '고봉민김밥인', category: '분식', distance: '450M', recommendedMenu: ['참치김밥', '치즈김밥'] },
    { id: '9', name: '보통의 국수집', category: '한식', distance: '350M', recommendedMenu: ['잔치국수', '비빔국수'] },
    { id: '10', name: '햇살왕만두', category: '분식', distance: '500M', recommendedMenu: ['고기만두', '김치만두'] },
    { id: '11', name: '월미당', category: '아시아음식', distance: '600M', recommendedMenu: ['쌀국수', '분짜'] },
    { id: '12', name: '멘야마츠리', category: '일식', distance: '700M', recommendedMenu: ['미소라멘', '츠케멘'] },
    { id: '13', name: '퍼스트네팔 청주', category: '아시아음식', distance: '750M', recommendedMenu: ['탄두리치킨', '커리'] },
    { id: '14', name: '장군집 청주', category: '한식', distance: '800M', recommendedMenu: ['청국장', '된장찌개'] },
    { id: '15', name: '피자웨이브 충북대', category: '양식', distance: '850M', recommendedMenu: ['콤비네이션피자', '치즈피자'] },
    { id: '16', name: '보당해장국 청주', category: '한식', distance: '900M', recommendedMenu: ['해장국', '감자탕'] },
    { id: '17', name: '칼로리스 청주', category: '양식', distance: '950M', recommendedMenu: ['샐러드파스타', '스테이크'] },
    { id: '18', name: '우주식탁 청주', category: '한식', distance: '1000M', recommendedMenu: ['제육볶음', '비빔밥'] },
    { id: '19', name: '미송 충북대', category: '한식', distance: '1050M', recommendedMenu: ['갈비탕', '육개장'] },
    { id: '20', name: '마실 청주', category: '한식', distance: '1100M', recommendedMenu: ['뚝배기불고기', '된장찌개'] },
  ];

  const filteredRestaurants = recommendedRestaurants.filter((item) => {
    const category = item.category.toLowerCase().trim();
    const dist = parseInt(item.distance.replace('M', ''));
    return category.includes(safeFoodType) && !isNaN(dist) && dist <= maxDistance;
  });

  const handleMap = (placeName: string) => {
    const encoded = encodeURIComponent(placeName);
    const url = `https://map.naver.com/v5/search/${encoded}`;
    Linking.openURL(url);
  };

  const renderItem: ListRenderItem<Restaurant> = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.name}>{item.name}</Text>
        <TouchableOpacity onPress={() => handleMap(item.name)}>
          <MaterialIcons name="map" size={28} color="#934F28" />
        </TouchableOpacity>
      </View>
      <Text style={styles.details}>🍴 {item.category}</Text>
      <Text style={styles.details}>📏 {item.distance}</Text>
      <Text style={styles.details}>🍽 추천메뉴: {item.recommendedMenu.join(', ')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={22} color="#934F28" />
        </TouchableOpacity>
        <Text style={styles.title}>"{foodType}" 맛집 추천</Text>
      </View>

      {filteredRestaurants.length > 0 ? (
        <FlatList
          data={filteredRestaurants}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.emptyText}>😥 조건에 맞는 맛집이 없습니다.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCECDC',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#934F28',
    marginLeft: 10,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 10,
    width: '95%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 1.5,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#934F28',
  },
  details: {
    fontSize: 12.5,
    color: '#934F28',
    marginBottom: 2,
  },
  emptyText: {
    fontSize: 14,
    color: '#934F28',
    textAlign: 'center',
    marginTop: 40,
  },
});
