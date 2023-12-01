import { Component, OnInit } from "@angular/core";
import { ContentfulService } from "../shared/services/contentful/contentful.service";
import { Observable } from "rxjs";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
@Component({
  selector: "app-announcements",
  templateUrl: "./announcements.component.html",
  styleUrls: ["./announcements.component.scss"]
})
export class AnnouncementsComponent implements OnInit {
  constructor(private contenfulService: ContentfulService) {}
  showAnnouncement = true;
  alerts$: Observable<any> = this.contenfulService.getAlerts();
  close(id: any) {
    this.showAnnouncement = false;
  }

  ngOnInit(): void {
    this.alerts$.subscribe((data) => {
      console.log("DATA:", data);
    });
  }
}
