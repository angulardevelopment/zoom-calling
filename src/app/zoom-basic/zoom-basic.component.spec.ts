import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomBasicComponent } from './zoom-basic.component';

describe('ZoomBasicComponent', () => {
  let component: ZoomBasicComponent;
  let fixture: ComponentFixture<ZoomBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
