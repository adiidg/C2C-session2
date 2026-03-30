import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCrud } from './task-crud';

describe('TaskCrud', () => {
  let component: TaskCrud;
  let fixture: ComponentFixture<TaskCrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCrud],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCrud);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
