import { ComponentFixture, TestBed } from '@angular/core/testing';
import { inputBinding, provideZonelessChangeDetection, signal } from '@angular/core';

import { TableComponent } from './table.component';
import { provideHttpClient } from '@angular/common/http';

fdescribe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  const dataList = signal([]);
  const headers = signal([{ label: 'Name' }, { label: 'ID' }]);

  beforeEach(async () => {
    // Reset the signals to their initial state for each test
    dataList.set([]);
    headers.set([{ label: 'Name' }, { label: 'ID' }]);

    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient()],
      imports: [TableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent, {
      bindings: [
        inputBinding('tableData', dataList),
        inputBinding('tableHeaders', headers),
      ]
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with initial values', () => {
    expect(component).toBeTruthy();
    expect(component.headersLength()).toEqual(2);
  });

  it('should update headersLength when headers are changed', () => {
    // Update the signal for this specific test
    headers.set([]);
    fixture.detectChanges();
    // checking for the 
    expect(component.headersLength()).toEqual(0);
  });
});