// places.ts

export interface Place {
  id: string;
  object_type: string;
  name: string;
  parent_place: string | null; // id of parent
  traps_count: number;
}

export const places: Place[] = [
  {
    id: 'house-001',
    object_type: 'place',
    name: 'Family House',
    parent_place: null,
    traps_count: 0,
  },
  {
    id: 'floor-001',
    object_type: 'place',
    name: 'First Floor',
    parent_place: 'house-001',
    traps_count: 0,
  },
  {
    id: 'floor-002',
    object_type: 'place',
    name: 'Second Floor',
    parent_place: 'house-001',
    traps_count: 0,
  },
  {
    id: 'kitchen-001',
    object_type: 'place',
    name: 'Kitchen',
    parent_place: 'floor-001',
    traps_count: 4,
  },
  {
    id: 'pantry-001',
    object_type: 'place',
    name: 'Pantry',
    parent_place: 'kitchen-001',
    traps_count: 2,
  },
  {
    id: 'living-room-001',
    object_type: 'place',
    name: 'Living Room',
    parent_place: 'floor-001',
    traps_count: 0,
  },
  {
    id: 'bathroom-001',
    object_type: 'place',
    name: 'First Floor Bathroom',
    parent_place: 'floor-001',
    traps_count: 1,
  },
  {
    id: 'guest-bedroom-001',
    object_type: 'place',
    name: 'Guest Bedroom',
    parent_place: 'floor-002',
    traps_count: 0,
  },
  {
    id: 'main-bedroom-001',
    object_type: 'place',
    name: 'Main Bedroom',
    parent_place: 'floor-002',
    traps_count: 0,
  },
  {
    id: 'bathroom-002',
    object_type: 'place',
    name: 'Second Floor Bathroom',
    parent_place: 'floor-002',
    traps_count: 2,
  },
  {
    id: 'bathroom-003',
    object_type: 'place',
    name: 'Main Bedroom Bathroom',
    parent_place: 'main-bedroom-001',
    traps_count: 3,
  },
];
