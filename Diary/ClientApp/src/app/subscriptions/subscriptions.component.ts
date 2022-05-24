import { Component } from '@angular/core'
import { SubscriptionService } from '../service/subs.service';
import { ActivatedRoute } from '@angular/router';
import { ISubscriptions } from '../models/subscriptions.model';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})

export class SubscriptionsComponent {

  subs: ISubscriptions[] = []
  uderId: string | undefined = ""
  
  constructor(
    private subService: SubscriptionService,
    private route: ActivatedRoute,
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
      console.log(this.subs)
    });
  }
}
