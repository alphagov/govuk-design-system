# Adding images to the design system website

If you are adding or amending guidance on the design system website and need to include an image, you must consider the impact on the user. If used improperly, images can have implications for web performance and accessibility.

Before reading this guidance you should also consult our [image guidance](https://design-system.service.gov.uk/styles/images/) for details on when it's appropriate to use images and how best to use them.

## Decide if your content needs images

We always try to avoid adding new images to our content. You should only add images if they are the only way to convey information.

In styles, components and patterns, use code examples to convey what our styles, components and patterns will look like. Avoid using screenshots of styles, components and patterns wherever possible.

## Use an SVG file if possible

Use an SVG file when you’re adding a simple graphic or table to the design system website (rather than a photo or screenshot). An SVG file is usually the best format as it allows the image to scale without loss of detail across different screen sizes and is less likely to impact page performance.

Keep your graphic or table as simple as possible by limiting the number of elements and shapes. This helps to keep the file size and rendering work from the browser as low as possible. Using a compression service, such as [SVGOMG](https://jakearchibald.github.io/svgomg/), will also help bring that file size down for optimal performance.

## Ensure your image is an appropriate file size

When it is not possible to use an SVG file for your image, and you're using a raster file type, such as PNG or JPEG, make sure the file size is not too large to avoid impacting the performance of the website.

The simplest way to avoid this is to compress your images. There are numerous compression tools such as [ImageOptim](https://imageoptim.com/mac) which can handle this for you.

Another good practice is to make sure your image has the appropriate dimensions to stop any blurring or pixelating, which would make an image hard to interpret. As a general guide, you should make your image's intrinsic size (its 'actual' size) double that of it's maximum width on the page.

For example, you know the:

- image is in a width container or column on a page
- maximum size of your image (taking into account different screen sizes) is 500 pixels
- 500 pixel image will need a width of 1000px

This increase in pixels will help stop any blurriness when using HiDPI (High Dots Per Inch) displays, such as retina display macs. There are numerous tools for resizing images, such as within macOS's own image viewer.

While both of these techniques are important, you should be aware that a properly compressed image that's too wide will be better than a poorly compressed image that's the "correct" width.

## Make sure your image has the correct markup to improve web performance

If you have direct control over the markup of your image, for example you can directly edit the `img` tag which is rendering your image, consider including the following:

- [Lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading): For images that would not be in the viewport when the page loads, lazy loading will let the browser defer their loading when actually needed.
- [The `figure` tag around your image](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure)
- [Responsive image features such as the `srcset` and `sizes` attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images): For images whose width vary a lot with viewport size (full width images or those in the main column of content), providing versions of the image at different width and using the `srcset` (possibly complemented by the`sizes` attribute) will let browsers load smaller files. This requires generating each size of the image, though.
- [The `picture` tag for providing multiple formats](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture): For images where a more modern format (eg. WEBP) has a smaller file size then its original one (eg. JPEG) you can provide both sources to the browser with the `<picture>` element, which will download the newer one if it supports it. This requires generating both version of the image, though.
