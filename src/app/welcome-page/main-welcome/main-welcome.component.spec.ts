import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainWelcomeComponent } from './main-welcome.component';

describe('MainWelcomeComponent', () => {
  let component: MainWelcomeComponent;
  let fixture: ComponentFixture<MainWelcomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainWelcomeComponent]
    });
    fixture = TestBed.createComponent(MainWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
