
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { MovieTitleQuery } from './queries';
import { addMovieTitle } from './mutations';
import { deleteMovieTitle } from './mutations';
import { updateMovieTitle } from './mutations';


const withGraphqlAdd = graphql(addMovieTitle, {
    props: ({mutate}) => ({
        addMovieTitle: newMovieTitle => mutate({
            variables: newMovieTitle,
            refetchQueries: [{query : MovieTitleQuery}]
        })
    })
})

const withGraphqlDelet = graphql(deleteMovieTitle, {
    props: ({mutate}) => ({
        deleteMovieTitle: id => mutate({
            variables: id,
            refetchQueries: [{query : MovieTitleQuery}]
        })
    })
})

const withGraphqlUpdate = graphql(updateMovieTitle, {
    props: ({mutate}) => ({
        renameMovieTitle: renameMovieTitle => mutate({
            variables: renameMovieTitle,
            refetchQueries: [{query : MovieTitleQuery}]
        })
    })
})


export default compose(graphql(MovieTitleQuery),withGraphqlAdd,withGraphqlDelet,withGraphqlUpdate);
