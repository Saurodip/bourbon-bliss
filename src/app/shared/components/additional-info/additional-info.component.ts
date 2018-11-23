import { Component, OnInit } from '@angular/core';
import { AdditionalInfo } from '../../shared.model';
import { Observable } from 'rxjs';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss']
})

export class AdditionalInfoComponent implements OnInit {
  public additionalInfo: AdditionalInfo;
  public error: string;

  public additionalInfo$: Observable<AdditionalInfo> = this.sharedService.getAdditionalInformation();

  constructor(private sharedService: SharedService) {
    this.error = '';
  }

  ngOnInit() {
    this.fetchAdditionalInformation();
  }

  private fetchAdditionalInformation() {
    this.sharedService.getAdditionalInformation().subscribe(
      (data) => this.additionalInfo = { ...data },
      (error) => this.error = error
    );
  }
}
