import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "../../models/post.model";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {


  @Input() post!: Post;
  @Output() postCommented = new EventEmitter<{ comment: string, postId: number }>();

  tempUser = {firstName: "Bilel", lastName: "Daoud"};

  constructor() {
  }

  ngOnInit(): void {
  }

  onNewComment(comment: string) {
    this.postCommented.emit({comment: comment, postId: this.post.id})
  }
}
