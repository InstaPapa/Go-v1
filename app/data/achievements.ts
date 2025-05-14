export type Achievement = {
    id: string;
    title: string;
    description: string;
    icon: 'emoji-events' | 'directions-run' | 'flag' | 'bolt' | 'check-circle' | 'lock';
    color: string;
    earned: boolean;
  };
  
  export const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Новичок',
      description: 'Пройдите первую тренировку',
      icon: 'emoji-events',
      color: '#FFD700',
      earned: true,
    },
    {
      id: '2',
      title: '5 км забег',
      description: 'Пробегите 5 км без остановки',
      icon: 'directions-run',
      color: '#4CAF50',
      earned: true,
    },
    {
      id: '3',
      title: 'Марафонец',
      description: 'Пробегите 42 км за месяц',
      icon: 'flag',
      color: '#F44336',
      earned: false,
    }
  ];