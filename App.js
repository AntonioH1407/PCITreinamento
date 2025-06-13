
import React, { useState } from 'react';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useSync from "./components/Sync"; 
import HomeScreen from './Index';


import HomeTransito from './apps/Transito/HomeTransito';
import VisitacaoCadastro from './apps/Transito/visitacaoCadastro';
import VisitacaoLista from './apps/Transito/visitacaoLista';
import HomeBiblioteca from './apps/Biblioteca/HomeBiblioteca';
import LivroCadastro from './apps/Biblioteca/LivroCadastro';
import LivroLista from './apps/Biblioteca/LivroLista';


const Stack = createStackNavigator();



function BottomBarButton({ title, screen, iconName, activeScreen, setActiveScreen }) {
  const navigation = useNavigation();
  const isActive = activeScreen === screen; 

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        setActiveScreen(screen);
        navigation.navigate(screen);
      }}
    >
      <MaterialCommunityIcons
        name={iconName}
        size={24}
        color={isActive ? '#8B0000' : '#808080'} // Vermelho vinho se ativo, cinza caso contrário
      />
      <Text style={[styles.buttonText, isActive && styles.activeText]}>{title}</Text>
    </TouchableOpacity>
  );
}


export default function App() {
  const [activeScreen, setActiveScreen] = useState('Home'); // Rastreia a tela ativa

  useSync(); // Chama o hook de sincronização

  return (
    <NavigationContainer
      onStateChange={(state) => {
      const currentRoute = state?.routes[state.index].name;
      setActiveScreen(currentRoute);
    }}>
      <View style={{ flex: 1 }}>
        
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        
    
       
        <Stack.Screen name="HomeTransito" component={HomeTransito} />
        <Stack.Screen name="visitacaoCadastro" component={VisitacaoCadastro} />
        <Stack.Screen name="visitacaoLista" component={VisitacaoLista} />
        
        <Stack.Screen name="HomeBiblioteca" component={HomeBiblioteca}/>
        <Stack.Screen name="LivroCadastro" component={LivroCadastro}/>
        <Stack.Screen name="LivroLista" component={LivroLista} />
        
      </Stack.Navigator>
      {/* Troque a condição aqui */}
      {activeScreen !== 'Home' && (
        <View style={styles.bottomBar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <BottomBarButton
            title="Home"
            screen="Home"
            iconName="home"
            activeScreen={activeScreen}
            setActiveScreen={setActiveScreen}
          />
         
          <BottomBarButton
            title="Trânsito"
            screen="HomeTransito"
            iconName="car"
            activeScreen={activeScreen}
            setActiveScreen={setActiveScreen}
          />

          <BottomBarButton
            title="Biblioteca"
            screen="HomeBiblioteca"
            iconName="book"
            activeScreen={activeScreen}
            setActiveScreen={setActiveScreen}
          />


        
          </ScrollView>
        </View>
      )}
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    height: 70,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f8f8f8',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  buttonText: {
    fontSize: 12,
    color: '#808080', 
  },
  activeText: {
    color: '#8B0000', 
  },
});