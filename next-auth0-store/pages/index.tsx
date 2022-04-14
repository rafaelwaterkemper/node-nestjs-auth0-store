import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";

export default function Home({data}) {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/login",
        permanent: false,
      },
    };
  } else {
    console.log("AccessToken", session.accessToken);
    return {
      redirect: {
        destination: "/app",
        permanent: false,
      },
    };
  }
};
