import { Component, OnInit } from "@angular/core";
import { IProduct } from "./products";
import { ProductService } from "./product.service";

@Component({
    templateUrl: "./product-list.component.html",
    selector: 'pm-products',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    _listFilter: string;
    public get listFilter(): string {
        return this._listFilter;
    }
    public set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    filteredProducts: IProduct[];

    products: IProduct[] = [
    ];

    constructor(private productService: ProductService){
    }

    onRatingClicked(message: string) : void{
        this.pageTitle = 'Product List: ' + message;
    }

    performFilter(filterBy: string): IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
        
    }
    
    toggleImage() :void {
        this.showImage = !this.showImage;
    }
    ngOnInit(): void{
        //alert("In OnInit")
        this.products = this.productService.getProducts();
        this.filteredProducts = this.products;
    }
}