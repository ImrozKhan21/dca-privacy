import {Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {AppStateService} from "../../services/app-state.service";
import {IUser} from "../../models/common.model";
import {ConfigService} from "../../config.service";
import {isPlatformBrowser} from "@angular/common";
import {WindowRefService} from "../../services/window-ref.service";
import {CinchyService} from "@cinchy-co/angular-sdk";
import {ApiCallsService} from "../../services/api-calls.service";
import {window} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() userDetails: IUser;
  display: boolean;

  constructor(private appStateService: AppStateService, private configService: ConfigService,
              private windowRef: WindowRefService, @Inject(PLATFORM_ID) private platformId: any,
              private cinchyService: CinchyService, private apiService: ApiCallsService) {
  }

  ngOnInit(): void {
    this.userDetails = this.userDetails ? this.userDetails : this.appStateService.userDetails;
  }

  profileClicked() {
    this.display = true;
  }

  goToProfile() {
    if (isPlatformBrowser(this.platformId)) {
      const url = `${this.configService.enviornmentConfig.cinchyRootUrl}/Account/Settings`;
      this.windowRef.nativeWindow.open(url, '_blank');
    }
  }

  signOut() {
    this.cinchyService.logout();
    this.apiService.logOut();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('hub-user-details');
      const url = `${this.configService.enviornmentConfig.cinchyRootUrl}/Account/Logoff`;
      const windowRef = this.windowRef.nativeWindow.open(url, '_blank');
      setTimeout(() => {
        windowRef.close();
        location.reload();
      }, 5000)
    }
  }

}
