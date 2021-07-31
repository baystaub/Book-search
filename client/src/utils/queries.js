import { gql } from '@apollo/client';

export const QUERY_ME = gql`{
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;

// copied over from class activity 26 and altered