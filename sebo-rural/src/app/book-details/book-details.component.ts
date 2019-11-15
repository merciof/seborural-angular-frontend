import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { url } from '../config_url';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

	livro;
  studentId;
  student;
  course;
	bookId: number;
  url: string;

  constructor(private http:HttpClient, private router: Router ) { 
  	
    if (this.router.getCurrentNavigation().extras.state) {
      this.bookId = this.router.getCurrentNavigation().extras.state.example;
    } else {
      this.router.navigate(['listBook']);
    }


    

    this.url = url;
  }

  ngOnInit() {

  	let headers = new HttpHeaders();

    headers = headers.set('Authorization', localStorage.getItem('access_token'));

    window.console.log("BookId: " + this.bookId);

    this.http.get(this.url + '/api/book/' + this.bookId , { headers: headers }).subscribe(
      response => {
          
        window.console.log("Livro retornado: " + (this.livro = response));
        
        this.http.get<any>(this.url + '/api/course/' + this.livro.curso['id'] , { headers: headers }).subscribe(
          response => window.console.log(this.course = response)
        );

        this.http.get<any>(this.url + '/api/student/' + this.livro.student['id'] , { headers: headers }).subscribe(
          response => window.console.log(this.student = response)
        );

        }
    );
 
  }

  favoritar(livroId) {

    // let usernameLocal = localStorage.getItem('username');

    // this.http.post<any>(this.url + '/api/student/getStudentByUsername', {
    //   username: usernameLocal
    // }, { headers: headers}).subscribe(
    //   response => {
    //     this.studentId = response.id
    //     console.log(this.studentId)
    //   }
    // );

    // this.http.post<any>(this.url + '/api/studentBook', {
    //   student: studentId,
    //   book: livroId
    // }, { headers: headers}).subscribe(
    //   response => {
    //     window.console.log(response);
    //     alert("livro adicionado aos favoritos");
    //   }
    // );

    alert("Funcionalidade em desenvolvimento.");

  }

  listBook () {

  	//window.console.log(this.bookId);

  }

}
  