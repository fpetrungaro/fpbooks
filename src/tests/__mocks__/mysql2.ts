console.log("Mocking mysql2");

const mockInsert = jest.fn().mockResolvedValue([{ affectedRows: 1 }]); // Mock result for insert
const mockSelect = jest.fn().mockResolvedValue([{ id: 1, title: 'Test Book', author: 'Test Author' }]);

// Mocking the methods for the client used by Drizzle ORM
const mockClient = {
  query: jest.fn(), // For queries
  execute: mockInsert, // For execute after insert
  insert: jest.fn().mockReturnValue({
    values: jest.fn().mockReturnValue({
      execute: mockInsert, // Execute insert mock
    }),
  }),
  select: jest.fn().mockReturnValue({
    execute: mockSelect, // Execute select mock
  }),
  release: jest.fn(), // Pool client release
};

const mockPool = {
  getConnection: jest.fn().mockResolvedValue(mockClient), // Get connection returns the mock client
};

export default {
  createPool: jest.fn(() => mockPool), // Mock `createPool` to return our mock pool
};



