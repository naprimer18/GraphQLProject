
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { dogsQuery } from './queries';
import { addDog } from './mutations';
import { deleteDog } from './mutations';
import { updateDog } from './mutations';


const withGraphqlAdd = graphql(addDog, {
    props: ({mutate}) => ({
        addDog: newDog => mutate({
            variables: newDog,
            refetchQueries: [{query : dogsQuery}]
        })
    })
})

const withGraphqlDelet = graphql(deleteDog, {
    props: ({mutate}) => ({
        deleteDog: id => mutate({
            variables: id,
            refetchQueries: [{query : dogsQuery}]
        })
    })
})

const withGraphqlUpdate = graphql(updateDog, {
    props: ({mutate}) => ({
        renameDog: renameDog => mutate({
            variables: renameDog,
            refetchQueries: [{query : dogsQuery}]
        })
    })
})


export default compose(graphql(dogsQuery),withGraphqlAdd,withGraphqlDelet,withGraphqlUpdate);
