import { Component } from '@angular/core';
import { HttpcallService } from '../httpcall.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePopUpComponent } from '../update-pop-up/update-pop-up.component';
import { DeletePopUpComponent } from '../delete-pop-up/delete-pop-up.component';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  stdlist:any=[{}]
  constructor(private matDialog: MatDialog, private call: HttpcallService) {
    this.pagination(this.currentPage,this.attrname
      
    );
  }
  attrname: string = 'id'
  students: any[] = [];
  currentPage: number= 1;
  totalPages: number = 0;
  pageSize: number = 2; // Number of rows per page
  totalPagesArray: number[] = []; // Array to store page numbers
 
 
  pagination(pageNumber: number, attrname: string): void {
    this.call.getSortedStudents(pageNumber, this.pageSize, attrname).subscribe({
      next: response => {

        console.log("Sorted Students API Response:", response);
        this.students = response.content;
        this.currentPage = response.pageable.pageNumber + 1;
        this.totalPages = response.totalPages;
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      },
      error: err => {
        console.error("Error fetching sorted students:", err);
      }
    });
  }
  
  onSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement; // Explicitly cast event target
    if (target) {
      this.pagination(this.currentPage, target.value);
    }
  }
  
  getAllStudent() {
    this.call.getAllUser().subscribe( rs=>{console.log(rs)
      this.stdlist=rs
    });
  }
  updateStudent(student:any){
    let id=student.sid
    this.call.updateUser(student.sid,student).subscribe(
      rs=>{
        console.log(rs);
      }
    )
  }
 
  updateDialog(student: any) {
    this.matDialog.open(UpdatePopUpComponent, {
      width: '350px',
      data: student,
    });
  }
  
  deleteDialog(id: Number) {
    this.matDialog.open(DeletePopUpComponent, {
      width: '350px',
      data: id,
    });
  }
}
