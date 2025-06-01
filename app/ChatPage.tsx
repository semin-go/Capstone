import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Message {
  type: 'user' | 'bot';
  text: string;
  imageUri?: string;
}

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleSend = () => {
    if (!input.trim() && !imageUri) return;

    const userMessage: Message = {
      type: 'user',
      text: input,
      imageUri: imageUri || undefined,
    };

    const botMessage: Message = {
      type: 'bot',
      text: '🤖 상대방의 마음을 정확히 알긴 어렵지만, 천천히 대화를 이어가보는 건 어때?',
    };

    setMessages(prev => [botMessage, userMessage, ...prev]);
    setInput('');
    setImageUri(null);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* 배경 하트 */}
      <Image source={require('../assets/images/heartRed.png')} style={styles.heartRed} />
      <Image source={require('../assets/images/heartYellow.png')} style={styles.heartYellow} />
      <Image source={require('../assets/images/heartGreen.png')} style={styles.heartGreen} />

      {/* 상단바 (홈 버튼 제거됨) */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#934F28" />
        </TouchableOpacity>
      </View>

      {/* 채팅 메시지 리스트 */}
      <FlatList
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubbleWrapper,
              item.type === 'user' ? styles.user : styles.bot,
            ]}
          >
            {item.imageUri && (
              <Image source={{ uri: item.imageUri }} style={styles.messageImage} />
            )}
            <Text style={styles.bubbleText}>{item.text}</Text>
          </View>
        )}
        inverted
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 10 }}
      />

      {/* 입력창 */}
      <View style={styles.inputBar}>
        {imageUri ? (
          <TouchableOpacity onPress={pickImage} style={styles.imageThumbContainer}>
            <Image source={{ uri: imageUri }} style={styles.imageThumb} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={pickImage}>
            <MaterialIcons name="image" size={24} color="#934F28" />
          </TouchableOpacity>
        )}

        <TextInput
          placeholder="Write your message"
          placeholderTextColor="#934F28"
          style={styles.input}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <TouchableOpacity onPress={handleSend}>
          <MaterialIcons name="arrow-forward-ios" size={20} color="#934F28" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCECDC',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  heartRed: {
    position: 'absolute',
    top: 80,
    left: 30,
    width: 120,
    height: 120,
    resizeMode: 'contain',
    zIndex: -1,
  },
  heartYellow: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    width: 150,
    height: 150,
    resizeMode: 'contain',
    zIndex: -1,
  },
  heartGreen: {
    position: 'absolute',
    top: '40%',
    right: '5%',
    width: 130,
    height: 130,
    resizeMode: 'contain',
    zIndex: -1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bubbleWrapper: {
    maxWidth: '85%',
    padding: 18,
    borderRadius: 20,
    marginVertical: 6,
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
    fontSize: 14, // 🔽 텍스트 작게 조정
    fontWeight: '500',
    lineHeight: 20,
  },
  messageImage: {
    width: 200,
    height: 120,
    borderRadius: 12,
    marginBottom: 6,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#934F28',
  },
  imageThumbContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
  },
  imageThumb: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
