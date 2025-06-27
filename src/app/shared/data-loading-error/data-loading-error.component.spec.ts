import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLoadingErrorComponent } from './data-loading-error.component';

describe('DataLoadingErrorComponent', () => {
  let component: DataLoadingErrorComponent;
  let fixture: ComponentFixture<DataLoadingErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataLoadingErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataLoadingErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
