import { useDispatch } from "react-redux";
import { deleteHero } from "../../actions";

const HeroesListItem = ({ id, name, description, element }) => {

  const dispatch = useDispatch();

  let elementClassName;

  switch (element) {
    case 'fire':
      elementClassName = 'bg-danger bg-gradient';
      break;
    case 'water':
      elementClassName = 'bg-primary bg-gradient';
      break;
    case 'wind':
      elementClassName = 'bg-success bg-gradient';
      break;
    case 'earth':
      elementClassName = 'bg-secondary bg-gradient';
      break;
    default:
      elementClassName = 'bg-warning bg-gradient';
  }

  return (
    <li
      className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}>
      <img src="https://st3.depositphotos.com/1717437/18622/v/380/depositphotos_186223678-stock-illustration-incognito-unknown-person-silhouette-man.jpg"
        className="img-fluid w-25 d-inline"
        alt="unknown hero"
        style={{ 'objectFit': 'cover' }} />
      <div className="card-body">

        <h3 className="card-title">{name}</h3>
        <p className="card-text">{description}</p>
      </div>
      <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
        <button
          type="button"
          className="btn-close btn-close"
          aria-label="Close"
          onClick={() => { dispatch(deleteHero(id)) }}></button>
      </span>
    </li>
  )
}

export default HeroesListItem;