import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TensionGraphPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>썸 텐션 그래프</Text>
      {/* 그래프 컴포넌트 등 추가 예정 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCECDC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#934F28',
    fontWeight: 'bold',
  },
});
