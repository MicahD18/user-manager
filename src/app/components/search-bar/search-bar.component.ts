import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  searchText: string = '';

  allData: any[] = [];

  newData: any[] = []; // after creating user, send new data back to table component

  // TODO: Add API Service here
  constructor(
    public userService: UserService,
    private _bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: any) => {
      this.allData = data.map((item: any) => ({
        ...item,
        isSelected: false,
        isEditing: false,
      }));
    });
  }

  openBottomSheet(): void {
    console.log(this.allData);
    
    this._bottomSheet.open(BottomSheetComponent, {
      data: {
        user: { name: '', email: '', role: 'member' },
        allData: this.allData,
        createUser: true,
      },
    });
  }
}
