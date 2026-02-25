import {ModuleWithProviders} from '@angular/core';
import {
  Brain,
  Eye,
  EyeOff,
  FolderCode,
  Globe,
  Home,
  Info,
  ListTodo,
  LockKeyhole,
  LucideAngularModule,
  Mail,
  MessageCircle,
  MoveRight,
  Rocket,
  Settings,
  Sun,
  User,
  X,
} from 'lucide-angular';

export function ProvideLucideIcons(): ModuleWithProviders<LucideAngularModule> {
  const icons = {
    Home,
    User,
    Settings,
    Info,
    Brain,
    ListTodo,
    Rocket,
    FolderCode,
    MessageCircle,
    Globe,
    Sun,
    X,
    Eye,
    EyeOff,
    Mail,
    LockKeyhole,
    MoveRight
  };

  return LucideAngularModule.pick(icons);
}
