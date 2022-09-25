import Layout from '../components/layout/layout';
import '../styles/globals.css';
import { Provider } from 'next-auth/client';

// "Provider" i user login olmuşsa fazladan session request yapmasın diye kullanıyoruz
// inspect yapıp network den farkı inceleyebilirsin

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
       {/* pages/profile de ki props:{session} */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
