export type SchemaType = 
  | "Organization" 
  | "LocalBusiness" 
  | "Product" 
  | "BreadcrumbList" 
  | "Article" 
  | "BlogPosting" 
  | "WebSite" 
  | string;

interface SchemaProps {
  type: SchemaType;
  data: Record<string, any>;
  id?: string;
}

export default function Schema({ type, data, id }: SchemaProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <script
      id={id || `schema-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
}

