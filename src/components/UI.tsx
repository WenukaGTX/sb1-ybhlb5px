import React from 'react';
import { Plus, Trash2, GripHorizontal } from 'lucide-react';
import { useFurnitureStore } from '../store/furnitureStore';

export function UI() {
  const addFurniture = useFurnitureStore((state) => state.addFurniture);
  const furniture = useFurnitureStore((state) => state.furniture);
  const removeFurniture = useFurnitureStore((state) => state.removeFurniture);

  const handleAddFurniture = (type: 'chair' | 'table' | 'sofa') => {
    addFurniture({
      id: Math.random().toString(36).substr(2, 9),
      type,
      position: [0, 0, 0],
    });
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 z-50">
      <div className="flex flex-col gap-4">
        <div className="text-center mb-2">
          <p className="text-sm text-gray-600">Click and drag furniture to move, hover to rotate</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleAddFurniture('chair')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={16} />
            Add Chair
          </button>
          <button
            onClick={() => handleAddFurniture('table')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={16} />
            Add Table
          </button>
          <button
            onClick={() => handleAddFurniture('sofa')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={16} />
            Add Sofa
          </button>
        </div>
        
        {furniture.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2 bg-gray-50 p-2 rounded-lg">
            {furniture.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg border border-gray-200"
              >
                <GripHorizontal size={14} className="text-gray-400" />
                <span className="capitalize text-gray-700">{item.type}</span>
                <button
                  onClick={() => removeFurniture(item.id)}
                  className="text-red-500 hover:text-red-600 focus:outline-none"
                  aria-label={`Remove ${item.type}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}