import React, {useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Place} from '../data/places';

interface PlaceViewProps {
  place: Place;
  places: Place[];
  onBack?: () => void;
}

export const PlaceView: React.FC<PlaceViewProps> = ({
  place,
  places,
  onBack,
}) => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const handleBack = useCallback(() => {
    setSelectedPlace(null);
  }, []);

  const childPlaces = useMemo(
    () => places.filter(p => p.parent_place === place.id),
    [places, place.id],
  );

  const renderPlaceItem = ({item}: {item: Place}) => (
    <TouchableOpacity onPress={() => setSelectedPlace(item)}>
      <Text style={styles.childItem}>
        • {item.name} [traps: {item.traps_count}]
      </Text>
    </TouchableOpacity>
  );

  if (selectedPlace) {
    return (
      <PlaceView place={selectedPlace} places={places} onBack={handleBack} />
    );
  }

  return (
    <View>
      <Text style={styles.header}>
        {place.name} [traps: {place.traps_count}]
      </Text>

      {childPlaces.length > 0 && (
        <>
          <Text style={styles.subheader}>Children:</Text>
          <FlatList
            data={childPlaces}
            keyExtractor={item => item.id}
            renderItem={renderPlaceItem}
          />
        </>
      )}

      {onBack && (
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subheader: {
    fontSize: 16,
    marginBottom: 8,
  },
  childItem: {
    fontSize: 16,
    paddingVertical: 6,
  },
  back: {
    marginTop: 20,
    fontSize: 16,
    color: '#0000FF',
  },
});
