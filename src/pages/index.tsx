import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { FiUser, FiCalendar } from 'react-icons/fi';

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

export default function Home() {
  return (
    <>
      <div className={styles.principal}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <img src="/logo.png" alt="logo" />
          </div>

          <div className={styles.topic}>
            <h2>Como utilizar hooks</h2>
            <span>Pensando em sincronização em vez de ciclos de vida.</span>
            <ul>
              <li>
                <p>
                  <FiCalendar />
                  15 Mar 2021
                </p>
              </li>
              <li>
                <p>
                  <FiUser /> Joseph Oliveira
                </p>
              </li>
            </ul>
          </div>

          <div className={styles.topic}>
            <h2>Criando um app CRA do zero</h2>
            <span>
              Tudo sobre como criar a sua primeira aplicação utilizando Create
              React App.
            </span>
            <ul>
              <li>
                <p>
                  <FiCalendar />
                  19 Abr 2021
                </p>
              </li>
              <li>
                <p>
                  <FiUser /> Danilo Vieira
                </p>
              </li>
            </ul>
          </div>

          <div className={styles.topic}>
            <h2>Como utilizar hooks</h2>
            <span>Pensando em sincronização em vez de ciclos de vida.</span>
            <ul>
              <li>
                <p>
                  <FiCalendar />
                  15 Mar 2021
                </p>
              </li>
              <li>
                <p>
                  <FiUser /> Joseph Oliveira
                </p>
              </li>
            </ul>
          </div>

          <div className={styles.topic}>
            <h2>Criando um app CRA do zero</h2>
            <span>
              Tudo sobre como criar a sua primeira aplicação utilizando Create
              React App.
            </span>
            <ul>
              <li>
                <p>
                  <FiCalendar />
                  19 Abr 2021
                </p>
              </li>
              <li>
                <p>
                  <FiUser /> Danilo Vieira
                </p>
              </li>
            </ul>
          </div>

          <div className={styles.topic}>
            <h2>Como utilizar hooks</h2>
            <span>Pensando em sincronização em vez de ciclos de vida.</span>
            <ul>
              <li>
                <p>
                  <FiCalendar />
                  15 Mar 2021
                </p>
              </li>
              <li>
                <p>
                  <FiUser /> Joseph Oliveira
                </p>
              </li>
            </ul>
          </div>

          <div className={styles.footer}>
            <a href="#">
              <p>Carregar mais posts</p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
