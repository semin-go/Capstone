
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
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

  // 차트 너비 및 위치 계산용
  const chartWidth = Dimensions.get('window').width - 40;
  const chartHeight = 220;

  // 점 위치 계산 (보정 적용)
  const getDotPosition = (index: number) => {
    const chartLeftPadding = 40; // 좌측 여백 보정
    const chartTopPadding = 20; // 상단 여백 보정

    const x =
      chartLeftPadding +
      ((chartWidth - chartLeftPadding) / (dates.length - 1)) * index;

    const maxTemp = 80;
    const minTemp = 0;
    const y =
      chartTopPadding +
      ((maxTemp - temperatures[index]) / (maxTemp - minTemp)) *
        (chartHeight - chartTopPadding);

    return { x, y };
  };

  const dotPos = getDotPosition(selectedIndex);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 상단 */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#934F28" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="home" size={24} color="#934F28" />
        </TouchableOpacity>
      </View>

      <View style={styles.imagePlaceholder} />

      {/* 썸 온도 출력 */}
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

      {/* 고백 타이밍 버튼 */}
      <TouchableOpacity
        style={styles.confessButton}
        onPress={() => router.push('/ConfessionTimingPage')}
      >
        <Text style={styles.confessText}>고백{'\n'}타이밍</Text>
      </TouchableOpacity>

      <Text style={styles.graphTitle}>썸 텐션</Text>

      {/* 그래프 + 커스텀 동그라미 */}
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
          withDots={false}
          chartConfig={{
            backgroundColor: '#FCEFE4',
            backgroundGradientFrom: '#FCEFE4',
            backgroundGradientTo: '#FCEFE4',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(147, 79, 40, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(147, 79, 40, ${opacity})`,
          }}
          bezier
          style={{
            borderRadius: 16,
          }}
        />
        {/* 선택된 점만 동그라미로 표시 */}
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

      {/* 날짜 선택 (3개씩 2줄) */}
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
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  imagePlaceholder: {
    height: 120,
    marginBottom: 20,
  },
  tempBox: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 30,
    marginBottom: 20,
    elevation: 2,
  },
  tempText: {
    color: '#934F28',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  confessButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginBottom: 30,
    elevation: 2,
  },
  confessText: {
    color: '#934F28',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 22,
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
