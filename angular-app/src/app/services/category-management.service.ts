import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryManagementService {
  private serverUrl = environment.categoryURL;

  constructor(private http: HttpClient) {}

  getCategorys(dataTablesParameters) {
    debugger;
    return this.http
      .post(this.serverUrl, dataTablesParameters)
      .pipe(catchError((err) => throwError(err)));
  }

  addCategory(name: string) {
    return this.http
      .post(`${this.serverUrl}/add`, { name })
      .pipe(catchError((err) => throwError(err)));
  }

  updateCategory(id: number, name: string) {
    return this.http
      .put(`${this.serverUrl}/update`, { id, name })
      .pipe(catchError((err) => throwError(err)));
  }

  deleteCategory(id: number) {
    return this.http
      .delete(`${this.serverUrl}/delete/${id}`)
      .pipe(catchError((err) => throwError(err)));
  }
}
