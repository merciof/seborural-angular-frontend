import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { url } from '../config_url';

@Component({
  selector: 'app-show-books-by-student',
  templateUrl: './show-books-by-student.component.html',
  styleUrls: ['./show-books-by-student.component.css']
})
export class ShowBooksByStudentComponent implements OnInit {

  student;
  livros;
  url;
  studentName;

  constructor(private http:HttpClient, public router: Router) {
    this.url = url;
   }

  ngOnInit() {

    if (!localStorage.getItem('username')) {
      this.router.navigate(['newHomePage']);
    }     


    this.studentName = localStorage.getItem('username');

    let usernameLocal = localStorage.getItem('username');

    let headers = new HttpHeaders();

    headers = headers.set('Authorization', localStorage.getItem('access_token'));

    this.http.post<any>(this.url + '/api/student/getStudentByUsername', {
      username: usernameLocal
    }, { headers: headers}).subscribe(
      response => {
        this.student = response.id
        console.log(this.student)

        this.http.get<any>(this.url + '/api/book/listBooksByStudentId/' + this.student, { headers: headers }).subscribe(
          response => { this.livros = response;

                      }
        );

      }
    ); 

  }

  bookDetails(livroId) {
    this.router.navigate(['ownBookDetails'], { state: { example: livroId } });
  }

}