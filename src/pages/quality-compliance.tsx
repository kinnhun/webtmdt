export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/manufacturing",
      permanent: false,
    },
  };
}

export default function QualityComplianceRedirectPage() {
  return null;
}
