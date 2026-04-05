interface SchemaProps {
  type: "Organization" | "LocalBusiness" | "Product";
  data: Record<string, any>;
}

export default function Schema({ type, data }: SchemaProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
}
