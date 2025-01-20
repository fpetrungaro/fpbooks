// Mocking Drizzle ORM's db object and methods
console.log("Mocking db")
const mockInsert = jest.fn().mockResolvedValue([{ affectedRows: 1 }]);
const mockSelect = jest.fn().mockResolvedValue([{ id: 1, title: 'Test Book', author: 'Test Author' }]);

export const mockDb = {
  insert: jest.fn().mockReturnValue({
    values: jest.fn().mockReturnValue({
      execute: mockInsert
    })
  }),
  select: jest.fn().mockReturnValue({
    execute: mockSelect
  }),
  where: jest.fn().mockReturnValue({
    execute: mockSelect
  }),
};
