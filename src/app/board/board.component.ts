import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pm-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faPlus = faPlus;
  boardTitle!: string;
  boardId!: string;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const boardTitle = params.get('title');
      if (boardTitle) {
        this.boardTitle = boardTitle;
      }
      console.log('Board Title: ' + boardTitle);
    });

    this.route.queryParamMap.subscribe((params) => {
      const boardId = params.get('id');
      if (boardId) {
        this.boardId = boardId;
      }
      console.log('Board Id: ' + boardId);
    });
  }

  backToBoardsList() {
    this.router.navigate(['/main']);
  }
}
