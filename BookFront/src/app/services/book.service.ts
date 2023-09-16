import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookModel } from '../models/book';
import { Category } from '../models/category';
import { signUp } from '../models/signup-model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + "/GetCategories");
  }
  
  private apiUrl = 'https://localhost:44305/api/Book';

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(this.apiUrl + "/GetBooks");
  }

  addBook(book: BookModel): Observable<any> {
    return this.http.post(this.apiUrl + "/AddBook", book);
  }

  addPrefferedCats(user: signUp): Observable<any> {
    return this.http.post(this.apiUrl + "/AddPreferences", user);
  }

  updateBook(book: BookModel): Observable<any> {
    return this.http.post(this.apiUrl + "/updateBook", book);
  }

  Delete(book: BookModel): Observable<any> {
    return this.http.post(this.apiUrl + "/DeleteBook", book);
  }
  
  DeleteCat(cat: Category) {
    return this.http.post(this.apiUrl + "/DelCat", cat);
  }

  AddCat(cat: Category): Observable<any> {
    return this.http.post(this.apiUrl + "/AddCat", cat);
  }
}
