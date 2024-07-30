const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
  filters: [],
  filtersLoadingStatus: 'idle',
  deleteHeroId: '',
  filterActive: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HEROES_FETCHING':
      return {
        ...state,
        heroesLoadingStatus: 'loading'
      }
    case 'HEROES_FETCHED':
      return {
        ...state,
        heroes: action.payload ? action.payload.filter(hero => {
          if (state.filterActive === 'all') return hero;
          if (state.filterActive && state.filterActive !== '') {
            return hero.element === state.filterActive
          } else {
            return hero
          }
        }) : state.heroes,
        heroesLoadingStatus: 'idle'
      }
    case 'HEROES_FETCHING_ERROR':
      return {
        ...state,
        heroesLoadingStatus: 'error'
      }
    case 'FILTERS_FETCHING':
      return {
        ...state,
        filtersLoadingStatus: 'loading'
      }
    case 'FILTERS_FETCHED':
      return {
        ...state,
        filters: action.payload ? action.payload : state.filters,
        filtersLoadingStatus: 'idle'
      }
    case 'FILTERS_FETCHING_ERROR':
      return {
        ...state,
        filtersLoadingStatus: 'error'
      }
    case 'DELETE_HERO':
      return {
        ...state,
        deleteHeroId: action.payload,
        heroes: state.heroes.filter(hero => hero.id !== action.payload)
      }
    case 'HERO_CREATED':
      return {
        ...state,
        heroes: [...state.heroes, action.payload]
      }
    case 'ACTIVE_FILTER':
      return {
        ...state,
        filterActive: action.payload
      }
    default: return state
  }
}

export default reducer;