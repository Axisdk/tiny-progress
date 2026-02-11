import {ModuleWithProviders} from '@angular/core';
import {Home, LucideAngularModule, Settings, User} from 'lucide-angular';

export function ProvideLucideIcons(): ModuleWithProviders<LucideAngularModule> {
  const icons = { Home, User, Settings }

  return LucideAngularModule.pick(icons)
}
