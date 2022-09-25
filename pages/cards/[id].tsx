import { GetServerSideProps } from "next";
import { CardData, Card } from "../../src/types";

export async function getServerSideProps({
  query: { id },
}: {
  query: { id: string };
}) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT_URL + `/items/cards/${id}`
  );

  try {
    const { data }: CardData = await res.json();
    return { props: { data } };
  } catch (error: any) {
    console.error(e);
    return { props: { data: null, error: error } };
  }
}

type Props = {
  data: Card | null;
  error: any | null;
};

function PageCardsShow({ data, error }: Props) {
  console.log("PageCardsShow");
  console.log({ data });
  console.log({ error });

  if (error) {
    return <p>{error.message}</p>;
  }

  if (data) {
    return (
      <ul>
        <li>{data.username}</li>
        <li>{data.email}</li>
        <li>{data.full_name}</li>
      </ul>
    );
  }
}

export default PageCardsShow;
