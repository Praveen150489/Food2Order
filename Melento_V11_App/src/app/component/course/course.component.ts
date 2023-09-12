import { Component } from '@angular/core';
import { Course } from 'src/app/models/course';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  arrCourses:Course[]=[]
  course:Course=new Course('');
  constructor(private userService:UserService){
    this.userService.getAllCourses().subscribe(data => {
      this.arrCourses=data
      console.log(this.arrCourses);
    })
  }

  addCourse(t:string){
    console.log(t);
    let u=new Course(t)
    this.userService.addCourse(u).subscribe(data=>{
      this.course=data;
    })
  }
}
