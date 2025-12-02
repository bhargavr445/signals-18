import { ComponentFixture, TestBed } from '@angular/core/testing';
import { inputBinding, provideZonelessChangeDetection, signal } from '@angular/core';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  const dataList = signal([]);
  const tableHeaders = signal([]);

  beforeEach(async () => {
    // Reset the signals to their initial state for each test
    dataList.set([]);
    tableHeaders.set([]);

    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [TableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent, {
      bindings: [
        inputBinding('dataList', dataList),
        inputBinding('tableHeaders', tableHeaders),
      ]
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create with initial values', () => {
    expect(component).toBeTruthy();
    expect(component.headersLength()).toEqual(0);
  });

  it('should update headersLength when headers are changed', async () => {
    tableHeaders.set([{ label: 'Name' }, { label: 'ID' }]);
    await fixture.whenStable();
    expect(component.headersLength()).toEqual(2);
  });
});
