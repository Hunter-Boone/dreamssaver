export interface Tag {
  id: string;
  name: string;
}

export interface TagWithCount extends Tag {
  count: number;
}

// Re-export all types for easy importing
export * from './dream';
export * from './user';
export * from './ai';
