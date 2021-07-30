import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    init {
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
