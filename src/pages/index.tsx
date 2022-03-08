import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { FiUser, FiCalendar } from 'react-icons/fi';
import { RichText } from 'prismic-dom';
import Link from 'next/link';
import Header from '../components/Header';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home(props: PostPagination) {
  return (
    <>
      <Header></Header>

      <div className={styles.principal}>
        <div className={styles.content}>
          {props.results.map(post => (
            <div className={styles.topic}>
              <Link href={`/post/${post.uid}`}>
                <a key={post.uid}>
                  <h2>{post.data.title}</h2>
                  <span>{post.data.subtitle}</span>
                  <ul>
                    <li>
                      <p>
                        <FiCalendar />
                        {post.first_publication_date}
                      </p>
                    </li>
                    <li>
                      <p>
                        <FiUser /> {post.data.author}
                      </p>
                    </li>
                  </ul>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query('');

  //console.log(postsResponse);

  const next_page = postsResponse.page;

  // fazer um array e colocar o results da api dentro...
  // pegar a pagina e colocar na variavel
  // retornar este objeto

  const contentPost: Post = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: new Date(
        post.first_publication_date
      ).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      data: {
        title: RichText.asText(post.data.title),
        subtitle: RichText.asText(post.data.subtitle),
        author: RichText.asText(post.data.author),
      },
    };
  });

  return {
    props: { next_page, results: contentPost },
  };
};
