export type RunningPlan = {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Легкий' | 'Средний' | 'Сложный';
  details: string;
  color: string;
};

export const runningPlans: RunningPlan[] = [
  {
    id: '1',
    title: 'Начинающий',
    description: '5-недельный план для новичков',
    duration: '5',
    level: 'Легкий',
    details: 'Этот план поможет вам начать бегать с нуля. Тренировки 3 раза в неделю.',
    color: '#fff'
  },
  {
    id: '2',
    title: 'Средний уровень',
    description: '8-недельный план для улучшения результатов',
    duration: '8',
    level: 'Средний',
    details: 'Для тех, кто уже бегает и хочет улучшить свои показатели.',
    color: '#yellow'
  },
  {
    id: '3',
    title: 'Продвинутый',
    description: '12-недельный план для подготовки к марафону',
    duration: '12',
    level: 'Сложный',
    details: 'Полноценная подготовка к полумарафону или марафону.',
    color: '#orange'
  },
];