import { create } from 'zustand';

interface FurnitureItem {
  id: string;
  type: 'chair' | 'table' | 'sofa';
  position: [number, number, number];
}

interface FurnitureStore {
  furniture: FurnitureItem[];
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
  addFurniture: (item: FurnitureItem) => void;
  updateFurniture: (id: string, position: [number, number, number]) => void;
  removeFurniture: (id: string) => void;
}

export const useFurnitureStore = create<FurnitureStore>((set) => ({
  furniture: [],
  isDragging: false,
  setIsDragging: (isDragging) => set({ isDragging }),
  addFurniture: (item) =>
    set((state) => ({
      furniture: [
        ...state.furniture,
        {
          ...item,
          position: [0, 0, 0] // Start furniture at center of room
        }
      ]
    })),
  updateFurniture: (id, position) =>
    set((state) => ({
      furniture: state.furniture.map((item) =>
        item.id === id ? { ...item, position } : item
      ),
    })),
  removeFurniture: (id) =>
    set((state) => ({
      furniture: state.furniture.filter((item) => item.id !== id),
    })),
}));