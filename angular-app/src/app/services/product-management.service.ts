import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductManagementService {
  private serverUrl = environment.productURL;

  constructor(private http: HttpClient) {}

  getProducts(dataTablesParameters) {
    return this.http
      .post(this.serverUrl, dataTablesParameters)
      .pipe(catchError((err) => throwError(err)));
  }

  addProduct(name: string, categoryId: number) {
    return this.http
      .post(`${this.serverUrl}/add`, { name, categoryId })
      .pipe(catchError((err) => throwError(err)));
  }

  updateProduct(id: number, name: string, categoryId: number) {
    return this.http
      .put(`${this.serverUrl}/update`, { id, name, categoryId })
      .pipe(catchError((err) => throwError(err)));
  }

  deleteProduct(id: number) {
    return this.http
      .delete(`${this.serverUrl}/delete/${id}`)
      .pipe(catchError((err) => throwError(err)));
  }
}
