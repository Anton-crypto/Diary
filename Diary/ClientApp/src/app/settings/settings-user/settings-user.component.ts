import { Component, Inject, ViewChild, AfterViewInit } from '@angular/core'
import { UserService } from '../../service/user.service';
import { IUser } from '../../models/user.model';
import { ImageCroppedEvent, ImageCropperComponent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-settings-user',
  templateUrl: './settings-user.component.html',
  styleUrls: ['./settings-user.component.scss']
})

export class SettingsUserComponent implements AfterViewInit{

  selectedIcon : File | undefined;
  selectedIconUrl: FileReader | undefined | string;
  selectedIconUrlCrop: FileReader | undefined | string;

  selectedFont : File | undefined;
  selectedFontUrl: FileReader | undefined | string;

  imageChangedEvent: any = '';
  croppedImage: any;

  isCheckCrop : boolean = false

  constructor(private userService: UserService) { }
  
  user: IUser | undefined;

  @ViewChild(ImageCropperComponent)
  viewChild: ImageCropperComponent |any

  ngOnInit(): void {
    this.getUser();
    console.log(this.user)
  }

  ngAfterViewInit() {
    console.log(this.viewChild)
  }
  dataChangeHandler(data : any) {
    this.isCheckCrop = false;
    this.croppedImage = this.blobToFile(this.dataURItoBlob(data.croppedImage),"file." + this.dataURItoBlob(data.croppedImage).type.split('/')[1])
    this.selectedIconUrlCrop = data.croppedImage
    console.log(this.croppedImage)
  }  
  dataURItoBlob(dataURI : string) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;

    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
  }
  public blobToFile = (theBlob: Blob, fileName:string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
  }
  onIconSelected(event : any) {
    
    this.imageChangedEvent = event
    this.selectedIcon = <File>event.target.files[0];
    var reader  = new FileReader();

    reader.onload = (event: any) => {
      this.selectedIconUrl = event.target.result;
      this.isCheckCrop = true;
    };

    reader.readAsDataURL(this.selectedIcon);
  }
  onFontSelected(event : any) {
    
    this.selectedFont = <File>event.target.files[0];
    var reader  = new FileReader();

    reader.onload = (event: any) => {
      this.selectedFontUrl = event.target.result;
      this.user!.font = "";
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
        formData.append('icon', this.croppedImage);
      }
  
      this.userService.putUser(formData).subscribe((() => {
        this.getUser();
        this.selectedFont = undefined;
        this.selectedFontUrl = undefined ;
      }));
    }
  }
  getUser() {
    let user = JSON.parse(localStorage.getItem("user")!);

    if(user) {
      this.userService.getUser(user.id).subscribe((hero) => {
        this.user = hero[0];
        console.log(this.user)
      });
    }
  }

  public createImgPath = (serverPath: string) => this.userService.createImgPath(serverPath);
}
