import { ModuleWithProviders } from '@angular/core';
import {
  Brain,
  FolderCode,
  Home,
  Info,
  ListTodo,
  LucideAngularModule,
  Rocket,
  Settings,
  User,
} from 'lucide-angular';

export function ProvideLucideIcons(): ModuleWithProviders<LucideAngularModule> {
  const icons = { Home, User, Settings, Info, Brain, ListTodo, Rocket, FolderCode };

  return LucideAngularModule.pick(icons);
}
