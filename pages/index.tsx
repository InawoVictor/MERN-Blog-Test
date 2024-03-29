// @ts-nocheck
import Head from "next/head";
import { Layout, Posts, SideBar } from "@/components";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from "querystring";

interface Post { 
  _id: string; 
  username: string; 
  photo: string;
  categories: string[]; 
  title: string; 
  createdAt: string; 
  description: string; 
}

interface HomeProps {
  posts: Post[];
  errorMessage?: string; 
}



export default function Home({ posts, errorMessage }: HomeProps) {

  if(!process.env.NEXT_PUBLIC_API_URL){
    return null
  }

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
              <p style={{fontSize: "2rem", color: "tomato"}}>{errorMessage}</p>
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

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  { query }: GetServerSidePropsContext<ParsedUrlQuery>
  ) => {
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
    const errorMessage = 'An error occurred while fetching posts. Please refresh page.';
    
    return {
      props: {
        posts: [],
        errorMessage,
      },
    };
  }
};

