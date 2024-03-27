import Product from "../Product/Product";
import SizeFilters from "../SizeFilters/SizeFilters";
import "./styles.css";

import { useAppSelector } from "../redux/hooks";
import { IProduct } from "../utils/types";

export default function BaseGrid() {
  const productList = useAppSelector((state) => state.product.data.productList);
  const filterProductList = useAppSelector(
    (state) => state.product.data.filterProductList
  );
  const isFilterApplied = useAppSelector(
    (state) => state.product.data.isFilterApplied
  );

  return (
    <div>
      <div className="ecom-container">
        <div className="ecom-filter">
          <div className="main-size-filter">
            <SizeFilters />
          </div>
        </div>
        <div className="product-section">
          <div className="found-elements">
            {(isFilterApplied ? filterProductList : productList).length}{" "}
            Product(s) found
          </div>
          <div className="ecom-products">
            {(isFilterApplied ? filterProductList : productList).map(
              (product: IProduct) => (
                <Product key={product.id} product={product} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
