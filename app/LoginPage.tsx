import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LoginPage() {
  const router = useRouter(); // Use expo-router for navigation

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Man' | 'Woman' | null>(null);
  const [chatStyle, setChatStyle] = useState<'T' | 'F' | null>(null);

  const handleLogin = () => {
    if (!username.trim() || !email.trim() || !age.trim() || !gender || !chatStyle) {
      if (Platform.OS === 'web') {
        alert('모든 항목을 입력해주세요');
      } else {
        Alert.alert('입력 누락', '모든 항목을 입력해주세요.');
      }
      return;
    }

    const numericAge = parseInt(age, 10);
    if (isNaN(numericAge) || numericAge < 13 || numericAge > 100) {
      if (Platform.OS === 'web') {
        alert('나이는 13세 이상 100세 이하로 입력해주세요.');
      } else {
        Alert.alert('나이 오류', '나이는 13세 이상 100세 이하로 입력해주세요.');
      }
      return;
    }

    router.replace('/MainPage'); 
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/images/heart.png')} style={styles.logoImage} />
        <Text style={styles.hello}>Hello</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.inputWrapper}>
          <MaterialIcons name="person" size={20} color="#934F28" style={styles.icon} />
          <TextInput
            placeholder="Username"
            placeholderTextColor="#934F28"
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={styles.inputWrapper}>
          <MaterialIcons name="mail" size={20} color="#934F28" style={styles.icon} />
          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#934F28"
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={styles.inputWrapper}>
          <MaterialIcons name="calendar-today" size={20} color="#934F28" style={styles.icon} />
          <TextInput
            placeholder="Age"
            placeholderTextColor="#934F28"
            style={styles.input}
            value={age}
            onChangeText={(text) => {
              const filtered = text.replace(/[^0-9]/g, '');
              setAge(filtered);
            }}
            keyboardType="numeric"
            underlineColorAndroid="transparent"
          />
        </View>

        <Text style={styles.label}>성별을 선택해 주세요</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.optionButton, gender === 'Man' && styles.selectedButton]}
            onPress={() => setGender('Man')}
          >
            <Text style={styles.buttonText}>Man</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, gender === 'Woman' && styles.selectedButton]}
            onPress={() => setGender('Woman')}
          >
            <Text style={styles.buttonText}>Woman</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>대화 스타일을 선택해 주세요</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.optionButton, chatStyle === 'T' && styles.selectedButton]}
            onPress={() => setChatStyle('T')}
          >
            <Text style={styles.buttonText}>T-직설적인 말투</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, chatStyle === 'F' && styles.selectedButton]}
            onPress={() => setChatStyle('F')}
          >
            <Text style={styles.buttonText}>F-부드러운 말투</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCECDC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logoImage: {
    position: 'absolute',
    width: 180,
    height: 180,
    resizeMode: 'contain',
    bottom: 0,
    opacity: 0.8,
  },
  hello: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#934F28',
    zIndex: 1,
  },
  card: {
    width: '100%',
    backgroundColor: '#FAD4C0',
    borderRadius: 20,
    padding: 20,
    marginTop: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    marginBottom: 12,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#934F28',
    borderWidth: 0,
  },
  label: {
    fontSize: 14,
    color: '#934F28',
    textAlign: 'center',
    marginVertical: 6,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#F9B28F',
  },
  buttonText: {
    color: '#934F28',
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#934F28',
    borderRadius: 30,
    paddingVertical: 14,
    marginTop: 12,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});