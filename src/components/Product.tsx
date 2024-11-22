import { formatCurrency } from "@/lib/utils";
import { products } from "@wix/stores";
import Link from "next/link";
import DiscountBadge from "./DiscountBadge";
import WixImage from "./WixImage";
import Badge from "./ui/badge";

interface ProductProps {
  product: products.Product;
}

export default function Product({ product }: ProductProps) {
  const mainImage = product.media?.mainMedia?.image;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block h-full overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <WixImage
          mediaIdentifier={mainImage?.url}
          alt={mainImage?.altText || "Product image"}
          width={700}
          height={700}
          className="h-full w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute bottom-3 right-3 flex flex-wrap items-center gap-2">
          {product.ribbon && (
            <Badge className="bg-primary text-primary-foreground">
              {product.ribbon}
            </Badge>
          )}
          {product.discount && <DiscountBadge data={product.discount} />}
          <Badge className="bg-secondary font-semibold text-secondary-foreground">
            {getFormattedPrice(product)}
          </Badge>
        </div>
      </div>

      {/* Product Information */}
      <div className="space-y-3 p-4">
        <h3 className="text-lg font-semibold leading-tight group-hover:text-primary">
          {product.name}
        </h3>
        <div
          className="line-clamp-3 text-sm text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: product.description || "" }}
        />
      </div>
    </Link>
  );
}

function getFormattedPrice(product: products.Product) {
  const minPrice = product.priceRange?.minValue;
  const maxPrice = product.priceRange?.maxValue;

  if (minPrice && maxPrice && minPrice !== maxPrice) {
    return `From ${formatCurrency(minPrice, product.priceData?.currency)}`;
  }
  return (
    product.priceData?.formatted?.discountedPrice ||
    product.priceData?.formatted?.price ||
    "N/A"
  );
}
