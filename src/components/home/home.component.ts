import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  jsonMovies: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('../assets/movie-data.csv', {responseType:'text'}).subscribe(
      data => this.extractData(data),
      err => console.log(err)
   );
  }

  extractData(res: any){
    let lines = res.split("\n");

    let result = [];

    let headers = lines[0].split(",");
    console.log(headers);
    for (let i = 1; i < lines.length-1; i++) {

      let obj = {};
      let currentline = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }
    this.jsonMovies = result.slice(1,10);
    console.log(this.jsonMovies[0]);
  }

}
