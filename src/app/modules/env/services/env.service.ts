import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  get api(): string {
    return 'http://localhost:8080'
  }

  constructor() {
  }

}
