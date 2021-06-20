import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AddProductComponent } from 'src/app/product/add-product/add-product.component';
import { AlertService } from 'src/app/services/alert.service';
import { CategoryManagementService } from 'src/app/services/category-management.service';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css'],
})
export class ListCategoryComponent implements OnInit {
  title = 'Category List';
  categories: any[];
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private dialogService: NgbModal,
    private categoryService: CategoryManagementService,
    private toastr: ToastrService,
    private alertService: AlertService
  ) {}

  fetchData() {
    this.categoryService
      .getCategorys({})
      .subscribe((resp: DataTablesResponse) => {
        this.categories = resp.data;
      });
  }

  ngOnInit(): void {
    // const that = this;
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   searching: false,
    //   serverSide: true,
    //   processing: true,
    //   ordering: false,
    //   ajax: (dataTablesParameters: any, callback) => {
    //     that.categoryService
    //       .getCategorys(dataTablesParameters)
    //       .subscribe((resp: DataTablesResponse) => {
    //         that.categories = resp.data;
    //         // callback({
    //         //   recordsTotal: resp.recordsTotal,
    //         //   recordsFiltered: resp.recordsFiltered,
    //         //   data: [],
    //         // });
    //       });
    //   },
    //   columns: [{ data: 'id' }, { data: 'name' }, { data: null }],
    // };
    this.fetchData();
  }

  // ngAfterViewInit(): void {
  //   this.dtTrigger.next();
  // }

  rerender_datatable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  addCategory() {
    const modal = this.dialogService.open(AddProductComponent, {
      backdrop: 'static',
    });

    modal.componentInstance.modalOptions = {
      title: 'Add Category',
      desc: 'category',
      categories: this.categories,
    };
    modal.result.then((result) => {
      if (result) {
        this.toastr.success('Category Added Successfully', 'Success');
        this.fetchData();
      } else {
        this.toastr.error('Operation Failed');
      }
    });
  }

  updateCategory(category: any) {
    const modalRef = this.dialogService.open(AddProductComponent, {
      backdrop: 'static',
    });
    modalRef.componentInstance.modalOptions = {
      title: 'Update Category',
      desc: 'category',
      category,
    };
    modalRef.result.then((result) => {
      if (result) {
        this.toastr.success('Category updated Successfully', 'Success');
        this.fetchData();
      } else {
        this.toastr.error('Operation Failed');
      }
    });
  }

  deleteCategory(id: any) {
    this.alertService.confirmationAlert().then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).subscribe((resp: any) => {
          if (resp.success) {
            this.alertService.successAlert();
            this.fetchData();
          } else {
            this.alertService.failureAlret();
          }
        });
      }
    });
  }
}
