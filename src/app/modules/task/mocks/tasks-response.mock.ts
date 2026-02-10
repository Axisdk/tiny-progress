import {TasksResponseInterface} from '../interfaces/tasks-response.interface';
import { TaskStatusEnum } from '../enums/task-status.enum';
import { TechStackEnum } from '../enums/task-stacks.enum';

export const TASKS_RESPONSE_MOCK: TasksResponseInterface = {
  count: 5,
  tasks: [
    {
      id: '1',
      title: 'CS platform',
      description: 'Игровая платформа для создания лобби и рейтинговой игры в CS2. Альтернатива FACEIT, CYBERSHOKE',
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
      title: 'Веб-сайт для школы',
      description: 'Веб-сайт для школы программирования, с возможностью регистрации и просмотра уроков и журнала',
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
      title: 'VaporGram',
      description: 'Мобильное приложения для текстового и голосового общения в стиле телеграм + свои фишки',
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
      title: 'Event Map',
      description: 'Карта локальных мероприятий с возможностью добавлять события, звать друзей и строить маршруты',
      status: TaskStatusEnum.DONE,
      stacks: [
        TechStackEnum.ANGULAR,
        TechStackEnum.TYPESCRIPT,
        TechStackEnum.CSS
      ],
      collaborators: [
        { name: 'Андрей Козлов', imageUrl: 'https://i.pravatar.cc/150?img=10' },
        { name: 'Анна Соколова', imageUrl: 'https://i.pravatar.cc/150?img=11' }
      ],
      date_create: new Date('2025-12-12T10:00:00'),
      date_last_seen: new Date('2026-01-20T16:40:00')
    },
    {
      id: '5',
      title: 'Neighbor Tasks',
      description: 'Сервис мелких заказов по соседству: помощь, доставка, бытовые услуги',
      status: TaskStatusEnum.IN_PROGRESS,
      stacks: [
        TechStackEnum.NODEJS,
        TechStackEnum.REACT
      ],
      collaborators: [
        { name: 'Олег Миронов', imageUrl: 'https://i.pravatar.cc/150?img=12' }
      ],
      date_create: new Date('2026-01-05T13:20:00'),
      date_last_seen: new Date('2026-02-08T19:10:00')
    },
    {
      id: '6',
      title: 'Focus Buddy',
      description: 'Приложение для концентрации: таймеры, статистика сессий и мягкая мотивация',
      status: TaskStatusEnum.BLOCKED,
      stacks: [
        TechStackEnum.JAVASCRIPT,
        TechStackEnum.HTML
      ],
      collaborators: [
        { name: 'Дарья Волкова', imageUrl: 'https://i.pravatar.cc/150?img=13' }
      ],
      date_create: new Date('2025-11-30T09:30:00'),
      date_last_seen: new Date('2026-01-02T11:00:00')
    },
    {
      id: '7',
      title: 'AutoHub',
      description: 'Маркетплейс автомобилей с фильтрами, сравнением и историей объявлений',
      status: TaskStatusEnum.BACKLOG,
      stacks: [
        TechStackEnum.ANGULAR,
        TechStackEnum.TYPESCRIPT,
        TechStackEnum.GO
      ],
      collaborators: [],
      date_create: new Date('2025-10-18T15:45:00'),
      date_last_seen: new Date('2025-10-18T15:45:00')
    },

  ],
  prev: 'asd',
  next: 'asd'
}
