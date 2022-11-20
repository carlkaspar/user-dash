import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core"
import {Observable, of} from "rxjs";
import {User} from "src/app/common/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly usersBasePath = 'http://localhost:3000/users/';

  constructor(private httpClient: HttpClient) {}

  getUsers(start: number = 0, end: number = 9): Observable<User[] | HttpErrorResponse> {
    return this.httpClient.get<User[]>(this.usersBasePath + `?_start=${start}&_end=${end}`);
  }
}