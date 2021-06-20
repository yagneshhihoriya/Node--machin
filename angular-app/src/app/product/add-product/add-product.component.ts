import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryManagementService } from 'src/app/services/category-management.service';
import { ProductManagementService } from 'src/app/services/product-management.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  title = 'My Title';
  @Input()
  modalOptions: any;

  @Output()
  result = new EventEmitter();
  productForm: FormGroup;
  categoryForm: FormGroup;
  submitted = false;

  constructor(
    public activeModal: NgbActiveModal,
    private builder: FormBuilder,
    private productService: ProductManagementService,
    private categoryService: CategoryManagementService
  ) {
    this.productForm = this.builder.group({
      name: ['', Validators.required],
      categoryId: [1, Validators.required],
    });

    this.categoryForm = this.builder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.title = this.modalOptions.title;
    debugger;
    if (this.modalOptions.title.toLowerCase() == 'update product') {
      let product = this.modalOptions.product;
      this.productForm.patchValue({
        name: product.productName,
        categoryId: product.categoryId,
      });
    } else if (this.modalOptions.title.toLowerCase() == 'update category') {
      let category = this.modalOptions.category;
      this.categoryForm.patchValue({ name: category.name });
    }
  }

  get f() {
    return this.productForm.controls;
  }

  get c() {
    return this.categoryForm.controls;
  }

  productFormSubmit() {
    this.submitted = true;
    // console.log(this.productForm.value, this.productForm.valid);
    if (this.productForm.valid) {
      let product = this.productForm.value;
      if (this.modalOptions.title.toLowerCase() == 'add product') {
        this.productService
          .addProduct(product.name, product.categoryId)
          .subscribe((resp: any) => {
            if (resp.success) {
              this.activeModal.close(true);
            } else {
              this.activeModal.close(false);
            }
          });
      } else {
        let productId = this.modalOptions.product.id;
        this.productService
          .updateProduct(productId, product.name, product.categoryId)
          .subscribe((resp: any) => {
            console.log(resp);

            if (resp.success) {
              this.activeModal.close(true);
            } else {
              this.activeModal.close(false);
            }
          });
      }
    }
  }

  categoryFormSubmit() {
    this.submitted = true;
    console.log(this.categoryForm.value);
    if (this.categoryForm.valid) {
      let category = this.categoryForm.value;
      if (this.modalOptions.title.toLowerCase() == 'add category') {
        this.categoryService
          .addCategory(category.name)
          .subscribe((resp: any) => {
            if (resp.success) {
              this.activeModal.close(true);
            } else {
              this.activeModal.close(false);
            }
          });
      } else {
        let categoryId = this.modalOptions.category.id;
        this.categoryService
          .updateCategory(categoryId, category.name)
          .subscribe((resp: any) => {
            console.log(resp);

            if (resp.success) {
              this.activeModal.close(true);
            } else {
              this.activeModal.close(false);
            }
          });
      }
    }
  }
}
