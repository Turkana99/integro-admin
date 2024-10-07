import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCaseEvaluationComponent } from './view-case-evaluation.component';

describe('ViewCaseEvaluationComponent', () => {
  let component: ViewCaseEvaluationComponent;
  let fixture: ComponentFixture<ViewCaseEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCaseEvaluationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCaseEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
