import {TasksResponseInterface} from '../interfaces/tasks-response.interface';
import { TaskStatusEnum } from '../enums/task-status.enum';
import { TechStackEnum } from '../enums/task-stacks.enum';

export const TASKS_RESPONSE_MOCK: TasksResponseInterface = {
  count: 5,
  tasks: [
    {
      id: '1',
      title: 'Создать главную страницу',
      description: 'Разработать главную страницу сайта с адаптивной версткой и подключением Angular.',
      status: TaskStatusEnum.IN_PROGRESS,
      stacks: [TechStackEnum.ANGULAR, TechStackEnum.TYPESCRIPT, TechStackEnum.HTML, TechStackEnum.CSS],
      collaborators: [
        { name: 'Иван Иванов', imageUrl: 'https://i.pravatar.cc/150?img=1' },
        { name: 'Мария Петрова', imageUrl: 'https://i.pravatar.cc/150?img=2' }
      ],
      date_create: new Date('2026-02-01T10:00:00'),
      date_last_seen: new Date('2026-02-09T18:30:00')
    },
    {
      id: '2',
      title: 'API для авторизации',
      description: 'Создать REST API для регистрации и авторизации пользователей с JWT.',
      status: TaskStatusEnum.TODO,
      stacks: [TechStackEnum.NODEJS, TechStackEnum.GO, TechStackEnum.JAVASCRIPT],
      collaborators: [
        { name: 'Алексей Смирнов', imageUrl: 'https://i.pravatar.cc/150?img=3' }
      ],
      date_create: new Date('2026-02-03T14:00:00'),
      date_last_seen: new Date('2026-02-03T14:00:00')
    },
    {
      id: '3',
      title: 'Прототип мобильного приложения',
      description: 'Сделать прототип iOS приложения в Swift для демонстрации инвесторам.',
      status: TaskStatusEnum.DESIGN,
      stacks: [TechStackEnum.SWIFT],
      collaborators: [
        { name: 'Екатерина Лебедева', imageUrl: 'https://i.pravatar.cc/150?img=4' }
      ],
      date_create: new Date('2026-01-28T09:00:00'),
      date_last_seen: new Date('2026-02-05T12:20:00')
    },
    {
      id: '4',
      title: 'Настроить CI/CD',
      description: 'Настроить автоматическую сборку и деплой проекта на AWS с помощью GitHub Actions.',
      status: TaskStatusEnum.PLANNED,
      stacks: [TechStackEnum.GO],
      collaborators: [
        { name: 'Дмитрий Кузнецов', imageUrl: 'https://i.pravatar.cc/150?img=5' }
      ],
      date_create: new Date('2026-02-05T11:00:00'),
      date_last_seen: new Date('2026-02-05T11:00:00')
    },
    {
      id: '5',
      title: 'Написать документацию',
      description: 'Создать документацию для разработчиков и пользователей, включая API и инструкции по деплою.',
      status: TaskStatusEnum.WAITING,
      stacks: [TechStackEnum.JAVASCRIPT, TechStackEnum.TYPESCRIPT],
      collaborators: [
        { name: 'Анна Крылова', imageUrl: 'https://i.pravatar.cc/150?img=6' },
        { name: 'Игорь Волков', imageUrl: 'https://i.pravatar.cc/150?img=7' }
      ],
      date_create: new Date('2026-02-02T15:30:00'),
      date_last_seen: new Date('2026-02-06T09:45:00')
    }
  ],
  prev: 'asd',
  next: 'asd'
}
