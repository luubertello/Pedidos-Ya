import { Injectable } from '@angular/core';
import axios from 'axios';
import { config } from '../config/env';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  async getRestaurants() {
    return (await axios.get(config.urls.getRestaurants)).data;
  }

  async getMenu() {
    return (await axios.get(config.urls.getMenu)).data;
  }

  async getMenuByRestaurant(id: string) {
    return (await axios.get(`${config.urls.getRestaurants}/${id}/menu`)).data;
  }
}
