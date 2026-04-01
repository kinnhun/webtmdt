export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/catalogue/outdoor',
      permanent: false,
    },
  };
}

export default function CataloguePage() {
  return null;
}
