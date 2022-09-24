import { GetServerSideProps } from "next";
import { CardData, Card } from "../../src/types";

export async function getServerSideProps({
  query: { id },
}: {
  query: { id: string };
}) {
  const res = await fetch(
    process.env.API_ENDPOINT_URL + `/items/cards/${id}`
  );
  const { data }: CardData = await res.json();
  console.log("getServerSideProps");
  console.log({ data });

  return { props: { data } };
}

type Props = {
  data: Card;
};

function PageCardsShow({ data }: Props) {
  console.log("PageCardsShow");
  console.log({ data });
  return (
    <ul>
      <li>{data.username}</li>
      <li>{data.email}</li>
      <li>{data.full_name}</li>
    </ul>
  );
}

export default PageCardsShow;
