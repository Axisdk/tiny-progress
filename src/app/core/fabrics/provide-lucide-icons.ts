import {ModuleWithProviders} from '@angular/core';
import {
  Brain,
  FolderCode,
  Home,
  Info,
  ListTodo,
  LucideAngularModule,
  MessageCircle,
  Rocket,
  Settings,
  User,
} from 'lucide-angular';

export function ProvideLucideIcons(): ModuleWithProviders<LucideAngularModule> {
  const icons = {Home, User, Settings, Info, Brain, ListTodo, Rocket, FolderCode, MessageCircle};

  return LucideAngularModule.pick(icons);
}
