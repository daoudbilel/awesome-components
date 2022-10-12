import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Post} from "../models/post.model";
import {PostsService} from "../services/posts.service";
import {Observable} from "rxjs";


@Injectable()
export class PostsResolver implements Resolve<Post[]> {
  constructor(private postService: PostsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]> {
    return this.postService.getPosts();
  }

}

