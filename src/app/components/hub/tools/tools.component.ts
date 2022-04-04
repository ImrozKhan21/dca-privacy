import {Component, OnInit} from '@angular/core';
import {ApiCallsService} from "../../../services/api-calls.service";
import {ITools} from "../model/hub.model";
import {AppStateService} from "../../../services/app-state.service";
import {ICommunityDetails} from "../../../models/general-values.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {
  tools: ITools[];
  toolsHeaderDetails: ICommunityDetails;

  constructor(private appApiService: ApiCallsService, private appStateService: AppStateService,
              private router: Router) {
  }

  async ngOnInit() {
    const communityDetails = this.appStateService.communityDetails;
    this.toolsHeaderDetails = communityDetails.find(item => item.id === 'tools') as ICommunityDetails;
    this.tools = await this.appApiService.getHubTools().toPromise();
    console.log('ppp this.tools', this.tools);
  }

  goToSelection(item: ITools) {
    this.router.navigate([`${item.toolRoute}`]);
  }

}