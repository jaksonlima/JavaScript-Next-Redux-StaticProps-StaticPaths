import { useRouter } from "next/router";

export default function Members({ items }) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <header>
        {items.map((x) => (
          <div key={x.id}>
            <p>{x.name}</p>
            <p>{x.email}</p>
            <p>{x.address?.street}</p>
          </div>
        ))}
      </header>
    </div>
  );
}

export const getStaticPaths = async () => {
  const reponse = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await reponse.json();

  const paths = data.map(({ username }) => ({ params: { username } }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { username } = context.params;

  const reponse = await fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`);

  const data = await reponse.json();

  return {
    props: {
      items: data,
    },
    revalidate: 10,
  };
};
