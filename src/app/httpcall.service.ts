import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpcallService {

  private apiUrl="/user";
  constructor(private http:HttpClient) { 

  }
  getAllUser(){
    return this.http.get(this.apiUrl+"/getAllUser");
  }

  getUserById(id:number){
      return this.http.get(this.apiUrl+"/getUserById/"+id);
  }

  deleteUserById(id:number){
    return this.http.delete(this.apiUrl+"/deleteUserById/"+id,{responseType:'text'});
  }

  saveUser(user:any){
    console.log("save api")
    return this.http.post(this.apiUrl+"/register",user,{responseType:'text'});
  }

  updateUser(id:number,user:any){
    console.log("updating.....")
    return this.http.put(this.apiUrl+"/updateUser/"+id,user,{responseType:'text'});
  }

  loginUser(user:any){
    return this.http.post(this.apiUrl+"/login",user,{responseType:'text'})
  }
  pagination(num:number,pagesize:number){
    return this.http.get<any>(this.apiUrl+"/get-page/"+num+"/"+pagesize);
  }
  getSortedStudents(pageNumber: number, pageSize: number, attrname: string){
    return this.http.get<any>(this.apiUrl+"/get-page-sorted/"+pageNumber+"/"+pageSize+"/"+attrname);
  }

}
