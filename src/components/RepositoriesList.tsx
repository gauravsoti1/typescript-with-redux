import React, { FC, useState } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedHook';
import { RootState } from '../reduxState';

const RepositoriesList: FC = () => {
  const [term, setTerm] = useState('');
  const { searchRepositories } = useActions();
  const { data, error, loading } = useTypedSelector(
    (state) => state.repositories
  );
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchRepositories(term);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button>Search</button>
      </form>
      {}
      {error && <h3>{error} </h3>}
      {loading && <h3>Loading...</h3>}
      {!error &&
        !loading &&
        data.map((repository) => <h3 key={repository}>{repository}</h3>)}
    </div>
  );
};

export default RepositoriesList;
