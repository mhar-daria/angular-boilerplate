import { InjectionToken } from '@angular/core'

export interface StorageKeys {}

export const LOCAL_STORAGE_KEY = new InjectionToken<string>('AppStorage')
export const LOCAL_STORAGE_PERSISTENT_KEYS = new InjectionToken<Array<string>>(
  'PersistentKeys',
)
