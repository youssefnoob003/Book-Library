import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { BookModel } from '../models/book';
import jwt_decode from 'jwt-decode';
import { AuthService } from '../services/auth.service';
import { signUp } from '../models/signup-model';
import { JwtTokenModel } from '../models/JwtTokenModel';
import { HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  Admin = false;
  Username = "";
  Role = "";
  newCat: Category = { Name: "" };
  books: BookModel[] = [];
  categories: string[] = [];
  updateCategories: string[] = [];
  selectedCategories: string[] = [];
  showUpdateForm = false;
  selectedBook: BookModel | null = null;
  newBook: BookModel = { Id: 0, title: "", author: "", categories: [] };    

  error: string = "";

  constructor(private bookService: BookService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllBooks();
    this.getCategories();
    this.InitializeUser();
  }

  ValidateBook() {

    if (this.selectedCategories.length == 0)
    {
      this.error = "Input at least one category for the book."
    }

    var digitPattern = /\d/;
    if (digitPattern.test(this.newBook.author))
    {
      this.error = "Author should be literal.";
    }
    if (digitPattern.test(this.newBook.title))
    {
      this.error = "Title should be literal.";
    }  

    if (this.newBook.author == "")
    {
      this.error = "Please input an Author for the book.";
    }

    if (this.newBook.title == "")
    {
      this.error = "Please input a Title for the book.";
    }

  }

  ValidateCat() {
    if (this.newCat.Name == "")
    {
      this.error = "Please input a Category";
    }

    var digitPattern = /\d/;
    if (digitPattern.test(this.newCat.Name))
    {
      this.error = "Category should be literal.";
    }
  }
  removeCategory(category : string) {
    this.categories.push(category);
    this.selectedCategories.splice(this.selectedCategories.indexOf(category), 1);
  }
  addCategory(category : string) {
    this.selectedCategories.push(category);
    this.categories.splice(this.categories.indexOf(category), 1);
  }
  InitializeUser()
  {
    const token = this.authService.getToken();
    const decodedToken = jwt_decode(token) as JwtTokenModel;
    this.Username = decodedToken["sub"];
    this.Role = decodedToken["Role"];
    this.Admin = decodedToken["Role"] === "admin"; 
  }

  getAllBooks(): void {
    this.bookService.getAllBooks()
      .subscribe(books => this.books = books);
  }

  getCategories(): void {
    this.bookService.getAllCategories()
      .subscribe(categories => this.categories = categories);
  }

  addBook(): void {
    this.error = "";
    this.ValidateBook();
    if (this.error.length == 0)
    {
      this.newBook.categories = this.selectedCategories;
      this.bookService.addBook(this.newBook)
        .subscribe(() => {
          this.getAllBooks(); // Refresh the book list after adding a new book
          this.newBook = { Id: 0, title: '', author: '', categories: [] };
          this.selectedCategories = [];
          this.getCategories();
          // Clear the new book form
        });
    }
  }
  
  signOut()
  {
    localStorage.clear();
    window.location.reload();
  }

  deleteBook(book: BookModel): void {
    this.bookService.Delete(book)
    .subscribe(() => {
      this.getAllBooks();
    });
  }

  catUpdate(book: BookModel) {
    this.updateCategories = this.categories.filter(cat => book.categories.indexOf(cat) == -1);
  }

  updateBook(book: BookModel): void {
    this.bookService.updateBook(book).subscribe(() => {
      this.showUpdateForm = false;
      this.selectedBook = null;
      this.getAllBooks();
    });
  }

  removeCategoryFromBook(book: BookModel, category: string) {
    this.updateCategories.push(category);
    book.categories.splice(book.categories.indexOf(category), 1);
  }

  addCategoryToBook(book: BookModel, category: string) {
    this.updateCategories.splice(this.updateCategories.indexOf(category), 1);
    book.categories.push(category);
  }

  deleteCategory(cat: string) {
    const category: Category = { Name: cat};
    this.bookService.DeleteCat(category)
    .subscribe(() => {
      this.getCategories();
      this.getAllBooks();
    });
  }

  addCategoryToDb(){
    this.error = "";
    this.ValidateCat();
    if (this.error.length == 0)
    {
      this.bookService.AddCat(this.newCat).subscribe(
        () => { 
          this.newCat.Name = "";
          this.getCategories(); 
        }
      );
    }
  }

  cancelUpdate(): void {
    this.showUpdateForm = false;
    this.selectedBook = null;
    this.getAllBooks();
  }

}
