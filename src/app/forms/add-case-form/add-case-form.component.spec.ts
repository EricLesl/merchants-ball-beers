import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCaseFormComponent } from './add-case-form.component';

describe('AddCaseFormComponent', () => {
  let component: AddCaseFormComponent;
  let fixture: ComponentFixture<AddCaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCaseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
