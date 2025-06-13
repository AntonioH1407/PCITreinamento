import React, { useState } from 'react';
import { StyleSheet, Platform, SafeAreaView, StatusBar } from 'react-native';
import FormComponent from '../../components/FormComponent';
import Header from '../../components/HeaderComponent';

const headerTitle = "Biblioteca";
const headerItems = [
    ['Home', 'HomeBiblioteca'],
    ['Lista de Livros', 'livroLista'],
];
const headerColor = '#008000';

const camposOcultos = ['id', 'data_cadastro', 'id_novo', 'foi_atualizado', 'foi_criado'];
const feldsTypes = [{
    "titulo": "text",
    "autor": "picker",
    "categoria": "picker",
    "ano_publicacao": "text",
    "data_cadastro": "hrauto"
}];

const LivroCadastro = ({ navigation }) => {
    return (
    <SafeAreaView style={styles.safeArea}>
        <Header
            title={headerTitle}
            items={headerItems}
            color={headerColor}
            navigation={navigation}
        />
        <FormComponent
            database={'biblioteca.db'}
            tabelas={['Livro']}
            felds={[]}
            feldsTypes={feldsTypes}
            initialData={{}}
            ocultar={camposOcultos}
            labels={{
                titulo: "Título",
                autor: "Autor",
                categoria: "Categoria",
                ano_publicacao: "Ano de Publicação",
        }}
            barraPersonalizada={{
                Livro: 'Cadastro de Livro',
        }}
            abaNavegacao={false}
            labelsInline={{
                Livro: "Registro",
            }}
            TipoSub={"CRIAR"}
            getCampoInfo={[]}
            corApp={'#008000'}
            />
        </SafeAreaView>
    );
};
    
const styles = StyleSheet.create({
    safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight
    : 0,
    },
});

export default LivroCadastro;