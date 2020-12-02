import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxsModule } from "@ngxs/store";
import { MaterialModule } from "../shared/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { UpdateConnectionComponent } from "./update-connection/update-connection.component";
import { UpdateConnetionsBtnComponent } from "./update-connetions-btn/update-connetions-btn.component";
import { UpdateConnectionsService } from "./services/update-connections.service";
import { UpdateConnectionsState } from "./state/update-connections.state";

const components: any[] = [
  UpdateConnectionComponent,
  UpdateConnetionsBtnComponent
];

@NgModule({
  declarations: components,
  providers: [UpdateConnectionsService],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([UpdateConnectionsState])
  ],
  exports: components
})
export class UpdateConnectionsModule {}
