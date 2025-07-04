import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Modal, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header({ title, items = [], color, navigation, showBackButton = true }) {
  const [menuVisible, setMenuVisible] = useState(false);
  
  const handleMenuToggle = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = async() => {
    try {
        const teste = await AsyncStorage.getItem("userGroup");
        await AsyncStorage.removeItem("userGroup");
        setMenuVisible(false);
        console.log('teste', teste);
        
        navigation.navigate('Home');
    } catch (error) {
        console.error("Erro ao sair:", error);
    }
    // Aqui você pode adicionar a função de logout
  };


  return (
    <View style={[styles.header, { backgroundColor: color }]}>
      <View style={styles.topRow}>
        {showBackButton && (
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={28} color="#fff" />
          </Pressable>
        )}
        <Text style={styles.title}>{title}</Text>
        {items.length > 0 && ( // Exibir o menu apenas se `items` não for vazio
          <Pressable onPress={handleMenuToggle} style={styles.menuButton}>
            <MaterialIcons name="menu" size={28} color="#fff" />
          </Pressable>
        )}
      </View>

      <Modal
        visible={menuVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: '#fff' }]}>
          <Pressable style={styles.closeButton} onPress={handleMenuToggle}>
            <MaterialIcons name="close" size={28} color={color} />
          </Pressable>

          <ScrollView contentContainerStyle={styles.menuItems}>
            {items.map((item, index) => (
              <View key={index} style={styles.menuItemContainer}>
                <Pressable
                  onPress={() => {
                    setMenuVisible(false);
                    navigation.navigate(item[1]);
                  }}
                  style={styles.menuItem}
                >
                  <Text style={[styles.menuItemText, { color: color }]}>
                    {item[0]}
                  </Text>
                </Pressable>
                {index < items.length && (
                  <View style={[styles.separator, { backgroundColor: color }]} />
                )}
              </View>
            ))}

            <View style={styles.menuItemContainer}>
              <Pressable onPress={handleLogout} style={styles.menuItem}>
                <Text style={[styles.menuItemText, { color: color }]}>
                  Logout
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 7,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
  },
  menuItems: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemContainer: {
    width: '100%',
    alignItems: 'center',
  },
  menuItem: {
    paddingVertical: 15,
  },
  menuItemText: {
    fontSize: 26,  // Aumentar o tamanho do texto
    fontWeight: 'bold',  // Definir o texto em negrito
  },
  separator: {
    width: '80%',        // Largura da barra
    height: 2,           // Altura da barra fina
    marginVertical: 10,
  },
});