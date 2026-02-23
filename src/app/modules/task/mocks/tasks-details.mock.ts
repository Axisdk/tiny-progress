import {LanguageEnum} from '../../../core/enums/language.enum';
import {TaskStatusEnum} from '../enums/task-status.enum';
import {TechStackEnum} from '../enums/task-stacks.enum';
import {TaskDetailsInfoInterface} from '../interfaces/task-details-info.interface';
import {TaskPriorityEnum} from '../enums/task-priority.enum';

export const TASKS_DETAILS_MOCK: TaskDetailsInfoInterface[] = [
  {
    id: '1',
    slug: 'cs-platform',
    title: 'CS platform',
    description: 'Игровая платформа для создания лобби и рейтинговой игры в CS2. Альтернатива FACEIT, CYBERSHOKE',
    tags: ['game', 'platform', 'cs2'],
    category: 'gaming',
    language: LanguageEnum.EN,
    progress: 65,
    status: TaskStatusEnum.IN_PROGRESS,
    stacks: [TechStackEnum.ANGULAR, TechStackEnum.TYPESCRIPT, TechStackEnum.HTML, TechStackEnum.CSS],
    collaborators: [
      {name: 'Иван Иванов', imageUrl: 'https://i.pravatar.cc/150?img=1'},
      {name: 'Мария Петрова', imageUrl: 'https://i.pravatar.cc/150?img=2'},
    ],
    date_create: new Date('2026-02-01T10:00:00'),
    date_last_seen: new Date('2026-02-09T18:30:00'),
    assignedTo: [{name: 'Иван Иванов', imageUrl: 'https://i.pravatar.cc/150?img=1'}],
    deadline: new Date('2026-03-01T23:59:00'),
    priority: TaskPriorityEnum.HIGH,
    comments: [
      {
        id: 'c1',
        name: 'Мария Петрова',
        text: 'Начали интеграцию API',
        date: new Date('2026-02-05T12:00:00'),
        is_edited: false
      },
    ],
    attachments: [
      {id: 'a1', title: 'specs.pdf', file_url: 'https://example.com/specs.pdf'},
    ],
    history: [
      {
        id: 'h1',
        title: 'Создана задача',
        description: 'Иван Иванов создал задачу',
        date: new Date('2026-02-02T09:00:00')
      },
      {
        id: 'h2',
        title: 'Добавлен комментарий',
        description: 'Мария Петрова добавила комментарий',
        date: new Date('2026-02-05T12:00:00')
      },
    ],
    analytics: {
      totalUpdates: 5,
      updatesLastWeek: 2,
      activeCollaborators: 2,
      averageResponseTime: 3.5,
      lastActivityDate: new Date('2026-02-09T18:30:00'),
    },
  },
  {
    id: '2',
    slug: 'web-site-for-school',
    title: 'Веб-сайт для школы',
    description: 'Веб-сайт для школы программирования, с возможностью регистрации и просмотра уроков и журнала',
    tags: ['education', 'web', 'school'],
    category: 'education',
    language: LanguageEnum.RU,
    progress: 20,
    status: TaskStatusEnum.TODO,
    stacks: [TechStackEnum.NODEJS, TechStackEnum.GO, TechStackEnum.JAVASCRIPT],
    collaborators: [{name: 'Алексей Смирнов', imageUrl: 'https://i.pravatar.cc/150?img=3'}],
    date_create: new Date('2026-02-03T14:00:00'),
    date_last_seen: new Date('2026-02-03T14:00:00'),
    assignedTo: [{name: 'Алексей Смирнов', imageUrl: 'https://i.pravatar.cc/150?img=3'}],
    deadline: new Date('2026-04-01T23:59:00'),
    priority: TaskPriorityEnum.MEDIUM,
    comments: [],
    attachments: [],
    history: [{
      id: 'h1',
      title: 'Создана задача',
      description: 'Алексей Смирнов создал задачу',
      date: new Date('2026-02-03T14:00:00')
    }],
    analytics: {
      totalUpdates: 1,
      updatesLastWeek: 0,
      activeCollaborators: 1,
      averageResponseTime: 0,
      lastActivityDate: new Date('2026-02-03T14:00:00'),
    },
  },
  {
    id: '3',
    slug: 'vapor-gram',
    title: 'VaporGram',
    description: 'Мобильное приложения для текстового и голосового общения в стиле телеграм + свои фишки',
    tags: ['mobile', 'chat', 'app'],
    category: 'social',
    language: LanguageEnum.EN,
    progress: 45,
    status: TaskStatusEnum.DESIGN,
    stacks: [TechStackEnum.SWIFT],
    collaborators: [{name: 'Екатерина Лебедева', imageUrl: 'https://i.pravatar.cc/150?img=4'}],
    date_create: new Date('2026-01-28T09:00:00'),
    date_last_seen: new Date('2026-02-05T12:20:00'),
    assignedTo: [{name: 'Екатерина Лебедева', imageUrl: 'https://i.pravatar.cc/150?img=4'}],
    deadline: new Date('2026-03-15T23:59:00'),
    priority: TaskPriorityEnum.HIGH,
    comments: [{
      id: 'c1',
      name: 'Екатерина Лебедева',
      text: 'Нужно продумать UX',
      date: new Date('2026-02-01T10:00:00'),
      is_edited: false
    }],
    attachments: [],
    history: [{
      id: 'h1',
      title: 'Создана задача',
      description: 'Екатерина Лебедева создала задачу',
      date: new Date('2026-01-28T09:00:00')
    }],
    analytics: {
      totalUpdates: 3,
      updatesLastWeek: 1,
      activeCollaborators: 1,
      averageResponseTime: 2.5,
      lastActivityDate: new Date('2026-02-05T12:20:00'),
    },
  },
];
