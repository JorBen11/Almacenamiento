import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, fetchPokemonDetails } from '../features/data/dataActions';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Modal, Button, Image } from 'react-native';

const DataDisplay = () => {
  const dispatch = useDispatch();
  const { items, loading, error, pokemon } = useSelector((state) => state.data);

  // Estado para el modal y el item seleccionado
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // Función para manejar la apertura del modal con el item seleccionado
  const openModal = async (item) => {
    dispatch(fetchPokemonDetails(item.url))
    setModalVisible(true);
  };

  const capitalCase = (str = '') => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (loading) return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
  if (error) return <Text style={styles.error}>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>POKEMONES</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => openModal(item)}>
            <Text style={styles.itemTitle}>{capitalCase(item.name)}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal para mostrar detalles del item seleccionado */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalles del Pokemon</Text>
            {pokemon && (
              <>
                <View style={styles.modalHeader}>
                  <Image
                    source={{ uri: pokemon.sprites.front_default }}
                    style={styles.pokemonImage}
                  />
                  <Text style={styles.pokemonName}>{pokemon.name}</Text>
                </View>

                <View style={styles.detailCard}>
                  <Text style={styles.detailTitle}>Experiencia base</Text>
                  <Text style={styles.modalText}>{pokemon.base_experience}</Text>
                </View>

                <View style={styles.detailCard}>
                  <Text style={styles.detailTitle}>Habilidades</Text>
                  {pokemon.abilities.map((ability, index) => (
                    <Text key={index} style={styles.modalText}>- {capitalCase(ability.ability.name)}</Text>
                  ))}
                </View>
              </>
            )}
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute', // Para que esté encima del contenido
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
    justifyContent: 'center', // Centrado vertical
    alignItems: 'center', // Centrado horizontal
    zIndex: 9999, // Asegura que esté encima de todo
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Fondo gris claro
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'blue',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2, // Sombra para Android
  },
  itemTitle: {
    fontSize: 16,
    color: '#333',
  },
  error: {
    color: 'red',
    fontSize: 18,
  },
  // Estilos del modal
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  
  // Nuevo estilo para imagen y nombre del Pokémon
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },

  // Nuevo estilo para las tarjetas de detalle
  detailCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
});

export default DataDisplay;
