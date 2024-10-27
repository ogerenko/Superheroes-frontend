import { useSearchParams } from 'react-router-dom';
import './FilterForm.scss';

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
        className="filter-form__search input-form"
        type="search"
        placeholder="search"
        value={queryParam}
        onChange={handleQueryChange}
      />
    </div>
  )
}