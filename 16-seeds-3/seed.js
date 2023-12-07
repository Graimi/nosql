const seed = {
  dogs: [
    {
      name: 'Max',
      type: 'Labrador Retriever',
      age: 3,
      _petId: 1,
      _owner: 1,
    },
    {
      name: 'Luna',
      type: 'Pastor Alemán',
      age: 2,
      _petId: 2,
      _owner: 2,
    },
    {
      name: 'Rocky',
      type: 'Bulldog Francés',
      age: 5,
      _petId: 3,
      _owner: 1,
    },
    {
      name: 'Bella',
      type: 'Golden Retriever',
      age: 4,
      _petId: 4,
      _owner: 2,
    },
  ],
  owners: [
    {
      name: 'Jaime',
      surname: 'Flores',
      _ownerId: 1,
      _dogs: [1, 3],
    },
    {
      name: 'Cristian',
      surname: 'Castillo',
      _ownerId: 2,
      _dogs: [2, 4],
    },
  ],
};

module.exports = seed;
