import {AlertAppearanceType} from '../types/alert-appearance.type';

export interface AlertInterface {
  appearance: AlertAppearanceType
  title: string
  message: string
  autoClose: number
}
