import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDragaoComponent } from './add-dragao.component';

describe('AddDragaoComponent', () => {
  let component: AddDragaoComponent;
  let fixture: ComponentFixture<AddDragaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDragaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDragaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
