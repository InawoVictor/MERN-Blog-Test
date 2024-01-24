import Head from "next/head";
import { Layout, Posts, SideBar } from "@/components";
import axios from "axios";
import { GetServerSideProps } from 'next';

interface HomeProps {
  posts: {}[];
  errorMessage?: string; 
}



export default function Home({ posts, errorMessage }: HomeProps) {

  return (
    <>
      <Head>
        <title>IVblog | Inawo Victor</title>
        <meta name="description" content="Explore a collection of insightful blog posts on various topics." />
        <meta property="og:title" content="IVblog | Inawo Victor" />
        <meta property="og:description" content="Explore a collection of insightful blog posts on various topics." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <Layout>
          <div className="home">
            {errorMessage ? (
              <p>{errorMessage}</p>
            ) : (
              <>
                <Posts posts={posts ?? []} />
                <SideBar />
              </>
            )}
          </div>
        </Layout>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ query }) => {
  const category = query.category || "";
  const user = query.user || "";

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/?category=${category}&user=${user}`);
    const data: {}[] = res.data;

    return {
      props: {
        posts: data,
      },
    };
  } catch (error) {
    const errorMessage = 'An error occurred while fetching posts. Please try again later.';
    
    return {
      props: {
        posts: [],
        errorMessage,
      },
    };
  }
};

