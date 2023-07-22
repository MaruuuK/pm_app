import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateColumnService } from './create-column.service';

@Component({
  selector: 'pm-create-columns',
  templateUrl: './create-columns.component.html',
  styleUrls: ['./create-columns.component.css'],
})
export class CreateColumnsComponent implements OnInit {
  createColumnForm!: FormGroup;

  constructor(private createColumnService: CreateColumnService) {}

  ngOnInit(): void {
    this.createColumnForm = new FormGroup({
      title: new FormControl('', Validators.required),
    });
  }
  onCreate(createColumnForm: FormGroup): void {
    if (!createColumnForm.valid) {
      return;
    }
    this.createColumnService.setFormData(createColumnForm);
    this.createColumnService.emitCreateButtonClick();
  }
}
