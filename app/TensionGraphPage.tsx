import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function TensionGraphPage() {
  const router = useRouter();

  const temperatures = [65, 40, 20, 25, 35, 55];
  const dates = ['05/20', '05/21', '05/22', '05/23', '05/24', '05/25'];
  const [selectedIndex, setSelectedIndex] = useState(5);
  const temperature = temperatures[selectedIndex];

  const chartWidth = Dimensions.get('window').width - 40;
  const chartHeight = 220;

  // 좌표 계산
  const getDotPosition = (index: number) => {
    const chartLeftPadding = 45; // Y축 라벨 공간 보정
    const chartTopPadding = 20;
    const maxTemp = 100;
    const minTemp = 0;

    const x =
      chartLeftPadding +
      ((chartWidth - chartLeftPadding - 10) / (dates.length - 1)) * index;

    const y =
      chartTopPadding +
      ((maxTemp - temperatures[index]) / (maxTemp - minTemp)) *
        (chartHeight - chartTopPadding);

    return { x, y };
  };

  const dotPos = getDotPosition(selectedIndex);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 상단 바 */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#934F28" />
        </TouchableOpacity>
      </View>

      {/* 이미지 */}
      <View style={styles.imageWrapper}>
        <Image source={require('../assets/images/robot.png')} style={styles.robot} />
        <Image source={require('../assets/images/heart.png')} style={styles.heartKo} />
        <Image source={require('../assets/images/heartBlue.png')} style={styles.heartEn} />
      </View>

      {/* 썸 온도 */}
      <View style={styles.tempRow}>
        <View style={styles.tempBox}>
          <Text style={styles.tempText}>
            지금 썸 온도: {temperature}도{'\n'}
            {temperature >= 60
              ? '좋은 분위기예요!'
              : temperature >= 40
              ? '좋은 분위기지만 답장이 늦어졌어요'
              : '지금은 다소 냉랭한 분위기예요'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.confessButton}
          onPress={() => router.push('/ConfessionTimingPage')}
        >
          <MaterialIcons name="favorite-border" size={20} color="#934F28" />
          <Text style={styles.confessText}>고백{'\n'}타이밍</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.graphTitle}>썸 텐션</Text>

      {/* 그래프 */}
      <View style={{ position: 'relative' }}>
        <LineChart
          data={{
            labels: dates,
            datasets: [
              {
                data: temperatures,
                color: () => '#934F28',
                strokeWidth: 2,
              },
            ],
          }}
          width={chartWidth}
          height={chartHeight}
          yAxisSuffix="°"
          fromZero={true}
          withDots={false}
          segments={5}
          chartConfig={{
            backgroundColor: '#FCEFE4',
            backgroundGradientFrom: '#FCEFE4',
            backgroundGradientTo: '#FCEFE4',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(147, 79, 40, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(147, 79, 40, ${opacity})`,
          }}
          bezier
          style={{ borderRadius: 16 }}
        />
        {/* 커스텀 동그라미 */}
        <View
          style={{
            position: 'absolute',
            left: dotPos.x - 5,
            top: dotPos.y - 5,
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: '#934F28',
          }}
        />
      </View>

      {/* 날짜 선택 */}
      <View style={styles.dateButtons}>
        {[0, 1].map((row) => (
          <View key={row} style={styles.dateRow}>
            {dates.slice(row * 3, row * 3 + 3).map((date, i) => {
              const index = row * 3 + i;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedIndex(index)}
                  style={[
                    styles.dateButton,
                    selectedIndex === index && styles.dateButtonSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.dateButtonText,
                      selectedIndex === index && styles.dateButtonTextSelected,
                    ]}
                  >
                    {date}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCEFE4',
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: 'center',
    paddingBottom: 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 10,
  },
  imageWrapper: {
    alignItems: 'center',
    height: 120,
    marginBottom: 20,
    justifyContent: 'center',
    position: 'relative',
  },
  robot: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: -10,
  },
  heartKo: {
    position: 'absolute',
    top: 10,
    left: '50%',
    transform: [{ translateX: -60 }],
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  heartEn: {
    position: 'absolute',
    top: 25,
    left: '50%',
    transform: [{ translateX: 20 }],
    width: 55,
    height: 55,
    resizeMode: 'contain',
  },
  tempRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 30,
  },
  tempBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginRight: 10,
    elevation: 2,
  },
  tempText: {
    color: '#934F28',
    fontSize: 14,
    textAlign: 'left',
    lineHeight: 22,
  },
  confessButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    width: 90,
  },
  confessText: {
    color: '#934F28',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 4,
  },
  graphTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#934F28',
    marginBottom: 10,
  },
  dateButtons: {
    marginTop: 10,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
    gap: 8,
  },
  dateButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  dateButtonSelected: {
    backgroundColor: '#934F28',
  },
  dateButtonText: {
    color: '#934F28',
    fontSize: 14,
  },
  dateButtonTextSelected: {
    color: '#fff',
  },
});
