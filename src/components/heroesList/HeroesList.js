import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  const { heroes, heroesLoadingStatus, deleteHeroId, filterActive } = useSelector(state => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
      .then(data => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()))

    // eslint-disable-next-line
  }, [filterActive]);

  useEffect(() => {
    if (deleteHeroId !== '') {
      deleteHero(deleteHeroId);
    }
  }, [deleteHeroId])

  const deleteHero = (deleteHeroId) => {
    dispatch(heroesFetching());
    request(`http://localhost:3001/heroes/${deleteHeroId}`, 'DELETE')
      .then(() => {
        request("http://localhost:3001/heroes")
          .then(data => dispatch(heroesFetched(data)))
          .catch(() => dispatch(heroesFetchingError()))
      })
      .catch(() => dispatch(heroesFetchingError()));
  }

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>
  }

  const renderHeroesList = (arr) => {

    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>
    }

    return arr.map(({ id, ...props }) => {
      return <HeroesListItem key={id} id={id} {...props} />
    })
  }

  const elements = renderHeroesList(heroes);
  return (
    <ul>
      {elements}
    </ul>
  )
}

export default HeroesList;