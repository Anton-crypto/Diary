import { Component, Inject, ViewChild, AfterViewInit } from '@angular/core'
import { UserService } from '../../service/user.service';
import { VerificationService } from 'src/app/service/verification.service';
import { IUser } from '../../models/user.model';
import { ImageCroppedEvent, ImageCropperComponent, LoadedImage } from 'ngx-image-cropper';
import { ISwap } from 'src/app/models/swapPassword.model';

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
  selectedFontUrlCrop: FileReader | undefined | string;

  imageChangedEvent: any = '';
  imageChangedEventFont: any = '';

  croppedImage: any;
  croppedImageFont: any;

  isCheckCrop : boolean = false
  isCheckCropFont: boolean = false

  isCheckVisibleCrop: boolean = false
  isCheckVisibleCropFont: boolean = false

  constructor(
    private userService: UserService,
    private verificationService: VerificationService
  ) { }
  
  user: IUser | undefined;

  @ViewChild(ImageCropperComponent)
  viewChild: ImageCropperComponent |any

  passwordOld : string = ""
  passwordNew : string = ""
  passwordNewCopy : string = ""

  swap : ISwap = {
    email: "",
    oldPassword: "",
    newPassword: "",
  }

  ngOnInit(): void {
    this.getUser();
  }

  ngAfterViewInit() {
    console.log(this.viewChild)
  }
  dataChangeHandler(data : any) {
    this.isCheckCrop = false;
    this.croppedImage = this.blobToFile(this.dataURItoBlob(data.croppedImage),"file." + this.dataURItoBlob(data.croppedImage).type.split('/')[1])
    this.selectedIconUrlCrop = data.croppedImage

    this.isCheckVisibleCrop = true
  }  
  dataChangeHandlerFont(data : any) {
    this.isCheckCropFont = false;
    this.croppedImageFont = this.blobToFile(this.dataURItoBlob(data.croppedImage),"file." + this.dataURItoBlob(data.croppedImage).type.split('/')[1])
    this. selectedFontUrlCrop = data.croppedImage

    this.isCheckVisibleCropFont = true
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
    
    this.imageChangedEventFont = event
    this.selectedFont = <File>event.target.files[0];
    var reader  = new FileReader();

    reader.onload = (event: any) => {
      this.selectedFontUrl = event.target.result;
      this.isCheckCropFont = true;
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
        formData.append('font', this.croppedImageFont);
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
  deleteFont() {
    
  }
  getUser() {
    let user = this.userService.getUserFromLocalStorge();

    if(user) {
      this.userService.getUser(user.id).subscribe({
        next: (user) => {
          this.user = user;
          this.userService.setUserFromLocalStorge(user);
        }
      });
    }
  }
  swapPassword () {
    if(this.passwordNewCopy == this.swap.newPassword && this.swap.newPassword != this.swap.oldPassword) {
      this.swap.email = this.user?.email!;
      this.verificationService.swap(this.swap).subscribe(() => {}); 
    }
  }

  public createImgPath = (serverPath: string) => this.userService.createImgPath(serverPath);
  private dataURItoBlob(dataURI : string) {
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
  private blobToFile = (theBlob: Blob, fileName:string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
  }
}
