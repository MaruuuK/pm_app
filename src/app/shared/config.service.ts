import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public apiUrl: string =
    'https://final-task-backend-production-e3b5.up.railway.app';
}
