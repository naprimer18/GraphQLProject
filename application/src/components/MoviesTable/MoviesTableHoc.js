import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { MovieTitleQuery } from '../GraphQl/queries';
import { addMovieTitle,deleteMovieTitle,updateMovieTitle } from '../GraphQl/mutations';

const withGraphqlQuery = graphql(MovieTitleQuery, {
    options: ({serchName = ''}) => ({
        variables: {serchName}
    })
})

const withGraphqlAdd = graphql(addMovieTitle, {
    props: ({mutate}) => ({
        addMovieTitle: newMovieTitle => mutate({
            variables: newMovieTitle,
            refetchQueries: [{query : MovieTitleQuery, variables: {serchName: ''}}]
        })
    })
})

const withGraphqlDelet = graphql(deleteMovieTitle, {
    props: ({mutate}) => ({
        deleteMovieTitle: id => mutate({
            variables: id,
            refetchQueries: [{query : MovieTitleQuery, variables: {serchName: ''}}]
        })
    })
})

const withGraphqlUpdate = graphql(updateMovieTitle, {
    props: ({mutate}) => ({
        renameMovieTitle: renameMovieTitle => mutate({
            variables: renameMovieTitle,
            refetchQueries: [{query : MovieTitleQuery, variables: {serchName: ''}}]
        })
    })
})



export default compose(withGraphqlQuery,withGraphqlAdd,withGraphqlDelet,withGraphqlUpdate);
