import {ModuleWithProviders} from '@angular/core';
import {
  Brain,
  CircleAlert,
  CircleCheck,
  CirclePlus,
  Eye,
  EyeOff,
  FolderCode,
  Globe,
  Home,
  Info,
  ListTodo,
  LockKeyhole,
  LogOut,
  LucideAngularModule,
  Mail,
  MessageCircle,
  MoveRight,
  Rocket,
  Search,
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
    MoveRight,
    CirclePlus,
    Search,
    CircleCheck,
    CircleAlert,
    LogOut
  };

  return LucideAngularModule.pick(icons);
}
