import './FilterForm.scss';

import { useSearchParams } from 'react-router-dom';

export const FilterForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get('query') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value.trim() === '') {
      params.delete('query');
    } else {
      params.set('query', event.target.value);
    }

    setSearchParams(params);
  };

  return (
    <div className="filter-form">
      <input
        className="filter__input"
        type="search"
        placeholder="search..."
        value={queryParam}
        onChange={handleQueryChange}
      />
    </div>
  )
}