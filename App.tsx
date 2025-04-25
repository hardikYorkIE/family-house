import React, {useState, useMemo, useCallback} from 'react';
import {Place, places} from './src/data/places'; // assuming you moved the JSON to data.ts
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PlaceView} from './src/component/PlaceView';

function findHighActivityPaths(places: Place[], traps_count: number): string[] {
  const placeMap = new Map<string, Place>();
  places.forEach(place => placeMap.set(place.id, place));

  const highActivityPlaces = places.filter(
    place => place.traps_count >= traps_count,
  );

  const buildPath = (place: Place): string => {
    const path: string[] = [];
    let currentPlace: Place | undefined = place;
    while (currentPlace) {
      path.unshift(`${currentPlace.name} [traps: ${currentPlace.traps_count}]`);
      currentPlace = currentPlace.parent_place
        ? placeMap.get(currentPlace.parent_place)
        : undefined;
    }
    return path.join(' , ');
  };

  return highActivityPlaces.map(buildPath);
}

export default function App() {
  const [activeTab, setActiveTabState] = useState<number | null>(null);
  const setActiveTab = useCallback((tab: number | null) => {
    setActiveTabState(tab);
  }, []);

  const rootPlace = places.find(p => p.parent_place === null);

  if (!rootPlace) return null;

  const paths = useMemo(() => {
    try {
      return findHighActivityPaths(places, 3);
    } catch (error) {
      console.error('Error finding high activity paths:', error);
      return [];
    }
  }, [places]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.questionView}>
        <TouchableOpacity
          style={[styles.btn, activeTab === 1 && styles.activeTab]}
          onPress={() => setActiveTab(1)}>
          <Text
            style={[styles.question, activeTab === 1 && styles.activeQuestion]}>
            Question 1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, activeTab === 2 && styles.activeTab]}
          onPress={() => setActiveTab(2)}>
          <Text
            style={[styles.question, activeTab === 2 && styles.activeQuestion]}>
            Question 2
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 1 && (
        <View style={styles.subContainer}>
          <PlaceView place={rootPlace} places={places} />
        </View>
      )}
      {activeTab === 2 && (
        <View style={styles.subContainer}>
          <Text style={styles.header}>High Trap Activity Paths</Text>
          <FlatList
            data={paths}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => <Text style={styles.path}> • {item}</Text>}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  subContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  questionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btn: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    borderColor: '#808080',
  },
  activeTab: {
    backgroundColor: '#808080',
  },
  question: {
    fontSize: 16,
    color: '#808080',
  },
  activeQuestion: {
    color: '#fff',
  },
  path: {
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
});
