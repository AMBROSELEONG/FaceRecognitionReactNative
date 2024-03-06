import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {
  const [isFaceAuthenticationSupported, setIsFaceAuthenticationSupported] = useState(false);

  const checkFaceAuthenticationSupport = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

    setIsFaceAuthenticationSupported(hasHardware && supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION));
    console.log(isFaceAuthenticationSupported);
  };

  const handleFaceAuthentication = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Unlock your device',
        disableDeviceFallback: true,
        authenticationType: LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
      });

      if (result.success) {
        console.log('Authentication succeeded');
        // Allow access to the app or navigate to the authenticated screen
      } else {
        console.log('Authentication failed');
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Face Recognition Unlock</Text>
      <Button title="Check Face Authentication Support" onPress={checkFaceAuthenticationSupport} />
      {isFaceAuthenticationSupported && <Button title="Unlock with Face Recognition" onPress={handleFaceAuthentication} />}
    </View>
  );
}
