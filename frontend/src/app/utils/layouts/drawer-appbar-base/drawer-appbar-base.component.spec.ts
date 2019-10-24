import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerAppbarBaseComponent } from './drawer-appbar-base.component';

describe('DrawerAppbarBaseComponent', () => {
  let component: DrawerAppbarBaseComponent;
  let fixture: ComponentFixture<DrawerAppbarBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawerAppbarBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerAppbarBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
