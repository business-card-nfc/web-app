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
  } catch (e: any) {
    console.error(e);
    return { props: { data: null, errorMessage: e.message } };
  }
}

type Props = {
  data: Card | null;
  errorMessage: string | null;
};

function PageCardsShow({ data, errorMessage }: Props) {
  console.log("PageCardsShow");
  console.log({ data });
  console.log({ errorMessage });

  if (errorMessage) {
    return <p>{errorMessage}</p>;
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
