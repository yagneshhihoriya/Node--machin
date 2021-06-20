import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { CategoryManagementService } from 'src/app/services/category-management.service';
import { ProductManagementService } from 'src/app/services/product-management.service';
import { AddProductComponent } from '../add-product/add-product.component';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
})
export class ListProductComponent implements OnInit, AfterViewInit {
  title = 'Products';
  dtOptions: DataTables.Settings = {};
  products: any[];
  categories: any[];
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject();

  constructor(
    private productService: ProductManagementService,
    private dialogService: NgbModal,
    private categoryService: CategoryManagementService,
    private toastr: ToastrService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const that = this;
    this.categoryService.getCategorys({}).subscribe((response: any) => {
      if (response.success) {
        this.categories = response.data;
      }
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      searching: false,
      serverSide: true,
      processing: true,
      ordering: false,
      ajax: (dataTablesParameters: any, callback) => {
        that.productService
          .getProducts(dataTablesParameters)
          .subscribe((resp: DataTablesResponse) => {
            that.products = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: [],
            });
          });
      },
      columns: [
        { data: 'id' },
        { data: 'productName' },
        { data: 'categoryId' },
        { data: 'category' },
        { data: null },
      ],
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender_datatable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      console.log('rendering');

      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  addProduct() {
    const modal = this.dialogService.open(AddProductComponent, {
      backdrop: 'static',
    });

    modal.componentInstance.modalOptions = {
      title: 'Add Product',
      desc: 'product',
      categories: this.categories,
    };
    modal.result.then((result) => {
      if (result) {
        this.toastr.success('Product Added Successfully', 'Success');
        this.rerender_datatable();
      } else {
        this.toastr.error('Operation Failed');
      }
    });
  }

  updateProduct(product: any) {
    const modalRef = this.dialogService.open(AddProductComponent, {
      backdrop: 'static',
    });
    modalRef.componentInstance.modalOptions = {
      title: 'Update Product',
      desc: 'product',
      categories: this.categories,
      product,
    };
    modalRef.result.then((result) => {
      if (result) {
        this.toastr.success('Product updated Successfully', 'Success');
        this.rerender_datatable();
      } else {
        this.toastr.error('Operation Failed');
      }
    });
  }

  deleteProduct(id: any) {
    this.alertService.confirmationAlert().then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe((resp: any) => {
          if (resp.success) {
            this.alertService.successAlert();
            this.rerender_datatable();
          } else {
            this.alertService.failureAlret();
          }
        });
      }
    });
  }
}
