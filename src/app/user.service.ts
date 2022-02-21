import { Injectable } from '@angular/core';
import { child, get, getDatabase, ref, update } from "@angular/fire/database";
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  data: any;
  constructor() { }

  save(user: any) {
    const db = getDatabase();
    update(ref(db, '/users/' + user.uid), {
      name: user.displayName,
      email: user.email
    });
  }

  async getUser(uid: string) : Promise<AppUser> {
    const dbRef = ref(getDatabase());
    this.data = await (await get(child(dbRef, `/users/${uid}`))).val() as AppUser;
    return this.data;
  }
}
