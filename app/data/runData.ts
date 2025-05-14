// Тип для данных пробежки
export type Run = {
  id: string;
  date: string;
  time: string;
  distance: number;
  pace: string;
  duration: string;
  calories: number;
  route: { latitude: number; longitude: number }[];
  weather: {
    temperature: number;
    condition: string;
    humidity: number;
  };
  splits: {
    km: number;
    time: string;
    pace: string;
  }[];
};

// Пример данных пробежки
export const runData: Run = {
  id: '1',
  date: '15 мая 2023',
  time: '08:30',
  distance: 10.5,
  pace: '5:42',
  duration: '59:45',
  calories: 780,
  route: [
    { latitude: 55.751244, longitude: 37.618423 },
    { latitude: 55.752244, longitude: 37.619423 },
    // ... другие точки маршрута
  ],
  weather: {
    temperature: 18,
    condition: 'солнечно',
    humidity: 65
  },
  splits: [
    { km: 1, time: '5:30', pace: '5:30' },
    { km: 2, time: '11:05', pace: '5:35' },
    { km: 2, time: '16:25', pace: '5:20' },
    // ... другие отрезки
  ]
};
