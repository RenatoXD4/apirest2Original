import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from
  '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  id: any

  // url api
  apiURL = "http://localhost:3000/";


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }


  constructor(private http: HttpClient) { }
  // construir los metodos de la api
  getUsuarios(): Observable<any> {
    return this.http.get(this.apiURL + "users/").pipe(
      retry(3)
    )
  }

  getUsuario(id: any): Observable<any> {
    return this.http.get(this.apiURL + "users/"+id).pipe(
      retry(3)
    )
  }

  getPosts(): Observable<any> {
    return this.http.get(this.apiURL + 'posts/').pipe(
      retry(3)
    );
  }

  updatePost(id: any, post: any): Observable<any> {
    return this.http.put(this.apiURL + 'posts/' + id, post, this.httpOptions).
      pipe(retry(3));
  }

  deletePost(id: any):Observable<any>{
    return this.http.delete(this.apiURL+'posts/'+id,this.httpOptions);
  }
   
  getPost(id: any):Observable<any>{ 
    return this.http.get(this.apiURL+'posts/'+id).pipe( retry(3) ); }


  createPost(post: any):Observable<any>{ 
      return this.http.post(this.apiURL+'posts',post,this.httpOptions) .pipe( retry(3) ); }


}



