import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EvaluateService } from '../../../core/services/evaluate.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-case-evaluation',
  templateUrl: './view-case-evaluation.component.html',
  styleUrl: './view-case-evaluation.component.scss',
})
export class ViewCaseEvaluationComponent implements OnInit {
  caseEvaluationForm!: FormGroup;
  evaluationId!: number;
  caseEvaluationAttachments: any[] = [];
  message: any;

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
        this.message = response.message;
        this.caseEvaluationAttachments = response.caseEvaluationAttachments.map(
          (item: any) => {
            item.fileName = item.attachmentUrl.substring(
              item.attachmentUrl.lastIndexOf('/') + 1
            );
            item.fileFormat = item.fileName.substring(
              item.fileName.lastIndexOf('.') + 1
            );
            item.fileIcon = this.getFileIcon(item.fileFormat);
            return item;
          }
        );
      });
  }

  getFileIcon(format: string) {
    let iconName;
    switch (format) {
      case 'docx':
      case 'doc':
        iconName = 'description';
        break;

      case 'pdf':
        iconName = 'picture_as_pdf';
        break;

      case 'zip':
      case 'rar':
        iconName = 'folder_zip';
        break;

      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'svg':
        iconName = 'imagesmode';
        break;

      default:
        iconName = 'file_save';
        break;
    }
    return iconName;
  }
}
