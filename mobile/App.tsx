import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ScrollView, Modal, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

// Components
const WelcomeScreen = ({ onStart }: { onStart: () => void }) => (
  <View style={styles.screen}>
    <View style={styles.crtOverlay} pointerEvents="none" />
    <Image source={require('./assets/logo.png')} style={styles.logo} resizeMode="contain" />
    <Text style={styles.title}>GHOST // OPS</Text>
    <Text style={styles.subtitle}>MOBILE TERMINAL v0.1</Text>
    
    <TouchableOpacity style={styles.buttonMain} onPress={onStart}>
      <Text style={styles.buttonText}>[ INITIALIZE FIELD OP ]</Text>
    </TouchableOpacity>
    <Text style={styles.syslog}>STATUS: WAITING_FOR_OPERATOR</Text>
  </View>
);

import { db } from './lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

const BlueprintViewer = ({ onExit }: { onExit: () => void }) => {
  const [pins, setPins] = useState<{x: number, y: number, id: string}[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPin, setSelectedPin] = useState<{x: number, y: number, id: string} | null>(null);

  const handleTap = async (evt: any) => {
    const { locationX, locationY } = evt.nativeEvent;
    
    // Create new localized pin
    const newPin = { x: locationX, y: locationY, id: Date.now().toString() };
    setPins([...pins, newPin]);

    // Push to Firebase Emulator
    try {
        await addDoc(collection(db, 'EvidenceNodes'), {
            x: locationX, 
            y: locationY,
            type: Math.random() > 0.5 ? 'PHOTO' : 'AUDIO/EVP',
            timestamp: new Date().toISOString()
        });
    } catch (e) {
        console.warn("Firebase Add Error:", e);
    }
  };

  const handlePinPress = (pin: any) => {
    setSelectedPin(pin);
    setModalVisible(true);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ASYLUM WING B</Text>
        <TouchableOpacity onPress={onExit} style={styles.disconnectBtn}>
          <Text style={styles.disconnectTxt}>DISCONNECT</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.instructions}>TAP ANYWHERE TO PIN EVIDENCE</Text>
      
      <ScrollView horizontal contentContainerStyle={{flexGrow: 1}} style={{flex: 1}}>
        <Pressable style={styles.mapContainer} onPress={handleTap}>
          {/* Mock Blueprint Background */}
          <View style={styles.gridOverlay} />
          <View style={styles.roomMock} />
          
          {/* Pins */}
          {pins.map((pin) => (
             <TouchableOpacity 
               key={pin.id} 
               style={[styles.pin, { left: pin.x - 10, top: pin.y - 10 }]}
               onPress={() => handlePinPress(pin)}
             >
               <View style={styles.pinInner} />
             </TouchableOpacity>
          ))}
        </Pressable>
      </ScrollView>

      {/* Pin Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>EVIDENCE NODE: {selectedPin?.id.toString().substring(8)}</Text>
            <Text style={styles.modalText}>LOC: X:{Math.round(selectedPin?.x || 0)} Y:{Math.round(selectedPin?.y || 0)}</Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionBtnTxt}>+ UPLOAD PHOTO</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionBtnTxt}>+ RECORD EVP</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeBtnTxt}>CLOSE_NODE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'map'>('welcome');

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {currentScreen === 'welcome' && <WelcomeScreen onStart={() => setCurrentScreen('map')} />}
      {currentScreen === 'map' && <BlueprintViewer onExit={() => setCurrentScreen('welcome')} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
  },
  screen: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    width: '100%',
  },
  crtOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(57, 255, 20, 0.05)',
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 60,
  },
  title: {
    color: '#39ff14',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 4,
    marginTop: 20,
    fontFamily: 'monospace',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    letterSpacing: 2,
    marginTop: 5,
    fontFamily: 'monospace',
  },
  buttonMain: {
    marginTop: 'auto',
    marginBottom: 40,
    borderColor: '#39ff14',
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: 'rgba(57, 255, 20, 0.1)',
  },
  buttonText: {
    color: '#39ff14',
    fontSize: 16,
    letterSpacing: 2,
    fontFamily: 'monospace',
  },
  syslog: {
    color: 'rgba(57, 255, 20, 0.5)',
    fontSize: 10,
    fontFamily: 'monospace',
    marginBottom: 40,
  },
  header: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(57,255,20,0.3)',
    paddingBottom: 15,
  },
  headerTitle: {
    color: '#39ff14',
    fontFamily: 'monospace',
    fontSize: 16,
    letterSpacing: 2,
  },
  disconnectBtn: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 5,
  },
  disconnectTxt: {
    color: 'red',
    fontSize: 10,
    fontFamily: 'monospace',
  },
  instructions: {
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'monospace',
    fontSize: 10,
    marginVertical: 15,
    letterSpacing: 1,
  },
  mapContainer: {
    width: width * 2, // Scrollable
    height: '95%',
    backgroundColor: '#0a0f0a',
    borderColor: '#1a2f1a',
    borderWidth: 2,
    marginHorizontal: 20,
    position: 'relative',
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2,
  },
  roomMock: {
    position: 'absolute',
    top: 50,
    left: 50,
    width: 300,
    height: 400,
    borderWidth: 2,
    borderColor: '#39ff14',
    borderStyle: 'dashed',
  },
  pin: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'rgba(255,0,0,0.2)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
  pinInner: {
    width: 6,
    height: 6,
    backgroundColor: 'red',
    borderRadius: 3,
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(5,5,5,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#0a0f0a',
    borderColor: '#39ff14',
    borderWidth: 1,
    padding: 20,
  },
  modalTitle: {
    color: '#39ff14',
    fontFamily: 'monospace',
    fontSize: 14,
    borderBottomColor: '#1a2f1a',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
  },
  modalText: {
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'monospace',
    fontSize: 12,
  },
  modalButtons: {
    marginVertical: 20,
    gap: 10,
  },
  actionBtn: {
    borderWidth: 1,
    borderColor: '#1a2f1a',
    padding: 10,
    alignItems: 'center',
  },
  actionBtnTxt: {
    color: 'white',
    fontFamily: 'monospace',
    fontSize: 12,
    letterSpacing: 1,
  },
  closeBtn: {
    alignItems: 'center',
    marginTop: 10,
  },
  closeBtnTxt: {
    color: 'rgba(57,255,20,0.8)',
    fontFamily: 'monospace',
    fontSize: 12,
  }
});
