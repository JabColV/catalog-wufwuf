import Image, { ImageProps } from "next/image";

interface CustomImageProps extends ImageProps {
  src: string; // Override the src type to ensure it's always a string
}

const CustomImage = ({
  alt = "image",
  src,
  width,
  height,
  ...rest
}: CustomImageProps) => {
  // Construct the modified src by prepending /service-pets to the original src
  const modifiedSrc = `${src}`;

  // Define the loader function to modify the URL for external images
  const loader = ({ src, width, quality }) => {
    return `/service-pets/_next/image?url=${encodeURIComponent(
      src
    )}&w=${width}&q=${quality || 75}`;
  };

  // Check if width and height are provided
  const hasDimensions = width !== undefined && height !== undefined;

  // If width and height are provided, return the image with specified dimensions
  if (hasDimensions) {
    return (
      <Image
        loader={loader}
        src={modifiedSrc}
        alt={alt}
        width={width}
        height={height}
        {...rest}
      />
    );
  } else {
    // If width and height are not provided, return the image with fill layout
    return (
      <Image
        loader={loader}
        src={modifiedSrc}
        layout="fill"
        objectFit="cover"
        alt={alt}
        {...rest}
      />
    );
  }
};

export default CustomImage;

// import Image, { ImageProps } from 'next/image';

// interface CustomImageProps extends ImageProps {
//   src: string; // Override the src type to ensure it's always a string
// }

// const CustomImage = ({ alt = "image", src, ...rest }: CustomImageProps) => {
//   // Check if the src is an external URL
//   const isExternal = src.startsWith('http');

//   // If it's an external URL, prepend /service-pets to the Next.js image loader path
//   const modifiedSrc = isExternal ? src : `/service-pets${src}`;

//   // If it's an external URL, use the modified loader
//   const loader = isExternal
//     ? ({ src, width, quality }) => {
//         return `/service-pets/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
//       }
//     : undefined;

//   return <Image loader={loader} src={modifiedSrc} layout="fill" objectFit="cover" {...rest} alt={alt}/>;
// };

// export default CustomImage;
