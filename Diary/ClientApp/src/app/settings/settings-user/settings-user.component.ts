import { Component, Inject } from '@angular/core'
import { UserService } from '../../service/user.service';
import { IUser } from '../../models/user.model';


@Component({
  selector: 'app-settings-user',
  templateUrl: './settings-user.component.html',
  styleUrls: ['./settings-user.component.scss']
})

export class SettingsUserComponent {

  selectedIcon : File | undefined;
  selectedIconUrl: FileReader | undefined | string;

  selectedFont : File | undefined;
  selectedFontUrl: FileReader | undefined | string;

  constructor(private userService: UserService) { }
  
  user: IUser | undefined;
  ngOnInit(): void {
    this.getUser();
  }

  onIconSelected(event : any) {
    
    this.selectedIcon = <File>event.target.files[0];
    var reader  = new FileReader();

    reader.onload = (event: any) => {
      this.selectedIconUrl = event.target.result;
    };

    reader.readAsDataURL(this.selectedIcon);
  }
  onFontSelected(event : any) {
    
    this.selectedFont = <File>event.target.files[0];
    var reader  = new FileReader();

    reader.onload = (event: any) => {
      this.selectedFontUrl = event.target.result;
    };

    reader.readAsDataURL(this.selectedFont);
  }

  putUser() {
    if (this.user != undefined) {
      const formData = new FormData();

      formData.append('id', this.user.id);
      formData.append('name', this.user.name);
      formData.append('about', this.user.about);
      formData.append('gender', this.user.gender);

      if(this.selectedFont != undefined) {
        formData.append('font', this.selectedFont);
      }
      if(this.selectedIcon != undefined) {
        formData.append('icon', this.selectedIcon);
      }
  
      this.userService.putUser(formData).subscribe((() => {
        this.getUser();
      }));
    }
  }
  getUser() {
    let user = JSON.parse(localStorage.getItem("user")!);

    if(user) {
      this.userService.getUser(user.id).subscribe((hero) => {
        this.user = hero[0];
        console.log(hero[0])
      });
    }
  }
  public createImgPath = (serverPath: string) => this.userService.createImgPath(serverPath);
}
