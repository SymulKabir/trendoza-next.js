interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
}

export default function ProductCard({
  image,
  title,
  price,
  oldPrice,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border hover:shadow-lg transition">
      <img
        src={image}
        alt={title}
        className="h-52 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-sm line-clamp-2">
          {title}
        </h3>

        <div className="mt-2 flex gap-2 items-center">
          <span className="font-bold text-lg">
            ₹{price}
          </span>

          {oldPrice && (
            <span className="line-through text-gray-400">
              ₹{oldPrice}
            </span>
          )}
        </div>

        <button className="w-full mt-3 bg-[#F15A4A] text-white py-2 rounded-lg hover:bg-[#e14837]">
          Add to Cart
        </button>
      </div>
    </div>
  );
}