import { Component } from '@angular/core';
import { ServicioService } from '../services/servicio.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user:any;
  users:any;
  posts:any;
  post:any={
    id:null,
    title:"",
    body:"",
    userId: null
  };
  
  compareWith:any;

  constructor(private api: ServicioService) {}

  obtenerUsers(){
    this.api.getUsuarios().subscribe((data)=>{
      this.users = data;
  })}

  obtenerPosts(){
    this.api.getPosts().subscribe(data =>{
      this.posts = data
    })
  }

  obtenerUser(id: any){
    this.api.getUsuario(id).subscribe((data)=>{
      this.user = data;
  })}

  obtenerPost(post: any){
    this.post.userId = this.user.id
    this.api.getPost(post).subscribe(data =>{
      this.posts = data
      this.obtenerPosts();
    })
  }

  eliminarPost(post: any){
    this.api.deletePost(post.id).subscribe((data)=>{
      this.obtenerPosts();
    })
  }

  setPost(post: any){
    this.api.getPost(post.id).subscribe((data)=>{
      this.post = data;
  })}


  updatePost(id: any, post: any){
    this.api.updatePost(this.post.id, this.post).subscribe((data)=>{
      this.obtenerPosts();
  })}

  guardarPost(post: any){
    this.post.userId = this.user.id
      this.api.createPost(this.post).subscribe((success)=>{
        this.obtenerPosts();
        console.log(success);
        },error=>{
        console.log(error);
        })
      
    }
    

  compareWithFn = (o1:any, o2:any) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };
  
  ionViewWillEnter(){
    this.obtenerUsers();
    this.obtenerPosts();
  }
}

