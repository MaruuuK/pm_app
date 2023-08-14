import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBoardsComponent } from './create-boards.component';

describe('CreateBoardsComponent', () => {
  let component: CreateBoardsComponent;
  let fixture: ComponentFixture<CreateBoardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBoardsComponent]
    });
    fixture = TestBed.createComponent(CreateBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
