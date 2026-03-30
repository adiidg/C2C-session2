import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextLoop } from './text-loop';

describe('TextLoop', () => {
  let component: TextLoop;
  let fixture: ComponentFixture<TextLoop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextLoop],
    }).compileComponents();

    fixture = TestBed.createComponent(TextLoop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
