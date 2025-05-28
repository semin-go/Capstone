import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

// 💬 Static messages (API ga ulanadi keyinchalik)
const messages = [
  { type: 'user', text: '이 관계를 계속 유지해야될지 고민이야...' },
  { type: 'bot', text: '관계 유지를 고민중이구나.. 상대와의 관계에 대해 이야기해 줄 수 있어?' },
  { type: 'user', text: '좋아하는 티를 내도 별로 관심이 없어 보여 ㅠㅠ' },
  {
    type: 'bot',
    text:
      '무작정 좋아한다고 표현하기보다 일단 연락은 되고있는 상태니까 상대방에대해 좀 더 알아보는건 어때? 상대방의 마음을 모르는 상태니까 부담이 될 수도 있잖아!',
  },
  {
    type: 'user',
    text:
      '난 좋아하면 바로 표현하는편이라 생각을 못했네.. 카톡해보고 사진 보내줄게 어떤지 한번 봐줘!',
  },
];

export default function ChatPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
        {/* ❤️ Background Hearts */}
        <Image source={require('../assets/images/heartRed.png')} style={styles.heartRed} />
        <Image source={require('../assets/images/heartYellow.png')} style={styles.heartYellow} />
        <Image source={require('../assets/images/heartGreen.png')} style={styles.heartGreen} />

      {/* 🔙 Back & Home */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#934F28" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/MainPage')}>
          <MaterialIcons name="home" size={24} color="#934F28" style={styles.homeIcon} />
        </TouchableOpacity>
      </View>

      {/* 💬 Chat messages */}
      <ScrollView contentContainerStyle={styles.chatWrapper} showsVerticalScrollIndicator={false}>
        {messages.map((msg, idx) => (
          <View
            key={idx}
            style={[styles.bubbleWrapper, msg.type === 'user' ? styles.user : styles.bot]}
          >
            <Text style={styles.bubbleText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* 📝 Input */}
      <View style={styles.inputBar}>
        <TextInput
          placeholder="Write your message"
          placeholderTextColor="#934F28"
          style={styles.input}
        />
        <TouchableOpacity>
          <MaterialIcons name="arrow-forward-ios" size={20} color="#934F28" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCECDC',
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  heartRed: {
    position: 'absolute',
    top: 80,
    left: 30,
    width: 120,
    height: 120,
    resizeMode: 'contain',
    opacity: 1,
    zIndex: -1,
  },
  heartYellow: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    width: 150,
    height: 150,
    resizeMode: 'contain',
    opacity: 1,
    zIndex: -1,
  },
  heartGreen: {
    position: 'absolute',
    top: '40%',
    right: '5%',
    width: 130,
    height: 130,
    resizeMode: 'contain',
    opacity: 1,
    zIndex: -1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  homeIcon: {
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 10,
  },
  chatWrapper: {
    gap: 20,
    paddingBottom: 50,
    marginTop: 0,
  },
  bubbleWrapper: {
    maxWidth: '85%',
    padding: 18,
    borderRadius: 20,
  },
  user: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
  },
  bot: {
    alignSelf: 'flex-start',
    backgroundColor: '#FAD4C0',
  },
  bubbleText: {
    color: '#934F28',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  inputBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
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
  },
});