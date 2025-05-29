import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MainPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
     
      {/* Gear icon for settings */}
      <TouchableOpacity style={styles.gear}>
        <MaterialIcons name="settings" size={26} color="#934F28" />
      </TouchableOpacity>

      {/* Robot and heart images */}
      <View style={styles.imageWrapper}>
        <Image source={require('../assets/images/robot.png')} style={styles.robot} />
        <Image source={require('../assets/images/heart.png')} style={styles.heartKo} />
        <Image source={require('../assets/images/heartBlue.png')} style={styles.heartEn} />
      </View>

      {/* Chat input button */}
      <TouchableOpacity
        style={styles.chatInput}
        onPress={() => router.push('/ChatPage')}
        activeOpacity={0.8}
      >
        <Text style={styles.chatText}>CHAT</Text>
        <MaterialIcons name="arrow-forward-ios" size={20} color="#934F28" />
      </TouchableOpacity>

      {/* Card menu */}
      <View style={styles.menuGrid}>
        <TouchableOpacity style={styles.card} onPress={() => router.push('/ChecklistPage')}>
          <Image source={require('../assets/images/cardHeart.png')} style={styles.cardImage} />
          <Text style={styles.cardText}>Checklist & Calendar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/ImagebasedPage')}>
          <Image source={require('../assets/images/cardChat.png')} style={styles.cardImage} />
          <Text style={styles.cardText}>Image-based chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/TensionGraphPage')}>
          <Image source={require('../assets/images/cardProgress.png')} style={styles.cardImage} />
          <Text style={styles.cardText}>Tension Graph</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/MbtiMatchPage')}>
          <Image source={require('../assets/images/cardMbti.png')} style={styles.cardImage} />
          <Text style={styles.cardText}>MBTI Match</Text>
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
      justifyContent: 'center',  // Center content vertically
      paddingHorizontal: 20,
      paddingTop: 0,
    },
    gear: {
      position: 'absolute',
      top: 50,
      right: 20,
      zIndex: 10,
    },
    imageWrapper: {
      alignItems: 'center',
      marginBottom: 40,
    },
    robot: {
      width: 80,
      height: 80,
      resizeMode: 'contain',
      marginBottom: -15,
    },
    heartKo: {
      position: 'absolute',
      top: 20,
      left: 120,
      width: 90,
      height: 90,
      resizeMode: 'contain',
    },
    heartEn: {
      position: 'absolute',
      top: 60,
      left: 160,
      width: 85,
      height: 85,
      resizeMode: 'contain',
    },
    chatInput: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 30,
      paddingHorizontal: 24,
      paddingVertical: 14,
      marginBottom: 30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
      width: '100%',
    },
    chatText: {
        fontSize: 16,
        color: '#934F28',
        fontWeight: '500',
    },
    menuGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 20,
        width: '100%',
      },
    card: {
        width: '48%',
        backgroundColor: '#FAD4C0',
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
    },
    cardImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    cardText: {
        fontSize: 13,
        color: '#934F28',
        fontWeight: '600',
        textAlign: 'center',
    },
  });
