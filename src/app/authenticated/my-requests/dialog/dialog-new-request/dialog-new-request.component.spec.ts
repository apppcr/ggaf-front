import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewRequestComponent } from './dialog-new-request.component';

describe('DialogNewRequestComponent', () => {
  let component: DialogNewRequestComponent;
  let fixture: ComponentFixture<DialogNewRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNewRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
