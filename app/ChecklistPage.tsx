import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

// Checklist items for the page
const checklistItems = [
  '답장이 느릴 때 불안해하지 않기',
  '지난친 고백 충동 조절하기',
  '무의미한 메시지를 자주 보내지 않기',
  '연락 두절이나 고의적 무시로 밀당하지않기',
  '답장이 없다고 서운해하지 않기',
  '상대의 말에 귀 기울이기',
  '상대의 감정 표현을 억지로 끌어내지 않기',
  '가벼운 표현에 과민 반응하지 않기',
  '과한 애정 표현보다 진심을 담기',
  '데이트 비용 계산에 너무 예민해지지않기',
  '자신의 감정에 솔직하되 강요하지 않기',
  "확실하지않은데 '우리 무슨사이야' 묻기",
  '과한 선물이니 기대 만들지않기',
  '관심을 확인받으려 시험하지 않기',
  '친한건 진심으로, 자주 표현하기',
  '상대방의 개인 시간을 존중하기',
  '감정이 격해질 때는 잠시 멈추기',
  '서운함을 쌓이지 않게 그때그때 솔직히 말하기',
];

export default function ChecklistPage() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [input, setInput] = useState('');
  const [focusAnim] = useState(new Animated.Value(0));
  const [checked, setChecked] = useState<boolean[]>(checklistItems.map(() => false));

  const handleFocus = () => {
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    if (input === '') {
      Animated.timing(focusAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
  };

  const toggleCheck = (index: number) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setChecked(updated);
  };

  const placeholderTranslate = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -18],
  });

  const placeholderScale = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  return (
    <View style={styles.container}>
      {/* 🔙 Back & Home */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#934F28" />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => router.replace('/MainPage')}>
          <MaterialIcons name="home" size={24} color="#934F28" style={styles.homeIcon} />
        </TouchableOpacity> */}
      </View>

      {/* 📅 Date Picker */}
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)}>
        <MaterialIcons name="calendar-today" size={20} color="#934F28" />
        <Text style={styles.dateText}>
          {date.getFullYear()}-{(date.getMonth()+1).toString().padStart(2, '0')}-{date.getDate().toString().padStart(2, '0')}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            if (event.type === 'set' && selectedDate) {
              setDate(selectedDate);
            }
            // Close the picker after selection
            setTimeout(() => setShowPicker(false), 100);
          }}
        />
      )}

      {/* ✅ Checklist */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.checklistContainer}>
        {checklistItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.itemRow}
            onPress={() => toggleCheck(index)}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={checked[index] ? 'check-circle' : 'radio-button-unchecked'}
              size={20}
              color="#934F28"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 📝 Input */}
      <View style={styles.inputBox}>
        <Animated.Text
          style={[
            styles.animatedPlaceholder,
            {
              transform: [
                { translateY: placeholderTranslate },
                { scale: placeholderScale },
              ],
            },
          ]}
        >
          How was today?
        </Animated.Text>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={styles.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <TouchableOpacity>
          <MaterialIcons name="arrow-drop-down" size={26} color="#934F28" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCECDC',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  checklistContainer: {
    flex: 1,
    paddingBottom: 20,
    marginTop: 16,
    marginBottom: 50,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  homeIcon: {
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 10,
  },
  dateButton: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAD4C0',
    padding: 10,
    borderRadius: 16,
    alignSelf: 'flex-start',
    gap: 8,
  },
  dateText: {
    color: '#934F28',
    fontSize: 14,
    fontWeight: '600',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemText: {
    color: '#934F28',
    fontSize: 14,
    flexShrink: 1,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#934F28',
    padding: 0,
  },
  animatedPlaceholder: {
    position: 'absolute',
    left: 24,
    color: '#934F28',
    fontSize: 14,
    zIndex: 1,
  },
});
