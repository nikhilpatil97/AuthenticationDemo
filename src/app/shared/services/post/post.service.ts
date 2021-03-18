import { NotFoundError } from './../../errors/not-found-error';
import { AppError } from './../../errors/app-errors';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { BadInput } from '../../errors/bad-input';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url="https://jsonplaceholder.typicode.com/posts";

  constructor(private _http:HttpClient) { }

  getPosts(){
    return this._http.get(this.url)
    .pipe(catchError((error:Response)=>{
      if(error.status===404)
        return Observable.throw(new NotFoundError());
    }));
  }

  createPost(post){
    return this._http.post(this.url, JSON.stringify(post))
    .pipe(catchError((error:Response)=>{
      if(error.status===404)
        return Observable.throw(new BadInput(error.json()));

      return Observable.throw(new AppError(error.json()));
    }));
  }

  updatePost(post){
    return this._http.patch(this.url + '/' + post.id, JSON.stringify({isRead:true}));
  }

  deletePost(id){
    return this._http.delete(this.url + '/'+ id)
    .pipe(
      catchError((error:Response)=> {
      if (error.status===404){
        return throwError(error);
        //return Observable.throw (new NotFoundError());
      }
      return Observable.throw(new AppError(error));
    }));
  }
}
