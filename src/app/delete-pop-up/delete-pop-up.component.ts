import { Component,Inject} from '@angular/core';
import { HttpcallService } from '../httpcall.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-delete-pop-up',
  standalone: false,
  templateUrl: './delete-pop-up.component.html',
  styleUrl: './delete-pop-up.component.css'
})
export class DeletePopUpComponent {

  constructor(private myservice: HttpcallService,
    private dialogRef: MatDialogRef<DeletePopUpComponent>, 
    @Inject(MAT_DIALOG_DATA) public sid:number){
  }
  deleteStudent() { 
    if (confirm("Are you sure you want to delete this item?")) {  
      this.myservice.deleteUserById(this.sid).subscribe({
        next: (response) => {
          console.log('Student deleted successfully:', response);
          this.dialogRef.close(true); 
        },
        error: (err) => {
          console.error('Error deleting student:', err);
        }
      });
    }

  }
}
