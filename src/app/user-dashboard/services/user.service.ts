import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core"
import {Observable, of} from "rxjs";
import {User} from "src/app/common/models/user.model";
import {OrderBy} from "../types/order.type";
import {SortBy} from "../types/sort.type";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly usersBasePath = 'https://kaspar-json-server.herokuapp.com/users';

  constructor(private httpClient: HttpClient) {}

  getUsers(
    start: number = 0,
    end: number = 9,
    sort?: SortBy,
    order?: OrderBy,
    search?: string
  ): Observable<User[] | HttpErrorResponse> {
    return this.httpClient.get<User[]>(this.usersBasePath, {
      params: {
        '_sort': sort,
        '_order': order,
        '_start': start,
        '_end': end,
        'q': search || ''
      }
    });
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(this.usersBasePath + '/' + id);
  }

  deleteManyUsers(ids: number[]) {
    // Unfortunately json-server currently does not support patch deletion.

    return of(true);
  }
}