import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IDropdownClick, ILegislation, IOption, ITag} from "../../../models/common.model";
import {AppStateService} from "../../../services/app-state.service";
import {ReplaySubject, takeUntil} from "rxjs";
import {PAGE_SIZE, SearchByLaw, SearchByRegulator} from "../../../models/general-values.model";

@Component({
  selector: 'app-regulators',
  templateUrl: './regulators.component.html',
  styleUrls: ['./regulators.component.scss']
})
export class RegulatorsComponent implements OnInit, OnDestroy {
  @Input() regulatorData: any[];
  @Input() currentRegulator: string;
  @Input() selectedOption: IOption;
  @Input() tags: ITag[];
  @Output() resetTags: EventEmitter<any> = new EventEmitter<any>();

  filteredRegulatorData: any[];
  childFilteredData: any[];
  paginatedRegulatorData: any;
  regulatorCurrentPage = 0;
  pageSize = PAGE_SIZE - 2;
  allKeys: any;
  childSelectedOption: IOption;
  searchByOptions: IOption[] = SearchByRegulator;
  countryValue: string;
  tagsValue: ITag[];


  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private appStateService: AppStateService) {
  }

  ngOnInit(): void {
    this.regulatorData = this.regulatorData.map((item: any) => ({
      ...item,
      tags: item['Tags'] ? item['Tags'].split(',') : []
    }));
    this.filteredRegulatorData = this.currentRegulator ? [this.regulatorData.find(item => item['Short Name'] === this.currentRegulator)]
      : [...this.regulatorData];
    this.childFilteredData = [...this.regulatorData];
    this.setRegulatorKeys();
    this.setRegulatorPaginateData();
    this.subscribeToStateChanges();
  }

  subscribeToStateChanges() {
    this.appStateService.getSearchEnteredVal().pipe(takeUntil(this.destroyed$)).subscribe(searchVal => {
      this.countryValue = searchVal;
      this.filterRegulator(searchVal);
    });

    this.appStateService.getDropdownOption().pipe(takeUntil(this.destroyed$))
      .subscribe(({dropdownStr, countrySelected}) => {
        this.countryValue = dropdownStr;
        this.filterRegulator(dropdownStr); // Only ONE OPTIONS IS PRESENT AT GLOBAL Search (COuntry and combine country and region)
      });

    this.appStateService.getTopTags().pipe(takeUntil(this.destroyed$)).subscribe(tags => {
      this.tagsValue = tags;
      this.filterRegulator('', {name: 'Subject Area', code: 'Tags'}, this.childFilteredData);
    });

    this.appStateService.getReset().pipe(takeUntil(this.destroyed$)).subscribe(isReset => {
      this.reset();
    });
  }

  setRegulatorKeys() {
    this.allKeys = (Object.keys(this.regulatorData[0])).filter(
      keyItem => keyItem !== 'Entity' && keyItem !== 'Short Name' && keyItem !== 'Entity Url'
        && keyItem !== 'Foreign Name' && keyItem !== 'Twitter' && keyItem !== 'Combine Country' && keyItem !== 'Edit'
        && keyItem !== 'Tags' && keyItem !== 'tags' && keyItem !== 'RegulatorInfo' && keyItem !== 'Bookmark'
        && keyItem !== 'Share'
    );
  }

  filterRegulator(currentSearchByKeyVal: string, option?: IOption, filteredData?: ILegislation[]) {
    const dataToFilterFrom = filteredData ? [...filteredData] : this.regulatorData;
    const key = option ? option.code : this.selectedOption.code;
    const isGlobal = !option?.code || option.code === 'Tags';
    console.log('1111 REG', this.tagsValue, this.countryValue);
    this.filteredRegulatorData = dataToFilterFrom.filter(regulator => {
      return isGlobal ? this.appStateService.globalSearchItem(regulator, currentSearchByKeyVal, this.countryValue, this.tagsValue)
        : regulator[key]?.toLowerCase()?.includes(currentSearchByKeyVal.toLowerCase().trim());
    });
    this.childFilteredData = option ? this.childFilteredData : this.filteredRegulatorData;
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
    this.countryValue = '';
    this.resetTags.emit()
    this.filteredRegulatorData = [...this.regulatorData];
    this.childFilteredData = [...this.regulatorData];
    this.setRegulatorPaginateData();
  }

  resetChild() {
    this.filteredRegulatorData = this.childFilteredData;
    this.setRegulatorPaginateData();
  }

  searchBySelected(option: IOption) {
    this.childSelectedOption = option;
  }

  itemSelectedInDropdown(data: IDropdownClick) {
    this.filterRegulator(data.dropdownStr, this.childSelectedOption, this.childFilteredData);
  }

  itemSearched(searchVal: string) {
    this.filterRegulator(searchVal, this.childSelectedOption, this.childFilteredData);
    this.setRegulatorPaginateData();
  }

  isSelectedFilter(tag: string, labelKey?: string): boolean {
    return !!this.tagsValue?.find(item => item.Tags?.toLowerCase().trim() === tag.toLowerCase().trim());
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
