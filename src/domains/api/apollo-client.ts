import { ApolloClient, InMemoryCache } from '@apollo/client';
import { withErrorLog } from '@errors-api/api-error-module';
import { apolloClientUri } from '@api/config';

const token = process.env[`REACT_APP_GITHUB_TOKEN`];
if (!token) console.error(`Github token missing in .env.local`);

export const client = new ApolloClient({
  uri: apolloClientUri,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

client.query = withErrorLog(client.query);
