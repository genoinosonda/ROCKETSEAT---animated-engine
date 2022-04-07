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
              <p>
                <FiCalendar />
                {props.post.first_publication_date}
              </p>
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

        <div className={styles.newsBody}>
          {props.post.data.content.map(contentBody => (
            <>
              <h2 key={contentBody.heading}>{contentBody.heading[0].text}</h2>
              {contentBody.body.map(bodyPost =>(
                <p>{bodyPost.text}</p>
              ))}

            </>
          ))}
        </div>

        {/*
          <div className={styles.newsBody}>
            <h2>Proin et varius</h2>
            <p>
              é simplesmente uma simulação de texto da indústria tipográfica e de
              impressos, e vem sendo utilizado desde o século XVI, quando um
              impressor desconhecido pegou uma bandeja de tipos e os embaralhou
              para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não
              só a cinco séculos, como também ao salto para a editoração
              eletrônica, permanecendo essencialmente inalterado.
            </p>
            <p>
              Se popularizou na década de 60, quando a Letraset lançou decalques
              contendo passagens de Lorem Ipsum, e mais recentemente quando passou
              a ser integrado a softwares de editoração eletrônica como Aldus
              PageMaker.
            </p>
            <p>
              É um fato conhecido de todos que um leitor se distrairá com o
              conteúdo de texto legível de uma página quando estiver examinando
              sua diagramação.
            </p>
          </div>

        <div className={styles.newsBody}>
          <h2>Lorem ipsum</h2>
          <p>
            É um fato conhecido de todos que um leitor se distrairá com o
            conteúdo de texto legível de uma página quando estiver examinando
            sua diagramação.
          </p>
          <p>
            Se popularizou na década de 60, quando a Letraset lançou decalques
            contendo passagens de Lorem Ipsum, e mais recentemente quando passou
            a ser integrado a softwares de editoração eletrônica como Aldus
            PageMaker.
          </p>
          <p>
            é simplesmente uma simulação de texto da indústria tipográfica e de
            impressos, e vem sendo utilizado desde o século XVI, quando um
            impressor desconhecido pegou uma bandeja de tipos e os embaralhou
            para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não
            só a cinco séculos, como também ao salto para a editoração
            eletrônica, permanecendo essencialmente inalterado.{' '}
          </p>
        </div>
         */}
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
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title[0].text,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author[0].text,
      content: response.data.content,
    },
  };

  return {
    props: { post },
  };
};
