import { GetStaticPaths, GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { FiUser, FiCalendar, FiWatch } from 'react-icons/fi';

import { RichText } from 'prismic-dom';

import Header from '../../components/Header';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post(props: PostProps) {
  return (
    <>
      <Header></Header>

      <div className={styles.content}>
        <div className={styles.banner}>
          <img src={props.post.data.banner.url} alt="" />
        </div>

        <div className={styles.headerOverview}>
          <h1>{props.post.data.title}</h1>
          <ul>
            <li>
              <time>
                <p>
                  <FiCalendar />
                  {props.post.first_publication_date}
                </p>
              </time>
            </li>
            <li>
              <p>
                <FiUser />
                {props.post.data.author}
              </p>
            </li>
            <li>
              <p>
                <FiWatch />4 mi
              </p>
            </li>
          </ul>
        </div>

        <body>
          <div className={styles.newsBody}>
            {props.post.data.content.map(contentBody => (
              <>
                <h2 key={contentBody.heading}>
                  {RichText.asText(contentBody.heading)}
                </h2>
                {contentBody.body.map(bodyPost => (
                  <div
                    dangerouslySetInnerHTML={{ __html: bodyPost.text }}
                  ></div>
                ))}
              </>
            ))}
          </div>
        </body>
      </div>
    </>
  );
}

export const getStaticPaths = async () => {
  //   const prismic = getPrismicClient();
  //   const posts = await prismic.query(TODO);

  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };

  //   // TODO
};

export const getStaticProps = async context => {
  const uid = context.params.slug;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(uid), {});

  const post: Post = {
    first_publication_date: new Date(
      response.first_publication_date
    ).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
    data: {
      title: RichText.asText(response.data.title),
      banner: {
        url: response.data.banner.url,
      },
      author: RichText.asText(response.data.author),
      content: response.data.content,
    },
  };

  return {
    props: { post },
    redirect: 60 * 30,
  };
};
