import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IOption} from "../../models/common.model";
import {AppStateService} from "../../services/app-state.service";
import {ReplaySubject, takeUntil} from "rxjs";
import {PAGE_SIZE} from "../../models/general-values.model";

@Component({
  selector: 'app-regulators',
  templateUrl: './regulators.component.html',
  styleUrls: ['./regulators.component.scss']
})
export class RegulatorsComponent implements OnInit, OnDestroy {
  @Input() regulatorData: any[];
  @Input() selectedOption: IOption;
  filteredRegulatorData: any[];
  paginatedRegulatorData: any;
  regulatorCurrentPage = 0;
  pageSize = PAGE_SIZE - 2;
  allKeys: any;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private appStateService: AppStateService) {
  }

  ngOnInit(): void {
    this.filteredRegulatorData = [...this.regulatorData];
    this.setRegulatorKeys();
    this.setRegulatorPaginateData();
    this.subscribeToStateChanges();
  }

  subscribeToStateChanges() {
    this.appStateService.getDropdownOption().pipe(takeUntil(this.destroyed$))
      .subscribe(({dropdownStr, countrySelected}) => {
      if (countrySelected) {
        this.filterRegulator(dropdownStr);
      }
    });

    this.appStateService.getReset().pipe(takeUntil(this.destroyed$)).subscribe(isReset => {
      this.reset();
    });
  }

  setRegulatorKeys() {
    this.allKeys = (Object.keys(this.regulatorData[0])).filter(
      keyItem => keyItem !== 'Entity' && keyItem !== 'Short Name' && keyItem !== 'Entity Url'
      && keyItem !== 'Foreign Name' && keyItem !== 'Twitter'
    );
  }

  filterRegulator(currentSearchByKeyVal: string) {
    const key = this.selectedOption.code;
    this.filteredRegulatorData = this.regulatorData.filter((regulator: any) => {
      return regulator[key]?.toLowerCase()?.includes(currentSearchByKeyVal.toLowerCase().trim());
    //  return regulator[key]?.toLowerCase()?.indexOf(currentSearchByKeyVal.toLowerCase()) == 0;
    });
    this.setRegulatorPaginateData();
  }

  setRegulatorPaginateData() {
    const startPoint = this.regulatorCurrentPage * this.pageSize;
    const endPoint = startPoint + this.pageSize;
    this.paginatedRegulatorData = [...this.filteredRegulatorData].slice(startPoint, endPoint);
  }

  regulatorPaginate(event: any) {
    this.regulatorCurrentPage = event.page;
    this.setRegulatorPaginateData();
  }

  reset() {
    this.filteredRegulatorData = [...this.regulatorData];
    this.setRegulatorPaginateData();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
