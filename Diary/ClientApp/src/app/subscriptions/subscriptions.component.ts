import { Component } from '@angular/core'
import { SubscriptionService } from '../service/subs.service';
import { ActivatedRoute } from '@angular/router';
import { ISubscriptions } from '../models/subscriptions.model';
import { UserService } from '../service/user.service';
import { IUser } from '../models/user.model';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})

export class SubscriptionsComponent {

  subs: ISubscriptions[] = []
  uderId: string | undefined = ""
  check: boolean =  false

  isSub : boolean = true
  isSubCheckUser : boolean = false
  
  constructor(
    private subService: SubscriptionService,
    private route: ActivatedRoute,
    private userService : UserService,
  ) { }

  ngOnInit(): void {
    this.uderId = this.route.snapshot.paramMap.get('id')?.toString();
    if(this.uderId != undefined) {
      this.getSubs(this.uderId);
    }
  }
  getSubs(id : string) {
    this.subService.getSubsAll(id).subscribe((subs) => {
      this.subs = subs;
      console.log(subs)
      setTimeout(() => {this.check = true;}, 1000)
    });
  }

  deleteSub(sub : ISubscriptions) {
    this.subService.deleteSubs(sub!.id!).subscribe(() =>  {
      this.isSub = false
    });
  }
  addSub() {
    let userSub : IUser = JSON.parse(localStorage.getItem("user")!);
    let sub : ISubscriptions = {
      id : "",
      user : [],
      userSubscriptionID: userSub.id,
      userWriterID : this.uderId!
    }
    console.log(sub)

    this.subService.addSubs(sub).subscribe(() =>  {
      this.isSub = true
    });
  }
  
  public createImgPath = (serverPath: string) => this.userService.createImgPath(serverPath);
}
