import Image from "next/image";

interface ArticleImageProps {
  image: string;
}

export default function ArticleImage({ image }: ArticleImageProps) {
  if (!image) return null; // safety check

  return (
    <div className="relative my-6 h-105 w-full overflow-hidden rounded-lg">
      <Image
        src={image}
        alt="Article image"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
