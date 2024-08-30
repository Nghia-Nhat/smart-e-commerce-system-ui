import Image from "next/image";

const ImageNotFound = () => {
  return (
    <div className="flex justify-center">
      <Image
        src="/images/404.png"
        width={500}
        height={500}
        alt="Product not found"
        draggable="false"
        className="select-none"
      />
    </div>
  );
};

export default ImageNotFound;
