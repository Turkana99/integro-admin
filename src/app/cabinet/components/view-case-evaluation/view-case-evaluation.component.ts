import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EvaluateService } from '../../../core/services/evaluate.service';
import { ActivatedRoute } from '@angular/router';
import Quill from 'quill';

const Font = Quill.import('formats/font') as any;
Font.whitelist = ['chooseFont', 'poppins', 'arial', 'times New Roman'];
Quill.register(Font, true);
@Component({
  selector: 'app-view-case-evaluation',
  templateUrl: './view-case-evaluation.component.html',
  styleUrl: './view-case-evaluation.component.scss',
})
export class ViewCaseEvaluationComponent implements OnInit {
  caseEvaluationForm!: FormGroup;
  evaluationId!: number;
  caseEvaluationAttachments: any[] = [];
  quillModules: any = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: Font.whitelist }],
      [{ align: [] }],
      ['clean'],
      ['link'],
    ],
  };

  constructor(
    private evaluateService: EvaluateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.evaluationId = +params.get('id')!;
      this.getEvaluationById(this.evaluationId);
    });
  }

  getEvaluationById(evaluationId: number) {
    this.evaluateService
      .getEvaluationById(evaluationId)
      .subscribe((response: any) => {
        this.caseEvaluationAttachments = response.caseEvaluationAttachments;
      });
  }
}
