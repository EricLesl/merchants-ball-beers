import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChalkBeerFormComponent } from './chalk-beer-form.component';

describe('ChalkBeerFormComponent', () => {
  let component: ChalkBeerFormComponent;
  let fixture: ComponentFixture<ChalkBeerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChalkBeerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChalkBeerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
