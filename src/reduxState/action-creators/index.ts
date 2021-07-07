import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { Action } from '../actions';

export const searchRepositories = (term: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SEARCH_REPOSITORIES,
    });
    axios
      .get('http://registry.npmjs.org/-/v1/search', {
        params: {
          text: term,
        },
      })
      .then(({ data }) => {
        const names: string[] = data.objects.map(
          (result: any) => result.package.name
        );
        dispatch({
          type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
          payload: names,
        });
      })
      .catch((err) => {
        dispatch({
          type: ActionType.SEARCH_REPOSITORIES_ERROR,
          payload: err.message,
        });
      });
  };
};
