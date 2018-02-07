/**
 * Created by Mohammad on 8/4/2017.
 */
import {Injectable} from "@angular/core";
@Injectable()
export class UserService {
  private _name: string;
  private _email: string = "Mohamad.Sabori@yahoo.com";
  private _password: string = "12345%AmLo";
  private _age: number;

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    console.log('Set name=' + value);
    this._name = value;
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    console.log('Set age=' + value);
    this._age = value;
  }

  constructor() {
    this._name = 'John Connor';
    this._age = 31;

  }

}
