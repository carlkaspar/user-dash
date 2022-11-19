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

  getUsers(page: number = 1, limit: number = 10): Observable<User[] | HttpErrorResponse> {
    return this.httpClient.get<User[]>(this.usersBasePath + `?_page=${page}&_limit=${limit}`);
  }
}