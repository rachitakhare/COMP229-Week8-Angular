import { Component } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductRepository } from '../model/product.repository';
import { Cart } from "../model/cart.model";

@Component({ selector: 'store', templateUrl: 'store.component.html' })
export class StoreComponent {
    public selectedCategory = null;
    //for pagination
    public productsPerPage = 4;
    public selectedPage = 1;
    constructor(private repository: ProductRepository, private cart : Cart) {

    }

    
    get products(): Product[] {
       const pageIndex = (this.selectedPage - 1) * this.productsPerPage;
       return this.repository.getProducts(this.selectedCategory!).slice(pageIndex, pageIndex + this.productsPerPage);
    }
    
    get categories(): string[] {
        return this.repository.getCategories();
    }

    changeCategory(newCategory?: string): void {
        this.selectedCategory = newCategory as any ;
    }

    //Pagination
    changePage(newPage: number): void {this.selectedPage = newPage;}
    
    changePageSize(newSize: number): void {this.productsPerPage = Number(newSize)!;
        this.changePage(1)!;}
    
    // get pageNumbers(): number[] {
    //     return Array(Math.ceil(this.repository.getProducts(this.selectedCategory!).length / this.productsPerPage)).fill(0).map((x, i) => i + 1);}

        get pageCount(): number {return Math.ceil(this.repository.getProducts(this.selectedCategory!).length / this.productsPerPage);}

        addProductToCart(product: Product): void {this.cart.addLine(product);}

}