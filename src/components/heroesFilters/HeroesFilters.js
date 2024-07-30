import { useHttp } from "../../hooks/http.hook";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { filtersFetching, filtersFetched, filtersFetchingError, activeFilter } from '../../actions';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

  const { filters, filtersLoadingStatus, filterActive } = useSelector(state => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
      .then(data => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()))

    // eslint-disable-next-line
  }, [])

  const renderFilters = (filters, status) => {
    if (status === "loading") {
      return <option>Загрузка элементов</option>
    } else if (status === "error") {
      return <option>Ошибка загрузки</option>
    }

    if (filters && filters.length > 0) {
      return filters.map(({ filter, label, className }) => {
        return <option onClick={(e) => dispatch(activeFilter(e.target.value))} key={filter} className={`${className} ${filterActive === filter ? 'active' : ''}`} value={filter}>{label}</option>
      })
    }
  }

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {renderFilters(filters, filtersLoadingStatus)}
        </div>
      </div>
    </div>
  )
}

export default HeroesFilters;