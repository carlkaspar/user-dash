import {Injectable} from "@angular/core"
import {Observable, of} from "rxjs";
import {User} from "src/app/common/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUsers(): Observable<User[]> {
    return of([
      {
        id: 10001,
        name: "Geraldine Daniel",
        email: "Estelle_Crona@example.org",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        role: "ADMIN"
      },
      {
        id: 10002,
        name: "Hugh Graham",
        email: "Roxanne30@example.com",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        role: "AGENT"
      },
      {
        id: 10003,
        name: "Johnathan Feeney",
        email: "Junius35@example.org",
        avatar: "https://randomuser.me/api/portraits/men/46.jpg",
        role: "ACCOUNT_MANAGER"
      }
    ]);
  }
}