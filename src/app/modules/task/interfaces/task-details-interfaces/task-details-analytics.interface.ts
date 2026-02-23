export interface TaskDetailsAnalyticsInterface {
  totalUpdates: number;          // общее количество обновлений
  updatesLastWeek: number;       // обновлений за последнюю неделю
  activeCollaborators: number;   // количество участников, кто был активен за последний месяц
  averageResponseTime: number;   // среднее время отклика в часах
  lastActivityDate: Date;        // дата последней активности
}
