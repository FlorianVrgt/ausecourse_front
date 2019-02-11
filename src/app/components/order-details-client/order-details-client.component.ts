import { Component, OnInit,Inject } from '@angular/core';
import {User} from '../../models/user' ; 
import {UserService} from '../../services/user.service' ;
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  livreur: User;
  nbStars : string; 
}


@Component({
  selector: 'app-order-details-client',
  templateUrl: './order-details-client.component.html',
  styleUrls: ['./order-details-client.component.css']
})
export class OrderDetailsClientComponent implements OnInit {

	private livreur : User ; 
	private listeCourse : string[] ;
	private nbStars : string; 

  constructor(private userService : UserService,
  	private route: ActivatedRoute,
  	private router: Router,
  	public dialog: MatDialog) { }

  getLivreurById(id : string) {
  	this.userService.getUserById(id).subscribe(
      res => {
        this.livreur = res.json() ; 
        this.livreur.stars = Math.round(this.livreur.stars);
      },
      error => {
        console.log(error);      
      }    		
  	);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {livreur: this.livreur, nbStars: this.nbStars}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getLivreurById(this.livreur.id);      
    });
  }  

  ngOnInit() {
  	var livreurId = this.route.snapshot.paramMap.get('livreurId');
  	var listString = this.route.snapshot.paramMap.get('listeCourse');
  	this.listeCourse = listString.split(', ',2);
  	this.getLivreurById(livreurId);
  }

}



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog.html',
})
export class DialogOverviewExampleDialog implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService : UserService) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  makeReview(){
  	this.userService.makeReview(this.data.livreur.id,this.data.nbStars).subscribe(
      res => {
        console.log("review created successfuly !");
      },
      error => {
        console.log(error);      
      }    		
  	);
  }

  ngOnInit() {}

}
