// app/(tabs)/index.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addCollection, Collection } from '../../store/slices/notesSlice';
import { useRouter } from 'expo-router';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { setCurrentCollection } from '@/store/slices/appState';

const HomeScreen = () => {
  const [collectionName, setCollectionName] = useState('');
  const collections = useSelector((state: RootState) => state.notes.collections);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleCreateCollection = () => {
    if (collectionName.trim() === '') {
      return; // Prevent creating a collection with an empty name
    }

    const newCollection: Collection = {
      id: uuidv4(),
      title: collectionName,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isArchived: false,
      notes: [],
    };

    dispatch(addCollection(newCollection));
    setCollectionName('');
  };

  const openCollection = (id: string) => {
    dispatch(setCurrentCollection(id));
    router.push(`/collection/${id}`)
  }

  const renderCollectionItem = ({ item }: { item: Collection }) => (
    <TouchableOpacity
      style={styles.collectionCard}
      onPress={() => openCollection(item.id)} // Updated route format
    >
      <Text style={styles.collectionTitle}>{item.title}</Text>
      <Text style={styles.collectionSub}>Notes: {item.notes.length}</Text>
      <Text style={styles.collectionId}>ID: {item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.createCollectionContainer}>
        <TextInput
          style={styles.input}
          placeholder="Collection Name..."
          value={collectionName}
          onChangeText={setCollectionName}
        />
        <Button title="CREATE" onPress={handleCreateCollection} />
      </View>
      <Text style={styles.header}>Collections</Text>
      {collections.length === 0 ? (
        <Text style={styles.noCollectionsText}>No collections yet. Create one above.</Text>
      ) : (
        <FlatList
          data={collections}
          keyExtractor={(item) => item.id}
          renderItem={renderCollectionItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 64,
    backgroundColor: '#262728',
  },
  header: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: '600',
    color: '#c6c7c8',
    marginBottom: 16,
  },
  createCollectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderColor: '#a6a7a8',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
    backgroundColor: '#464748',
    color: '#a6a7a8',
  },
  collectionCard: {
    padding: 16,
    backgroundColor: '#515253',
    borderRadius: 4,
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  collectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#c6c7c8',
    width: 'auto',
    flex: 1,
    display: 'flex',
  },
  collectionSub: {
    fontSize: 12,
    color: '#c6c7c8',
    width: 'auto',
    flex: 1,
    display: 'flex',
  },
  collectionId: {
    fontSize: 10,
    color: '#c6c7c8',
    width: 'auto',
    flex: 1,
    display: 'flex',
  },
  noCollectionsText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
    color: '#888',
  },
});

export default HomeScreen;
