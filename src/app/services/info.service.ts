import {Injectable} from '@angular/core';
import {User} from "../interface/user";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  users: User[] = [
    {
      id: 1,
      name: 'جميع الوزارات',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: 2,
      name: 'جميع الهيئات',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: 3,
      name: 'الامانات',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: 4,
      name: 'الموردين',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
  ]

  //userAdded event
  userEdited = new Subject<User[]>()

  constructor() {
  }

  //create a new user
  createUser(user: { username: string, details: string }) {
    const newUser = {
      //random id
      id: Math.floor(Math.random() * 1000000),
      name: user.username,
      details: user.details
    }
    this.users.push(newUser)
    this.userEdited.next(this.users.slice())
  }

  //edit a user
  editUser(user: User) {
    const index = this.users.findIndex(u => u.id === user.id)
    this.users[index] = user
    this.userEdited.next(this.users.slice())
  }


  //delete a user
  deleteUser(user: User) {
    const index = this.users.findIndex(u => u.id === user.id)
    this.users.splice(index, 1)
    this.userEdited.next(this.users.slice())
  }


  //get all users
  getUsers() {
    return this.users.slice()
  }


  //get a user by id
  getUser(id: number) {
    return this.users.find(u => u.id === id) || null
  }

  //filter users by name
  filter(name: string | null) {
    if (name && name.trim().length > 0) {
      const filteredUsers = this.users.filter(u => u.name.includes(name))
      this.userEdited.next(filteredUsers)
    } else {
      this.userEdited.next(this.users.slice())
    }
  }
}
