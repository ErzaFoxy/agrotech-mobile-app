
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'; // якщо використовуєш
import { styles } from './AuthPromptModal.styles'; // окремо
import { formAuthUA as ua } from '../../translations';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onRegister: () => void;
  onLogin: () => void;
}

export const AuthPromptModal: React.FC<Props> = ({
  isVisible,
  onClose,
  onRegister,
  onLogin
}) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{ua.pleaseRegister}</Text>

        <TouchableOpacity style={styles.registerButton} onPress={onRegister}>
          <Text style={styles.registerText}>{ua.registerBtn}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
          <Text style={styles.loginText}>{ua.loginBtn}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};