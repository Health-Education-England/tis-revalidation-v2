import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminsModule } from "../admins/admins.module";
import { MaterialModule } from "../shared/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { UpdateConnectionComponent } from "./update-connection/update-connection.component";
import { UpdateConnetionsBtnComponent } from "./update-connetions-btn/update-connetions-btn.component";
import { UpdateConnectionsService } from "./services/update-connections.service";

const components: any[] = [
  UpdateConnectionComponent,
  UpdateConnetionsBtnComponent
];

@NgModule({
  declarations: components,
  providers: [UpdateConnectionsService],
  imports: [CommonModule, MaterialModule, SharedModule, ReactiveFormsModule],
  exports: components
})
export class UpdateConnectionsModule {}
