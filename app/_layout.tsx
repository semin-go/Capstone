import { Stack } from 'expo-router';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import React from 'react';

export default function Layout() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FCECDC" />
      <Stack
        screenOptions={{
          headerShown: false, // Pages without title bars
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCECDC', // Background color for all pages
  },
});