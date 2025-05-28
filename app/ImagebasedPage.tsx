import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Message {
  type: 'user' | 'bot';
  text: string;
  imageUri?: string;
}

export default function ChatPhotoPage() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [initialUploadDone, setInitialUploadDone] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImageUri(result.assets[0].uri);
      if (!initialUploadDone) setInitialUploadDone(true);
    }
  };

  const handleSubmit = () => {
    if (!input.trim() && !imageUri) return;

    const newUserMessage: Message = {
      type: 'user',
      text: input,
      imageUri: imageUri || undefined,
    };

    const botReply: Message = {
      type: 'bot',
      text: '🤖 Thanks for your input! Here is some advice...',
    };

    setMessages(prev => [botReply, newUserMessage, ...prev]);
    setInput('');
    setImageUri(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* 🔙 Back & 🏠 Home */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#934F28" />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => router.replace('/MainPage')}>
          <MaterialIcons name="home" size={24} color="#934F28" />
        </TouchableOpacity> */}
      </View>

      {/* 🖼 Header Images */}
      <View style={styles.imageBox}>
        <Image source={require('../assets/images/robot.png')} style={styles.robot} />
        <Image source={require('../assets/images/heart.png')} style={styles.heartKo} />
        <Image source={require('../assets/images/heartBlue.png')} style={styles.heartEn} />
      </View>

       {/* 📤 Large upload button (only on first visit) */}  
      {!initialUploadDone && (
        <View style={styles.centeredUploadBox}>
          <TouchableOpacity style={styles.bigUploadButton} onPress={pickImage}>
            <MaterialIcons name="image" size={32} color="#934F28" style={{ marginBottom: 8 }} />
            <Text style={styles.bigUploadText}>Upload Chat Image</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 💬 Chat message */}
      {initialUploadDone && (
        <>
          <FlatList
            data={messages}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageBubble,
                  item.type === 'user' ? styles.userBubble : styles.botBubble,
                ]}
              >
                {item.imageUri && (
                  <Image source={{ uri: item.imageUri }} style={styles.messageImage} />
                )}
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
            style={{ flex: 1 }}
            inverted
          />

          {/* 📝 Input bar */}
          <View style={styles.inputBar}>
            {imageUri ? (
              <TouchableOpacity onPress={pickImage} style={styles.imageThumbContainer}>
                <Image source={{ uri: imageUri }} style={styles.imageThumb} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={pickImage}>
                <MaterialIcons name="image" size={26} color="#934F28" />
              </TouchableOpacity>
            )}

            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Type a message..."
              placeholderTextColor="#934F28"
              onSubmitEditing={handleSubmit}
              returnKeyType="send"
            />

            <TouchableOpacity onPress={handleSubmit}>
              <MaterialIcons name="send" size={24} color="#934F28" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCECDC',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  centeredUploadBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigUploadButton: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  bigUploadText: {
    color: '#934F28',
    fontSize: 16,
    fontWeight: '600',
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 20,
    padding: 12,
    marginVertical: 6,
  },
  userBubble: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#FAD4C0',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 14,
    color: '#934F28',
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
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
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
  imageBox: {
    alignItems: 'center',
    marginBottom: 10,
  },
  robot: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: -10,
  },
  heartKo: {
    position: 'absolute',
    top: 0,
    left: 140,
    width: 100,
    height: 100,
    resizeMode: 'contain',
    zIndex: -1,
  },
  heartEn: {
    position: 'absolute',
    top: 60,
    left: 170,
    width: 90,
    height: 90,
    resizeMode: 'contain',
    zIndex: -1,
  },
});