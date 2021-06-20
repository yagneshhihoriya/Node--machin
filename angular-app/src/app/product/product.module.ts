import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddProductComponent,
    UpdateProductComponent,
    ListProductComponent,
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProductModule {}
