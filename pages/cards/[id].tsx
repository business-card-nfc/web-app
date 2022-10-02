import { GetServerSideProps } from "next";
import { CardData, Card } from "../../src/types";
import * as Sentry from "@sentry/react";

export async function getServerSideProps({
  query: { id },
}: {
  query: { id: string };
}) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT_URL + `/items/cards/${id}`
    );

    let data: CardData | null = null;
    if (res.ok) {
      data = await res.json();
    } else {
      console.error(res);
    }
    return {
      props: {
        processEnvNodeEnv: process.env.NODE_ENV,
        ok: res.ok,
        status: res.status,
        statusText: res.statusText,
        data: data,
      },
    };
  } catch (e) {
    Sentry.captureException(e);
    console.error(e);
  }
}

type Props = {
  processEnvNodeEnv: "development" | "production" | "test";
  ok: boolean;
  status: number;
  statusText: string;
  data: Card | null;
};

function PageCardsShow({
  processEnvNodeEnv,
  ok,
  status,
  statusText,
  data,
}: Props) {
  return (
    <>
      {processEnvNodeEnv === "development" && (
        <ul>
          <li>ok: {ok}</li>
          <li>status: {status}</li>
          <li>statusText: {statusText}</li>
        </ul>
      )}

      {!ok && <p>An error has occured, please contact the admin.</p>}

      {ok && data && (
        <ul>
          <li>{data.username}</li>
          <li>{data.email}</li>
          <li>{data.full_name}</li>
        </ul>
      )}
    </>
  );
}

export default PageCardsShow;
